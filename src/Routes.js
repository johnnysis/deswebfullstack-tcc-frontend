import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
// import PrivateRoute from './PrivateRoute';

import IndexCategoria from './cadastros/categorias/Index';
import IndexCliente from './cadastros/clientes/Index';
import IndexUsuario from './cadastros/usuarios/Index';
import IndexFornecedores from './cadastros/fornecedores/Index';
import IndexProdutos from './cadastros/produtos/Index';
import IndexFormasDePagamento from './cadastros/formasDePagamento/Index';
import IndexVenda from './operacoes/venda/Index';
import IndexCompra from './operacoes/compra/Index';
import IndexPagamento from './operacoes/pagamento/Index';
import Login from './Login';
import LoginGoogle from './LoginGoogle';
export const Routes = ({component: Component}) => (
<Router>
    <Component />
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/categorias/" component={IndexCategoria} />
        <Route path="/clientes/" component={IndexCliente} />
        <Route path="/usuarios/" component={IndexUsuario} />
        <Route path="/fornecedores/" component={IndexFornecedores} />
        <Route path="/produtos/" component={IndexProdutos} />
        <Route path="/formasdepagamento/" component={IndexFormasDePagamento} />

        <Route path="/venda/" component={IndexVenda} />
        <Route path="/compra/" component={IndexCompra} />
        <Route path="/pagamento/" component={IndexPagamento} />
    </Switch>
</Router>);

export const LoginRoutes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login/google" component={LoginGoogle} />
        </Switch>
    </Router>
);

// export default { Routes, LoginRoutes };