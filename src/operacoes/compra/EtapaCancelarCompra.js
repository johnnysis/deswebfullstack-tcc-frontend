import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { url } from '../../util/constants';
import { toRealFormat } from '../../util/conversor';
import Messages from '../../components/message/Messages';
import ModalConfirmacao from '../../components/wrapper/ModalConfirmacao';

const EtapaCancelarCompra = (props) => {
    const [listaCompras, setListaCompras] = useState([]);
    const [codigoCompraCancelamento, setCodigoCompraCancelamento] = useState(0);
    const [failureMessage, setFailureMessage] = useState('');

    const cancelar = () => {
        console.log(codigoCompraCancelamento);
        Axios.delete(`${url}/compras/${codigoCompraCancelamento}`).then(response => {
            props.setSuccessMessage('Compra cancelada com sucesso.');
        }).catch(err => {
            setFailureMessage('Erro ao realizar cancelamento.');
            console.log(err.message);
        });
    }

    useEffect(() => {
        if(props.selectedCodigoFornecedor > 0) {
            console.log(props.selectedCodigoFornecedor);
            Axios.get(`${url}/compras/comprasPorFornecedor?fornecedorCodigo=${props.selectedCodigoFornecedor}`).then(response => {
                console.log(response.data);
                setListaCompras(response.data);
            });
        }
    }, [props.selectedCodigoFornecedor]);


    return (<>
    <ModalConfirmacao
        id="modal-cancelamento"
        handleClick={cancelar}
    />
    {listaCompras ? (
    <div className="lista">
        <div className="col-sm-12">
            
            <div className="card bg-light mb-6">
                <div className="card-header">Lista de compras realizadas para este fornecedor</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <Messages failureMessage={failureMessage}/>
                        <table className='table table-striped'>
                            <thead class="table-light">
                                <tr>
                                    <th>Código</th>
                                    <th>Fornecedor</th>
                                    <th>Valor Total (R$)</th>
                                    <th class="th-opcao">Opção</th>
                                </tr>
                            </thead>
                            {/* Realizar ou estornar pagamento. Adicionar a data da venda. */}
                            <tbody>
                                {listaCompras.map(el => (
                                <tr key={el.codigo}>
                                    <th scope="row">{el.codigo}</th>
                                    <td>{el.fornecedor.nome}</td>
                                    <td>{toRealFormat(el.valorTotal)}</td>
                                    <td>
                                        <button type="button"
                                        data-toggle="modal" data-target="#modal-cancelamento"
                                            className="btn btn-danger" onClick={() => setCodigoCompraCancelamento(el.codigo)}>Cancelar</button>
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

export default EtapaCancelarCompra;