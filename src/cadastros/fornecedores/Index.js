import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import CreateEdit from './CreateEdit';
import { ModalExclusao } from '../../components/wrapper';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {lista: [], codigo: 0, exibeModal: false, editando: false};
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.confirmaRemocao = this.confirmaRemocao.bind(this);
        this.zerarCodigo = this.zerarCodigo.bind(this);
    }
    componentWillMount() {
        this.refreshFornecedores();   
        
    }
    refreshFornecedores() {
        axios.get(`${url}/fornecedores`)
            .then(response => {
                this.setState({lista: response.data});
            });
    }
    zerarCodigo() {
        this.setState({codigo: 0, editando: false});
    }
    edit(codigo) {
        this.setState({codigo, editando: true});
    }    
    remove(codigo) {
        this.setState({codigo});
    }
    confirmaRemocao(codigo) {
        if(codigo)
            axios.delete(`${url}/fornecedores/${codigo}`).then(() => {
                this.refreshFornecedores();
                this.zerarCodigo();
            }, (err) => console.log(err));
    }
    render() {
        return (
        <>
            <div className="container">
                <ModalExclusao id="modal-exclusao"
                    codigo={this.state.codigo}
                    handleClick={this.confirmaRemocao}/>

                <div className="row">
                    <CreateEdit codigo={this.state.codigo} editando={this.state.editando} metodos={() => {this.refreshFornecedores()}} zerarCodigo={this.zerarCodigo}/>
                </div>
                <div className="row lista">
                    <div className="col-sm-12">
                        <div className="card bg-light mb-6">
                            <div className="card-header">Lista de fornecedores</div>
                            <div className="card-body table-responsive">
                                <table className='table table-striped'>
                                    <thead class="table-light">
                                        <tr>
                                            <th>Código</th>
                                            <th>Nome</th>
                                            <th>Cidade</th>
                                            <th>Estado</th>
                                            <th>Logradouro</th>
                                            <th>Bairro</th>
                                            <th>Número</th>
                                            <th>CEP</th>
                                            <th>E-mail</th>
                                            <th>Cnpj</th>
                                            <th>Razão Social</th>
                                            <th>Nome Fantasia</th>
                                            <th class="th-opcao">Opção</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lista.map(el => (
                                        <tr key={el.codigo}>
                                            <th scope="row">{el.codigo}</th>
                                            <td>{el.nome}</td>
                                            <td>{el.cidade.nome}</td>
                                            <td>{el.cidade.estado.descricao}</td>
                                            <td>{el.logradouro}</td>
                                            <td>{el.bairro}</td>
                                            <td>{el.numero}</td>
                                            <td>{el.cep}</td>
                                            <td>{el.email}</td>
                                            <td>{el.cnpj}</td>
                                            <td>{el.razaoSocial}</td>
                                            <td>{el.nomeFantasia}</td>
                                            <td>
                                                <button type="button" className="btn btn-info btn-circle btn-esquerda"
                                                    onClick={() => this.edit(el.codigo)}><i className="fa fa-pencil"></i></button>
                                                <button type="button" className="btn btn-info btn-circle btn-danger"
                                                    data-toggle="modal" data-target="#modal-exclusao"
                                                    onClick={() => this.remove(el.codigo)}
                                                    ><i className="fa fa-trash"></i></button>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Index;