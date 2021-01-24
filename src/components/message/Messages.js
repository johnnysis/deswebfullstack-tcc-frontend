import React from 'react';
import FailureMessage from './FailureMessage';
import FailureMessageWithList from './FailureMessageWithList';
import SuccessMessage from './SuccessMessage';

const Messages = (props) => (
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
);
export default Messages;