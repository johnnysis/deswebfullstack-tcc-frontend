import React from 'react';

const FailureMessageWithList = (props) => {
    return (
        <div className="col s12 l8 no-padding">
            <div className="card-panel red">
                <span className="white-text">Erro! {props.messageTitle}
                    {props.messagesList.map((el) => 
                        (<ul>
                            <li>- {el}</li>
                        </ul>)
                    )}
                </span>
            </div>
        </div>
    );
}

export default FailureMessageWithList;