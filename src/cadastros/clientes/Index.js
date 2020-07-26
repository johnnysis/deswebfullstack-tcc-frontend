import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import Create from './Create';

// import {pointToColon} from '..//util/conversor';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {lista: []};
    }
    componentWillMount() {
        console.log(url);
        axios.get(`${url}/clientes`)
            .then(response => {
                this.setState({lista: response.data});
                console.log(response.data);
            });
    }

    render() {
        return (
        <>
            <div class="container">
                <div class="row">
                    {/* <Create /> */}
                </div>
                <div class="row">
                    <div className="col-sm-12">
                        <h4>Lista de clientes</h4>
                        <table className='table table-bordered'>
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
                                    <th>CPF</th>
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
                                    <td>{el.cpf}</td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Index;