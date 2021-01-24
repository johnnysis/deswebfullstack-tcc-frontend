import Axios from 'axios';
import React, { useState } from 'react';
import { Input } from '../../components/input';
import FormPesquisa from '../../components/wrapper/FormPesquisa';
import { url } from '../../util/constants';

const EtapaSelecionarFornecedor = (props) => {
    const [nomeFantasiaCnpj, setNomeFantasiaCnpj] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [failureMessage, setFailureMessage] = useState('');

    const pesquisarFornecedor = () => {
        setFailureMessage('');
        Axios.get(`${url}/fornecedores/recuperarPorNomeFantasiaCnpj?nomeFantasiaCnpj=${nomeFantasiaCnpj}`)
        .then(
            async res => {
                if(!res.data)
                    setFailureMessage("Fornecedor não encontrado.");
                else {
                    setFornecedores(res.data);
                    props.setSelectedCodigoFornecedor(0);
                }
            },
            err => { setFailureMessage("Erro ao pesquisar fornecedor."); console.log(err); }
        );
    }

    const selectFornecedor = (codigo) => {
        props.setSelectedCodigoFornecedor(codigo);
    }
    
    return (<>
        <FormPesquisa
            cardSize="col-sm-4"
            cardTitle="Pesquisar fornecedor"
            pesquisar={pesquisarFornecedor}
            failureMessage={failureMessage}>
                <div className="row">
                    <Input 
                        inputName="Nome fantasia ou Cnpj"
                        inputId="nome"
                        inputValue={nomeFantasiaCnpj}
                        columnSettings="col-sm-12"
                        handleChange={e => setNomeFantasiaCnpj(e.target.value)}
                        validate={false}
                    />
                </div>
        </FormPesquisa>
        {!fornecedores || fornecedores.length === 0 ? "" : (
            <div className="row lista">
                <div className="col-sm-12 col-md-6">
                    <div className="card bg-light mb-6">
                        <div className="card-header">Selecione o fornecedor: </div>
                        <div className="card-body table-responsive">
                            <table className='table table-bordered'>
                                <thead class="table-light">
                                    <tr>
                                        <th>Código</th>
                                        <th>Nome fantasia</th>
                                        <th>Cnpj</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fornecedores.map(el => (
                                    <tr className={`row-select ${el.codigo === props.selectedCodigoFornecedor ? "row-selected": ""}`} key={el.codigo} onClick={() => selectFornecedor(el.codigo)}>
                                        <th scope="row">{el.codigo}</th>
                                        <td>{el.nomeFantasia}</td>
                                        <td>{el.cnpj}</td>
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

export default EtapaSelecionarFornecedor;