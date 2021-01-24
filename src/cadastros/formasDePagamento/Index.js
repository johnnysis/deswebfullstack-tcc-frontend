import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import CreateEdit from './CreateEdit';
import { ModalExclusao } from '../../components/wrapper';
import exportToPdf from '../../util/exportToPdf';
import exportToXlsx from '../../util/exportToXlsx';

class Index extends Component {
    constructor(props) {
        super(props);
        
        this.state = {lista: [], codigo: 0, exibeModal: false, editando: false};
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.confirmaRemocao = this.confirmaRemocao.bind(this);
        this.zerarCodigo = this.zerarCodigo.bind(this);
        this.exportToPdf = this.exportToPdf.bind(this);
        this.exportToXlsx = this.exportToXlsx.bind(this);
        this.getArrayDeDados = this.getArrayDeDados.bind(this);
    }
    componentWillMount() {
        this.refreshFormasDePagamento();   
        
    }
    refreshFormasDePagamento() {
        axios.get(`${url}/formasPagamento`)
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
    refreshClientes() {
        axios.get(`${url}/clientes`)
            .then(response => {
                this.setState({lista: response.data});
            });
    }

    getArrayDeDados() {
        let arrData = [];
        
        for(let data of this.state.lista)
            arrData.push([data.codigo.toString().toUpperCase(),
                data.descricao.toUpperCase()
            ]);

        return arrData;
    }

    exportToPdf() {
        let columns = ['Código', 'Descrição'];
        exportToPdf(columns, this.getArrayDeDados(), 'Formas de pagamento', 12, 'FormasDePagamento.pdf');
    }
    exportToXlsx() {
        let columns = ['Código', 'Descrição'];
        exportToXlsx(columns, this.getArrayDeDados(), 'FormasDePagamento.xlsx');
    }
    remove(codigo) {
        this.setState({codigo});        
    }
    confirmaRemocao(codigo) {
        if(codigo)
            axios.delete(`${url}/formasPagamento/${codigo}`).then(() => {
                this.refreshFormasDePagamento();
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
                    <CreateEdit codigo={this.state.codigo} editando={this.state.editando} metodos={() => {this.refreshFormasDePagamento()}} zerarCodigo={this.zerarCodigo}/>
                </div>
                <div className="row lista">
                    <div className="col-sm-6">
                        <div className="card bg-light mb-6">
                            <div className="card-header">Lista de formas de pagamento</div>
                            <div className="card-body">
                        
                                <table className='table table-bordered'>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Código</th>
                                            <th>Descrição</th>
                                            <th>Opção</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lista.map(el => (
                                        <tr key={el.codigo}>
                                            <th scope="row">{el.codigo}</th>
                                            <td>{el.descricao}</td>
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