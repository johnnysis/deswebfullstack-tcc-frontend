import React from 'react';

const FailureMessageWithList = (props) => {
    return (
        <div className="col s12 l8 no-padding">
            <div className="alert alert-danger" role="alert">
                <span className="white-text">Erro! {props.messageTitle}</span>
                {props.messagesList.map((el) => 
                    (<ul>
                        <li>{el}</li>
                    </ul>)
                )}
            </div>
        </div>
    );
}

export default FailureMessageWithList;