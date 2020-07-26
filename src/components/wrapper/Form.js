import React from 'react';
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
    if(props.failureMessage)
        alert(props.failureMessage);
    return (
    <div className="container form-style">
        <div className="row">
            <div className={`${props.cardSize} no-padding`}>
                <div class="card bg-light mb-3">
                    <div className="card-header">{props.cardTitle}</div>
                    <div className="card-body ">
                        <form onSubmit={props.handleSubmit}>
                            {/* <h4 className="card-title"></h4> */}
                            <div className="card-text">
                                {props.children}
                                <InputButton buttonName="Salvar"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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