import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Input } from '../../components/input';
import FormPesquisa from '../../components/wrapper/FormPesquisa';
import { url } from '../../util/constants';
import Messages from '../../components/message/Messages';
import ModalConfirmacao from '../../components/wrapper/ModalConfirmacao';

const EtapaCancelarVenda = (props) => {
    const [listaVendas, setListaVendas] = useState([]);
    const [formasPagamento, setFormasPagamento] = useState([]);
    const [codigoVenda, setCodigoVenda] = useState(0);
    const [codigoVendaCancelamento, setCodigoVendaCancelamento] = useState(0);
    const [codigoFormaPagamento, setCodigoFormaPagamento] = useState([]);
    const [failureMessage, setFailureMessage] = useState('');
    const [selectedCodigoCliente, setSelectedCodigoCliente] = useState(0);

    const cancelar = () => {
        console.log(codigoVendaCancelamento);
        Axios.delete(`${url}/vendas/${codigoVendaCancelamento}`).then(response => {
            props.setSuccessMessage('Venda cancelada com sucesso.');
        }).catch(err => {
            setFailureMessage('Erro ao realizar cancelamento.');
            console.log(err.message);
        });
    }

    useEffect(() => {
        if(props.selectedCodigoCliente > 0) {
            Axios.get(`${url}/vendas/vendasPorCliente?clienteCodigo=${props.selectedCodigoCliente}`).then(response => {
                console.log(response.data);
                setListaVendas(response.data);
            });
        }
    }, [props.selectedCodigoCliente]);


    return (<>
    <ModalConfirmacao
        id="modal-cancelamento"
        handleClick={cancelar}
    />
    {listaVendas ? (
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
                                    <td>
                                        <button type="button"
                                        data-toggle="modal" data-target="#modal-cancelamento"
                                            className="btn btn-danger" onClick={() => setCodigoVendaCancelamento(el.codigo)}>Cancelar</button>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>) : ""}
</>);
}

export default EtapaCancelarVenda;