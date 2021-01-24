import Axios from 'axios';
import React, { useState } from 'react';
import { Input } from '../../components/input';
import FormPesquisa from '../../components/wrapper/FormPesquisa';
import { url } from '../../util/constants';

const EtapaSelecionarCliente = (props) => {
    const [nomeCpf, setNomeCpf] = useState('');
    const [clientes, setClientes] = useState([]);
    const [failureMessage, setFailureMessage] = useState('');

    const pesquisarCliente = () => {
        setFailureMessage('');
        Axios.get(`${url}/clientes/recuperarPorNomeCpf?nomeCpf=${nomeCpf}`)
        .then(
            async res => {
                if(!res.data)
                    setFailureMessage("Cliente não encontrado.");
                else {
                    setClientes(res.data);
                    props.setSelectedCodigoCliente(0);
                }
            },
            err => { setFailureMessage("Erro ao pesquisar cliente."); console.log(err); }
        );
    }

    const selectCliente = (codigo) => {
        props.setSelectedCodigoCliente(codigo);
    }
    
    return (<>
        <FormPesquisa
            cardSize="col-sm-4"
            cardTitle="Pesquisar cliente"
            pesquisar={pesquisarCliente}
            failureMessage={failureMessage}>
                <div className="row">
                    <Input 
                        inputName="Nome ou CPF"
                        inputId="nome"
                        inputValue={nomeCpf}
                        columnSettings="col-sm-12"
                        handleChange={e => setNomeCpf(e.target.value)}
                        validate={false}
                    />
                </div>
        </FormPesquisa>
        {!clientes || clientes.length === 0 ? "" : (
            <div className="row lista">
                <div className="col-sm-12 col-md-6">
                    <div className="card bg-light mb-6">
                        <div className="card-header">Selecione o cliente: </div>
                        <div className="card-body table-responsive">
                            <table className='table table-bordered'>
                                <thead class="table-light">
                                    <tr>
                                        <th>Código</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map(el => (
                                    <tr className={`row-select ${el.codigo === props.selectedCodigoCliente ? "row-selected": ""}`} key={el.codigo} onClick={() => selectCliente(el.codigo)}>
                                        <th scope="row">{el.codigo}</th>
                                        <td>{el.nome}</td>
                                        <td>{el.cpf}</td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>)
}

export default EtapaSelecionarCliente;