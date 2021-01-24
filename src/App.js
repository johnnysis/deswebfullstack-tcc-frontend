import React, { Component } from 'react';
import Axios from 'axios';

import './App.css';
import { Routes, LoginRoutes } from './Routes';
import Navbar from './Navbar';
import { isAuthenticated } from './Auth';
import { url } from './util/constants';

class App extends Component {
  constructor() {
    super();
    this.state = {
      autenticado: false
    };
    Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    Axios.defaults.baseURL = url;
  }

  async componentDidMount() {
    var isAuth = await isAuthenticated();
    this.setState({autenticado: isAuth });
  }
  
  
  render() {
    return !this.state.autenticado ? <LoginRoutes /> : <Routes component={Navbar}/>   //passa a localização da rota.
  };
}

export default App;