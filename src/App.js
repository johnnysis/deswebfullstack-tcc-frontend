import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import IndexCategoria from './cadastros/categorias/Index';
import IndexCliente from './cadastros/clientes/Index';
import IndexUsuario from './cadastros/usuarios/Index';
import IndexFornecedores from './cadastros/fornecedores/Index';
import IndexProdutos from './cadastros/produtos/Index';
import IndexFormasDePagamento from './cadastros/formasDePagamento/Index';

import Home from './Home';

function App() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Início</Link>
                {/* <a class="nav-link active" aria-current="page" href="#">Início</a> */}
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                  Cadastros
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link to="/usuarios/" className="dropdown-item">Usuários</Link></li>
                  <li><Link to="/fornecedores/" className="dropdown-item">Fornecedores</Link></li>
                  <li><Link to="/clientes/" className="dropdown-item">Clientes</Link></li>
                  <li><Link to="/categorias/" className="dropdown-item">Categorias</Link></li>
                  <li><Link to="/produtos/" className="dropdown-item">Produtos</Link></li>
                  <li><Link to="/formasdepagamento/" className="dropdown-item">Formas de Pagamento</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/" exact component={Home} />
        
        <Route path="/categorias/" component={IndexCategoria} />
        <Route path="/clientes/" component={IndexCliente} />
        <Route path="/usuarios/" component={IndexUsuario} />
        <Route path="/fornecedores/" component={IndexFornecedores} />
        <Route path="/produtos/" component={IndexProdutos} />
        <Route path="/formasdepagamento/" component={IndexFormasDePagamento} />
        {/* <Route path="/assinaturas/" component={LayoutAssinaturas} /> */}
      </Switch>
    </Router>
  );
}

export default App;