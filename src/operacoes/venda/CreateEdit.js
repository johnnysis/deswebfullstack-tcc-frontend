import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import Messages from '../../components/message/Messages';
import EtapaSelecionarCliente from './EtapaSelecionarCliente';
import EtapaSelecionarProdutos from './EtapaSelecionarProdutos';
import EtapaCancelarVenda from './EtapaCancelarVenda';
import { Link } from 'react-router-dom';
import { InputButton } from '../../components/input';

const CreateEdit = () => {
    
    const [produtos, setProdutos] = useState([]);
    const [produtosAdicionados, setProdutosAdicionados] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorTotalComDesconto, setValorTotalComDesconto] = useState(0);
    const [failureMessage, setFailureMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedCodigoCliente, setSelectedCodigoCliente] = useState(0);
    const [cancelarOuCriarVenda, setCancelarOuCriarVenda] = useState(false);
    
    const finalizar = async () => {
        try {
            if(!produtosAdicionados || produtosAdicionados.length === 0)
                setFailureMessage('Adicione um produto à lista primeiramente.');
            else {
                let response = await axios.post(`${url}/vendas/create`, {
                    codigo: 0,
                    clienteCodigo: selectedCodigoCliente,
                    valorTotal: valorTotal,
                    valorTotalComDesconto: valorTotalComDesconto,
                    formaPagamento: null,
                    pago: false,
                    entregue: false
                });
                let codigo = response.data.codigo;
                await axios.post(`${url}/vendas/itens?codigoVenda=${codigo}`, {
                    itensVenda: produtosAdicionados
                });

                setSuccessMessage('Venda finalizada.');
            }
        }
        catch(err) {
            setFailureMessage('Erro ao finalizar a venda.');
            console.log(err.message);
        }
    }

    const refresh = () => {
        setSuccessMessage('');
        setSelectedCodigoCliente(0);
    }

    useEffect(() => {
        if(selectedCodigoCliente)
            axios.get(`${url}/produtos`)
                .then(
                    async res => {
                        setProdutos(res.data);
                    },
                    err => console.log(err));
            
    }, [selectedCodigoCliente]);

    return (<>
        
        {!selectedCodigoCliente && !successMessage ? (
            <EtapaSelecionarCliente 
                selectedCodigoCliente={selectedCodigoCliente}
                setSelectedCodigoCliente={setSelectedCodigoCliente}
            />
        ) : ""}
        

        {selectedCodigoCliente && !successMessage ? (
        <>
            <EtapaSelecionarProdutos 
                produtos={produtos}
                produtosAdicionados={produtosAdicionados}
                setProdutosAdicionados={setProdutosAdicionados}
                valorTotal={valorTotal}
                setValorTotal={setValorTotal}
                valorTotalComDesconto={valorTotalComDesconto}
                setValorTotalComDesconto={setValorTotalComDesconto}
                finalizar={finalizar}
                failureMessageFinalizacao={failureMessage}
            />
            <EtapaCancelarVenda
                selectedCodigoCliente={selectedCodigoCliente}
                setSuccessMessage={setSuccessMessage}
            />
        </>
        ) : ""}

        {successMessage ? (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="card bg-light mb-6">
                            <div className="card-header">Status da venda</div>
                            <div className="card-body">
                                <Messages successMessage={successMessage}/>
                                <div className="list-group">
                                    <Link to="/venda/" onClick={refresh} class="list-group-item list-group-item-action link-info">Nova venda</Link>
                                    <Link to="/" class="list-group-item list-group-item-action link-info">Retornar à pagina inicial</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : ""}
    </>)
}

export default CreateEdit;