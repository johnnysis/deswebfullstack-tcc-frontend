import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../util/constants';
import Messages from '../../components/message/Messages';
import EtapaSelecionarCliente from './EtapaSelecionarCliente';
import { Link } from 'react-router-dom';
import ModalConfirmacao from '../../components/wrapper/ModalConfirmacao';
import { InputButton, Select } from '../../components/input';

const CreateEdit = () => {
    const [listaVendas, setListaVendas] = useState([]);
    const [formasPagamento, setFormasPagamento] = useState([]);
    const [codigoVenda, setCodigoVenda] = useState(0);
    const [codigoVendaEstorno, setCodigoVendaEstorno] = useState(0);
    const [codigoFormaPagamento, setCodigoFormaPagamento] = useState([]);
    const [failureMessage, setFailureMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedCodigoCliente, setSelectedCodigoCliente] = useState(0);
    
    const finalizar = async () => {
        try {
            if(codigoVenda > 0) {
                axios.post(`${url}/vendas/realizarPagamento?`, {
                    codigoVenda, codigoFormaPagamento
                }).then(() => {
                    setSuccessMessage('Pagamento realizado com sucesso.');
                    setCodigoVenda(0);
                    setListaVendas([]);
                })
            }
            else
                setFailureMessage('Código da venda não informado.');
        }
        catch(err) {
            console.log(err);
            setFailureMessage('Erro ao realizar pagamento.');
        }
    }

    const refresh = () => {
        setSuccessMessage('');
        setSelectedCodigoCliente(0);
    }

    const selectPagar = (codigoVenda) => {
        axios.get(`${url}/formasPagamento`).then(response => {
            setCodigoVenda(codigoVenda);
            setFormasPagamento(response.data);
        }).catch(err => {
            setFailureMessage('Erro ao listar formas de pagamento disponíveis.');
            console.log(err.message);
        });
    }

    const estornar = async () => {
        try {
            if(codigoVendaEstorno > 0) {
                axios.post(`${url}/vendas/estornarPagamento?`, {
                    codigoVenda: codigoVendaEstorno
                }).then(() => {
                    setSuccessMessage('Pagamento estornado com sucesso.');
                    setCodigoVenda(0);
                    setListaVendas([]);
                })
            }
            else
                setFailureMessage('Código da venda não informado.');
        }
        catch(err) {
            console.log(err);
            setFailureMessage('Erro ao realizar pagamento.');
        }
    }

    useEffect(() => {
        if(selectedCodigoCliente > 0) {
            axios.get(`${url}/vendas/vendasPorCliente?clienteCodigo=${selectedCodigoCliente}`).then(response => {
                console.log(response.data);
                setListaVendas(response.data);
            })
            
        }
    }, [selectedCodigoCliente])

    return (<>
        {!selectedCodigoCliente && !successMessage ? (
            <EtapaSelecionarCliente 
                selectedCodigoCliente={selectedCodigoCliente}
                setSelectedCodigoCliente={setSelectedCodigoCliente}
            />
        ) : ""}

        <ModalConfirmacao
            id="modal-estornos"
            handleClick={estornar}
        />
        {listaVendas.length > 0 && codigoVenda === 0 ? (<>
            {/* <ModalConfirmacao
                id="modal-pagar"
                handleClick={pagar}
            /> */}
            <div className="lista">
                <div className="col-sm-12">
                    <div className="card bg-light mb-6">
                        <div className="card-header">Lista de vendas realizadas para o cliente</div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <Messages failureMessage={failureMessage}/>
                                <table className='table table-striped'>
                                    <thead class="table-light">
                                        <tr>
                                            <th>Código</th>
                                            <th>Cliente</th>
                                            <th>Valor Total</th>
                                            <th>Valor Total Com Desconto</th>
                                            <th>Pago</th>
                                            <th class="th-opcao">Opção</th>
                                        </tr>
                                    </thead>
                                    {/* Realizar ou estornar pagamento. Adicionar a data da venda. */}
                                    <tbody>
                                        {listaVendas.map(el => (
                                        <tr key={el.codigo}>
                                            <th scope="row">{el.codigo}</th>
                                            <td>{el.cliente.nome}</td>
                                            <td>{el.valorTotal}</td>
                                            <td>{el.valorTotalComDesconto}</td> 
                                            <td>{el.pago ? 'Sim': 'Não'}</td>
                                            <td>
                                                {!el.pago ? (
                                                    <button type="button"
                                                        className="btn btn-info" onClick={() => selectPagar(el.codigo)}>Pagar</button>) : 
                                                    (
                                                        <button type="button" className="btn btn-danger"
                                                            data-toggle="modal" data-target="#modal-estornos"
                                                            onClick={() => setCodigoVendaEstorno(el.codigo)}
                                                        >Estornar</button>
                                                    )
                                                }
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>) : ""}

        {codigoVenda !== 0 ? (
            <div className="container form-style">
                <div className="col-sm-12 col-md-4">
                    <div className="card bg-light mb-6">
                        <div className="card-header">Escolha a forma de pagamento</div>
                        <div className="card-body">
                            <div className="container">
                                <Select
                                    columnSettings="col-sm-8"
                                    inputId="forma-de-pagamento"
                                    labelName="Forma de pagamento"
                                    inputValue={codigoFormaPagamento}
                                    handleChange={e => setCodigoFormaPagamento(e.target.value)}
                                    lista={formasPagamento}
                                />

                                <ModalConfirmacao
                                    id="modal-finalizar"
                                    handleClick={finalizar}
                                />

                                <InputButton buttonName="Finalizar" 
                                    data-toggle="modal" data-target="#modal-finalizar"
                                    estilo="btn-success btn-esquerda"/>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : ""}

        {successMessage ? (
            <div className="col-sm-12 col-md-6">
                <div className="card bg-light mb-6">
                    <div className="card-header">Status da compra</div>
                    <div className="card-body">
                        <Messages successMessage={successMessage}/>
                        <div className="list-group">
                            <Link to="/pagamento/" onClick={refresh} class="list-group-item list-group-item-action link-info">Novo pagamento</Link>
                            <Link to="/" class="list-group-item list-group-item-action link-info">Retornar à pagina inicial</Link>
                        </div>
                    </div>
                </div>
            </div>) : ""}
    </>)
}

export default CreateEdit;