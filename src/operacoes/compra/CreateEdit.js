import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import Messages from '../../components/message/Messages';
import EtapaSelecionarFornecedor from './EtapaSelecionarFornecedor';
import EtapaSelecionarProdutos from './EtapaSelecionarProdutos';
import { Link } from 'react-router-dom';

const CreateEdit = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtosAdicionados, setProdutosAdicionados] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorTotalComDesconto, setValorTotalComDesconto] = useState(0);
    const [failureMessage, setFailureMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedCodigoFornecedor, setSelectedCodigoFornecedor] = useState(0);
    
    const finalizar = async () => {
        try {
            if(!produtosAdicionados || produtosAdicionados.length === 0)
                setFailureMessage('Adicione um produto à lista primeiramente.');
            else {
                let response = await axios.post(`${url}/compras/create`, {
                    codigo: 0,
                    fornecedorCodigo: selectedCodigoFornecedor,
                    valorTotal: valorTotal
                });
                let codigo = response.data.codigo;
                await axios.post(`${url}/compras/itens?codigoCompra=${codigo}`, {
                    itensCompra: produtosAdicionados
                });

                setSuccessMessage('Compra finalizada.');
            }
        }
        catch(err) {
            setFailureMessage('Erro ao finalizar a compra.');
            console.log(err.message);
        }
    }

    useEffect(() => {
        if(selectedCodigoFornecedor)
            axios.get(`${url}/produtos`)
                .then(
                    async res => {
                        setProdutos(res.data);
                    },
                    err => console.log(err));

    }, [selectedCodigoFornecedor]);

    return (<>
        
        {!selectedCodigoFornecedor && !successMessage ? (
            <EtapaSelecionarFornecedor 
                selectedCodigoFornecedor={selectedCodigoFornecedor}
                setSelectedCodigoFornecedor={setSelectedCodigoFornecedor}
            />
        ) : ""}
        

        {selectedCodigoFornecedor && !successMessage ? (
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
        </>
        ) : ""}

        {successMessage ? (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="card bg-light mb-6">
                            <div className="card-header">Status da compra</div>
                            <div className="card-body">
                                <Messages successMessage={successMessage}/>
                                <div className="list-group">
                                    <Link to="/compra/" class="list-group-item list-group-item-action link-info">Nova compra</Link>
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