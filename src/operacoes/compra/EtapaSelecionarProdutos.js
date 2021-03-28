import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input, InputButton, InputCurrency, InputNumber } from '../../components/input';
import Messages from '../../components/message/Messages';
import FormPesquisa from '../../components/wrapper/FormPesquisa';
import ModalConfirmacao from '../../components/wrapper/ModalConfirmacao';
import { url } from '../../util/constants';
import { toRealFormat } from '../../util/conversor';

const EtapaSelecionarProdutos = (props) => {
    const [descricaoProduto, setDescricaoProduto] = useState('');
    const [produtos, setProdutos] = useState(props.produtos);
    const [quantidade, setQuantidade] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [selectedCodigoProduto, setSelectedCodigoProduto] = useState(0);
    const [selectedCodigoProdutoAdicionado, setSelectedCodigoProdutoAdicionado] = useState(0);
    const [failureMessagePesquisa, setFailureMessagePesquisa] = useState('');
    const [failureMessageAdicao, setFailureMessageAdicao] = useState('');
    const [failureMessageRemocao, setFailureMessageRemocao] = useState('');

    useEffect(() => {
        setProdutos(props.produtos);
    }, [props.produtos]);
    const pesquisarProduto = () => {
        setSelectedCodigoProduto(0);
        setFailureMessagePesquisa('');
        setQuantidade('');
        Axios.get(`${url}/produtos/recuperarPorDescricao?descricao=${descricaoProduto}`)
        .then(
            async res => {
                if(!res.data)
                    setFailureMessagePesquisa('Produto não encontrado.');
                setProdutos(res.data);
            },
            err => {
                setFailureMessagePesquisa('Erro ao selecionar produto.');
                console.log(err)
            }
        );
    }

    const adicionar = () => {
        let produto = produtos.find(el => el.codigo === selectedCodigoProduto);
        let precoUntAux = valorUnitario;
        let auxProdutosAdicionados = props.produtosAdicionados.map(el => el);
        let produtoAdicionado = auxProdutosAdicionados.find(el => el.codigo === selectedCodigoProduto);
        
        setFailureMessagePesquisa('');
        setFailureMessageAdicao('');
        if(!quantidade || parseInt(quantidade) <= 0) {
            setFailureMessageAdicao('Insira uma quantidade válida.');
            return;
        }
        if(!precoUntAux || parseInt(precoUntAux) <= 0) {
            setFailureMessageAdicao('Insira um preço unitário válido.');
            return;
        }
        else
            precoUntAux = precoUntAux.replace(",", ".");

        if(!selectedCodigoProduto) {
            setFailureMessageAdicao('Selecione um produto.');
            return;
        }
        if(produtoAdicionado) {
            produtoAdicionado.quantidade = parseInt(produtoAdicionado.quantidade) + parseInt(quantidade);
            produtoAdicionado.preco = produtoAdicionado.quantidade * precoUntAux;
            produtoAdicionado.valorUnitario = precoUntAux;
            props.setProdutosAdicionados(auxProdutosAdicionados);
        }
        else {
            console.log(valorUnitario);
            auxProdutosAdicionados = [...props.produtosAdicionados, { ...produto, quantidade: quantidade, preco: quantidade * precoUntAux, valorUnitario: precoUntAux }];
            props.setProdutosAdicionados(auxProdutosAdicionados);
        }
        
        let vTotal = calculaValorTotal(auxProdutosAdicionados);

        props.setValorTotal(vTotal);
    }
    const calculaValorTotal = (produtos) => {
        
        let vT = 0;
        for(let pro of produtos)
            vT += pro.preco;

        return vT;
    }

    const remover = () => {
        setFailureMessageRemocao('');
        if(!selectedCodigoProdutoAdicionado)
            setFailureMessageRemocao('Selecione um item a ser removido.');
        else {
            let nProdutosAdicionados = props.produtosAdicionados.map(el => el);
            let index = nProdutosAdicionados.findIndex(el => el.codigo === selectedCodigoProdutoAdicionado);

            nProdutosAdicionados.splice(index, 1);
            props.setProdutosAdicionados(nProdutosAdicionados);

            let vTotal = calculaValorTotal(nProdutosAdicionados);
            props.setValorTotal(vTotal);

            setSelectedCodigoProdutoAdicionado(0);
        }
    }

    return (
    <>
        <ModalConfirmacao
            id="modal-confirmacao"
            handleClick={props.finalizar}
        />
        <FormPesquisa
            cardSize="col-sm-4"
            cardTitle="Procurar produto"
            pesquisar={pesquisarProduto}
            failureMessage={failureMessagePesquisa}>
                <div className="row">
                    <Input 
                        inputName="Descrição do produto"
                        inputId="nome"
                        inputValue={descricaoProduto}
                        columnSettings="col-sm-12"
                        handleChange={e => setDescricaoProduto(e.target.value)}
                        validate={false}
                    />
                </div>
        </FormPesquisa>
        {!produtos || produtos.length === 0 ? "" : (
            <div className="row lista">
                <div className="col-sm-12 col-md-6">
                    <div className="card bg-light mb-6">
                        <div className="card-header">Selecione o produto: </div>
                        <div className="card-body">
                            <div className="container">
                                <div className="table-responsive">
                                    <table className='table table-bordered'>
                                        <thead class="table-light">
                                            <tr>
                                                <th>Código</th>
                                                <th>Descrição</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produtos.map(el => (
                                            <tr className={`row-select ${el.codigo === selectedCodigoProduto ? "row-selected": ""}`} key={el.codigo} onClick={() => setSelectedCodigoProduto(el.codigo)}>
                                                <th scope="row">{el.codigo}</th>
                                                <td>{el.descricao}</td>
                                            </tr>))}
                                        </tbody>
                                    </table>
                                </div>
                                <Messages failureMessage={failureMessageAdicao} />
                                <div className="row">
                                    <InputNumber 
                                        inputName="Quantidade"
                                        inputId="quantidade"
                                        inputValue={quantidade}
                                        columnSettings="col-sm-12 col-md-4"
                                        handleChange={e => setQuantidade(e.target.value)}
                                        validate={true}
                                    />
                                    <InputCurrency 
                                        inputName="Valor unitário"
                                        inputId="valorUnitario"
                                        inputValue={valorUnitario}
                                        columnSettings="col-sm-12 col-md-4"
                                        handleChange={e => setValorUnitario(e.target.value)}
                                        validate={true}
                                    />
                                </div>
                                <div className="botoes-form">
                                    <InputButton buttonName="Adicionar" estilo="btn-primary" handleClick={adicionar}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* produtos adicionados */}
                <div className="col-sm-12 col-md-6">
                    <div className="card bg-light mb-6">
                        <div className="card-header">Produtos adicionados</div>
                        <div className="card-body">
                            <div className="container">
                                {props.produtosAdicionados && props.produtosAdicionados.length > 0 ? (
                                    <>
                                    <div className="table-responsive">
                                    <table className='table table-bordered'>
                                        <thead class="table-light">
                                            <tr>
                                                <th>Código</th>
                                                <th>Descrição</th>
                                                <th>Quantidade</th>
                                                <th>Preço Total(R$)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.produtosAdicionados.map(el => (
                                            <tr className={`row-select ${el.codigo === selectedCodigoProdutoAdicionado ? "row-selected": ""}`} key={el.codigo} onClick={() => setSelectedCodigoProdutoAdicionado(el.codigo)}>
                                                <th scope="row">{el.codigo}</th>
                                                <td>{el.descricao}</td>
                                                <td>{el.quantidade}</td>
                                                <td>{toRealFormat(el.preco)}</td>
                                            </tr>))}
                                        </tbody>
                                    </table>
                                </div>
                                <Messages failureMessage={failureMessageRemocao} />
                                <label>Valor total (R$): {toRealFormat(props.valorTotal)}</label>

                                <Messages failureMessage={props.failureMessageFinalizacao} />
                                <div className="botoes-form">
                                    <InputButton buttonName="Remover" estilo="btn-danger btn-esquerda" handleClick={remover}/>
                                    <InputButton buttonName="Finalizar compra" estilo="btn-success" data-toggle="modal" data-target="#modal-confirmacao" style={{display: "inline-block"}}/>
                                </div>
                                    </>
                                ) : (<p>Nenhum produto adicionado.</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>);
}

export default EtapaSelecionarProdutos;