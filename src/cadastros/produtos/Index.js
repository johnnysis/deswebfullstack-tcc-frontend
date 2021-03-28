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
        this.refreshProdutos();   
        
    }
    refreshProdutos() {
        axios.get(`${url}/produtos`)
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
        // console.log(codigo);
        this.setState({codigo});
    }
    getArrayDeDados() {
        let arrData = [];
        for(let data of this.state.lista) {
            arrData.push([data.codigo,
                data.descricao.toUpperCase(),
                data.categoria.descricao.toUpperCase(),
                data.quantidade,
                data.preco.toLocaleString("pt-BR", {minimumFractionDigits: 2})
            ]);
        }

        return arrData;
    }
    exportToPdf() {
        let columns = ['Código', 'Descrição', 'Categoria', 'Quantidade', 'Preço (R$)'];
        exportToPdf(columns, this.getArrayDeDados(), 'Produtos', 12, 'Produtos.pdf');
    }
    exportToXlsx() {
        let columns = ['Código', 'Descrição', 'Categoria', 'Quantidade', 'Preço (R$)'];
        exportToXlsx(columns, this.getArrayDeDados(), 'Produtos.xlsx');
    }
    confirmaRemocao(codigo) {
        if(codigo)
            axios.delete(`${url}/produtos/${codigo}`).then(() => {
                this.refreshProdutos();
                this.zerarCodigo();
            }, (err) => this.setState({failureMessage: "Erro ao excluir produto." }));
    }
    render() {
        return (
        <>
            <div className="container">
                <ModalExclusao id="modal-exclusao"
                    codigo={this.state.codigo}
                    handleClick={this.confirmaRemocao}/>

                <div className="row">
                    <CreateEdit codigo={this.state.codigo} editando={this.state.editando} metodos={() => {this.refreshProdutos()}} zerarCodigo={this.zerarCodigo}/>
                </div>
                <div className="row lista">
                    <div className="col-sm-8">
                        <div className="card bg-light mb-6">
                            <div className="card-header">Lista de produtos</div>
                            <div className="card-body table-responsive">
                                <Messages failureMessage={this.state.failureMessage}/>
                                <table className='table table-bordered'>
                                    <thead className="table-light">
                                    <tr>
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Quantidade</th>
                                        <th>Preço (R$)</th>
                                        <th>Opção</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lista.map(el => (
                                        <tr key={el.codigo}>
                                            <th scope="row">{el.codigo}</th>
                                            <td>{el.descricao}</td>
                                            <td>{el.categoria.descricao}</td>
                                            <td>{el.quantidade}</td>
                                            <td>{el.preco.toLocaleString("pt-BR", {minimumFractionDigits: 2})}</td>
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