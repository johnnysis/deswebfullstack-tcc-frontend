import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputButton } from '../input';
import { FailureMessage, SuccessMessage, FailureMessageWithList } from '../message';
import './Form.css';


/*
cardTitle="Novo Colaborador"
cardSize="col s12 m4"
handleSubmit={handleSubmit}
messagesList={messagesList}
successMessage={successMessage}
*/
const Form = (props) => {
    const [flag, setFlag] = useState(false);
    const [messagesList, setMessagesList] = useState(props.messagesList);
    const [failureMessage, setFailureMessage] = useState(props.failureMessage);
    const [successMessage, setSuccessMessage] = useState(props.successMessage);

    // if(props.messagesList) {
    //     setMessagesList(props.messagesList)
    //     // setTimeout(() => setMessagesList(null), 2000);
    // }
    // if(props.failureMessage) {
    //     setFailureMessage(props.failureMessage)
    //     // setTimeout(() => setFailureMessage(null), 2000);
    // }
    // if(props.successMessage) {
    //     setSuccessMessage(props.successMessage)
    //     // setTimeout(() => setSuccessMessage(null), 2000);
    // }

    return (
    <div className="container form-style">
        <div className="row">
            <div className={`${props.cardSize} no-padding`}>
                <div className="card bg-light mb-6">
                    <div className="card-header">{props.cardTitle}</div>
                    <div className="card-body ">
                        
                            {/* <h4 className="card-title"></h4> */}
                            <div className="card-text">
                                <form onSubmit={e => e.preventDefault()}>
                                    <div className="container">
                                        {props.children}
                                    
                                        <div className="botoes-form">
                                            <InputButton buttonName="Salvar" estilo="btn-success btn-esquerda" handleClick={props.save}/>
                                            <InputButton buttonName="Limpar" estilo="btn-secondary" handleClick={props.limpar} style={{display: "inline-block"}}/>
                                        </div>
                                    </div>
                                </form>
                            </div>  
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className={`${props.cardSize} no-padding`}>
                {props.messagesList && props.messagesList.length > 0 ?
                    <FailureMessageWithList messageTitle="Preencha os seguintes campos corretamente:" messagesList={props.messagesList}/>
                    : ''}
                {props.failureMessage ? 
                    <FailureMessage failureMessage={props.failureMessage} />
                    : ''}
                {props.successMessage ? 
                    <SuccessMessage successMessage={props.successMessage} />
                    : ''}
            </div>
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