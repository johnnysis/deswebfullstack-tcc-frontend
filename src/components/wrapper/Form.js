import React from 'react';
import PropTypes from 'prop-types';
import { InputButton } from '../input';
import './Form.css';
import Messages from '../message/Messages';
import { formTypes } from '../../util/constants';

const Form = (props) => {
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
                                        { props.formType && props.formType === formTypes.LOGIN ? (
                                            <div className="botoes-form">
                                                <InputButton buttonName="Login" estilo="btn-primary btn-esquerda" handleClick={props.handleClick}/>
                                            </div>
                                        ) : (<div className="botoes-form">
                                                <InputButton buttonName="Salvar" estilo="btn-success btn-esquerda" handleClick={props.save}/>
                                                <InputButton buttonName="Limpar" estilo="btn-secondary" handleClick={props.limpar} style={{display: "inline-block"}}/>
                                            </div>)}
                                        
                                    </div>
                                </form>
                            </div>  
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <Messages {...props}/>
        </div>
    </div>
    );
}

Form.propTypes = {
    cardSize: PropTypes.string,
    handleSubmit: PropTypes.func,
    cardTitle: PropTypes.string,
    messagesList: PropTypes.array,
    successMessage: PropTypes.string
};

export default Form;