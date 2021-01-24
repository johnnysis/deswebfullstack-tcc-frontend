import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input, InputButton, InputNumber } from '../../components/input';
import Messages from '../../components/message/Messages';
import FormPesquisa from '../../components/wrapper/FormPesquisa';
import ModalConfirmacao from '../../components/wrapper/ModalConfirmacao';
import { url } from '../../util/constants';
import { toRealFormat } from '../../util/conversor';

const EtapaSelecionarProdutos = (props) => {
    const [descricaoProduto, setDescricaoProduto] = useState('');
    const [produtos, setProdutos] = useState(props.produtos);
    const [quantidade, setQuantidade] = useState('');
    const [selectedCodigoProduto, setSelectedCodigoProduto] = useState(0);
    const [selectedCodigoProdutoAdicionado, setSelectedCodigoProdutoAdicionado] = useState(0);
    const [porcentagemDesconto, setPorcentagemDesconto] = useState('');
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
        let auxProdutosAdicionados = props.produtosAdicionados.map(el => el);
        let produtoAdicionado = auxProdutosAdicionados.find(el => el.codigo === selectedCodigoProduto);
        
        setFailureMessagePesquisa('');
        setFailureMessageAdicao('');
        if(!quantidade || parseInt(quantidade) <= 0) {
            setFailureMessageAdicao('Insira uma quantidade válida.');
            return;
        }
        if(!selectedCodigoProduto) {
            setFailureMessageAdicao('Selecione um produto.');
            return;
        }
        if(produtoAdicionado) {
            if(parseInt(produtoAdicionado.quantidade) + parseInt(quantidade) > parseInt(produto.quantidade))
                setFailureMessageAdicao('Estoque insuficiente para o produto selecionado.');
            else {
                produtoAdicionado.quantidade = parseInt(produtoAdicionado.quantidade) + parseInt(quantidade);
                produtoAdicionado.preco = produtoAdicionado.quantidade * produto.preco;
                props.setProdutosAdicionados(auxProdutosAdicionados);
            }
        }
        else {
            if(parseInt(produto.quantidade) < quantidade)
                setFailureMessageAdicao('Estoque insuficiente para o produto selecionado.');
            else {
                auxProdutosAdicionados = [...props.produtosAdicionados, { ...produto, quantidade: quantidade, preco: quantidade * produto.preco }];
                props.setProdutosAdicionados(auxProdutosAdicionados);
            }
        }
        
        let vTotal = calculaValorTotal(auxProdutosAdicionados);

        props.setValorTotal(vTotal);
        calculaPorcentagemEValor(porcentagemDesconto, vTotal);
    }
    const calculaValorTotal = (produtos) => {
        
        let vT = 0;
        for(let pro of produtos)
            vT += pro.preco;

        return vT;
    }
    const calculaPorcentagemEValor = (porcentagem, vTotal) => {
        if(!porcentagem)
            props.setValorTotalComDesconto(vTotal);
        else
            props.setValorTotalComDesconto(vTotal - vTotal * parseInt(porcentagem)/100);
    }

    const handleChangePorcentagem = e => {
        const porcentagem = parseFloat(e.target.value);
        if(!porcentagem) {
            calculaPorcentagemEValor(null, props.valorTotal);
            setPorcentagemDesconto(0);
            
        }
        if(porcentagem > 0) {
            if(porcentagem < 100) {
                console.log(porcentagem);
                setPorcentagemDesconto(porcentagem);
                calculaPorcentagemEValor(porcentagem, props.valorTotal);
            }
            else
                setPorcentagemDesconto(porcentagemDesconto);
        }
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

            calculaPorcentagemEValor(porcentagemDesconto, vTotal);
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
                                                <th>Quantidade</th>
                                                <th>Preço Unit. (R$)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produtos.map(el => (
                                            <tr className={`row-select ${el.codigo === selectedCodigoProduto ? "row-selected": ""}`} key={el.codigo} onClick={() => setSelectedCodigoProduto(el.codigo)}>
                                                <th scope="row">{el.codigo}</th>
                                                <td>{el.descricao}</td>
                                                <td>{el.quantidade}</td>
                                                <td>{toRealFormat(el.preco)}</td>
                                            </tr>))}
                                        </tbody>
                                    </table>
                                </div>
                                <Messages failureMessage={failureMessageAdicao} />
                                <InputNumber 
                                    inputName="Quantidade"
                                    inputId="quantidade"
                                    inputValue={quantidade}
                                    columnSettings="col-sm-2"
                                    handleChange={e => setQuantidade(e.target.value)}
                                    validate={true}
                                />
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
                                                <th>Preço (R$)</th>
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
                                <div className="col-sm-3">
                                    <label htmlFor="quantidade" className="form-label">Desconto (%)</label>
                                    <input id="quantidade" type="text" className="form-control" value={porcentagemDesconto} onChange={e => handleChangePorcentagem(e)}/>
                                </div>
                                <label>Valor total (R$): {toRealFormat(props.valorTotalComDesconto && porcentagemDesconto > 0 && porcentagemDesconto < 100 ? props.valorTotalComDesconto : props.valorTotal)}</label>

                                <Messages failureMessage={props.failureMessageFinalizacao} />
                                <div className="botoes-form">
                                    <InputButton buttonName="Remover" estilo="btn-danger btn-esquerda" handleClick={remover}/>
                                    <InputButton buttonName="Finalizar venda" estilo="btn-success" data-toggle="modal" data-target="#modal-confirmacao" style={{display: "inline-block"}}/>
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