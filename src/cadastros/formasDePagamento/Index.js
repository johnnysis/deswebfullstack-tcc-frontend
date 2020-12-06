import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import CreateEdit from './CreateEdit';
import { ModalExclusao } from '../../components/wrapper';

// import Create from './Create';

// import {pointToColon} from '..//util/conversor';
// formasPagamento

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
    remove(codigo) {
        // console.log(codigo);
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Index;