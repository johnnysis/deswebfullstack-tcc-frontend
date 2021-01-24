import React from 'react';
import { Link } from 'react-router-dom';

const onClick = () => {
    localStorage.removeItem('token');
    window.location.href = window.location.origin;
}

const defaultHref = "#";

const Navbar = () => (
<nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
    <div className="container-fluid">
        <Link to="/" className="navbar-brand"><img alt="logo" className="logo-nav" src={"/assets/img/logo.png"}/></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">Início</Link>
            {/* <a class="nav-link active" aria-current="page" href="#">Início</a> */}
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href={defaultHref} id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    Cadastros
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link to="/usuarios/" className="dropdown-item">Usuários</Link></li>
                    <li><Link to="/fornecedores/" className="dropdown-item">Fornecedores</Link></li>
                    <li><Link to="/clientes/" className="dropdown-item">Clientes</Link></li>
                    <li><Link to="/categorias/" className="dropdown-item">Categorias</Link></li>
                    <li><Link to="/produtos/" className="dropdown-item">Produtos</Link></li>
                    <li><Link to="/formasdepagamento/" className="dropdown-item">Formas de Pagamento</Link></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href={defaultHref} id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    Transações
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link to="/compra/" className="dropdown-item">Compra</Link></li>
                    <li><Link to="/pagamento/" className="dropdown-item">Pagamento</Link></li>
                    <li><Link to="/venda/" className="dropdown-item">Venda</Link></li>
                </ul>
            </li>
        </ul>
        
        </div>
        <ul className="navbar-nav">
            <li className="nav-item"><a href={defaultHref} onClick={onClick} className="nav-link">Logout</a></li>
        </ul>
    </div>
</nav>);

export default Navbar;