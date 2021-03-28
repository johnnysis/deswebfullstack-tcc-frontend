import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import CreateEdit from './CreateEdit';
import { ModalExclusao } from '../../components/wrapper';
import exportToPdf from '../../util/exportToPdf';
import exportToXlsx from '../../util/exportToXlsx';
import Messages from '../../components/message/Messages';

class Index extends Component {
    constructor(props) {
        super(props);
        
        this.state = {lista: [], codigo: 0, exibeModal: false, editando: false, failureMessage: ''};
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.confirmaRemocao = this.confirmaRemocao.bind(this);
        this.zerarCodigo = this.zerarCodigo.bind(this);
        this.exportToPdf = this.exportToPdf.bind(this);
        this.exportToXlsx = this.exportToXlsx.bind(this);
        this.getArrayDeDados = this.getArrayDeDados.bind(this);
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
    getArrayDeDados() {
        let arrData = [];
        for(let data of this.state.lista) {
            arrData.push([data.codigo,
                data.nomeFantasia.toUpperCase(),
                data.razaoSocial.toUpperCase(),
                data.cnpj.toUpperCase(),
                data.email.toUpperCase(),
                data.cidade.nome.toUpperCase(),
                data.cidade.estado.descricao.toUpperCase(),
                data.cep.toUpperCase(),
                data.logradouro.toUpperCase(),
                data.numero.toUpperCase(),
                data.bairro.toUpperCase()
            ]);
        }

        return arrData;
    }
    exportToPdf() {       
        let columns = ['Código', 'Nome Fantasia', 'Razão Social', 'CNPJ', 'Email', 'Cidade', 'Estado', 'CEP', 'Logradouro',
                    'Número', 'Bairro']; 
        exportToPdf(columns, this.getArrayDeDados(), 'Fornecedores', 9, 'Fornecedores.pdf');
    }
    exportToXlsx() {
        let columns = ['Código', 'Nome Fantasia', 'Razão Social', 'CNPJ', 'Email', 'Cidade', 'Estado', 'CEP', 'Logradouro',
                    'Número', 'Bairro']; 

        exportToXlsx(columns, this.getArrayDeDados(), 'Fornecedores.xlsx');
    }
    remove(codigo) {
        this.setState({codigo});
    }
    confirmaRemocao(codigo) {
        if(codigo)
            axios.delete(`${url}/fornecedores/${codigo}`).then(() => {
                this.refreshFornecedores();
                this.zerarCodigo();
            }, (err) => this.setState({failureMessage: err.response.data.erro }));
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
                                <Messages failureMessage={this.state.failureMessage}/>
                                <table className='table table-striped'>
                                    <thead class="table-light">
                                        <tr>
                                            <th>Código</th>
                                            <th>Nome Fantasia</th>
                                            <th>Razão Social</th>
                                            <th>Cidade</th>
                                            <th>Estado</th>
                                            <th>Logradouro</th>
                                            <th>Bairro</th>
                                            <th>Número</th>
                                            <th>CEP</th>
                                            <th>E-mail</th>
                                            <th>Cnpj</th>
                                            
                                            <th class="th-opcao">Opção</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lista.map(el => (
                                        <tr key={el.codigo}>
                                            <th scope="row">{el.codigo}</th>
                                            <td>{el.nomeFantasia}</td>
                                            <td>{el.razaoSocial}</td>
                                            <td>{el.nome}</td>
                                            <td>{el.cidade.nome}</td>
                                            <td>{el.cidade.estado.descricao}</td>
                                            <td>{el.logradouro}</td>
                                            <td>{el.bairro}</td>
                                            <td>{el.numero}</td>
                                            <td>{el.cep}</td>
                                            <td>{el.email}</td>
                                            <td>{el.cnpj}</td>
                                            
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

                                <button type="button" className="btn btn-danger mb-1" onClick={this.exportToPdf}>
                                    <i className="fa fa-file-pdf-o"></i> PDF
                                </button>
                                <button type="button" className="btn btn-success mx-1 mb-1" onClick={this.exportToXlsx}>
                                    <i className="fa fa-file-excel-o"></i> Excel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Index;