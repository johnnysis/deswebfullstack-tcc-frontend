import React from 'react';
import { InputButton } from '../input';
import './Form.css';
import Messages from '../message/Messages';

const FormPesquisa = (props) => {
    return (
    <div className="container form-style">
        <div className="row">
            <div className={`${props.cardSize} no-padding`}>
                <div className="card bg-light mb-6">
                    <div className="card-header">{props.cardTitle}</div>
                    <div className="card-body ">
                        <div className="card-text">
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="container">
                                    { props.children }
                                    <Messages failureMessage={props.failureMessage}/>
                                    <div className="botoes-form">
                                        <InputButton buttonName="Pesquisar" estilo="btn-primary" handleClick={props.pesquisar}/>
                                    </div>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
export default FormPesquisa;