import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import {toRealMask} from '../../util/conversor';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Create from './Create';

// import {pointToColon} from '..//util/conversor';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {lista: []};
    }
    componentWillMount() {
        console.log(url);
        axios.get(`${url}/produtos`)
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
                    <div className="col-sm-6">
                        <h4>Lista de produtos</h4>
                        <table className='table table-bordered'>
                            <thead class="table-light">
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Quantidade</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(el => (
                                <tr key={el.codigo}>
                                    <th scope="row">{el.codigo}</th>
                                    <td>{el.descricao}</td>
                                    <td>{el.quantidade}</td>
                                    <td>{el.preco.toString().replace('.', ',')}</td>
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