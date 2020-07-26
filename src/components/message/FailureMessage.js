import React from 'react';

const FailureMessage = (props) => {
    return (
        <div className="col s12 l8 no-padding">
            <div className="card-panel red">
                <span className="white-text">{props.failureMessage}
                </span>
            </div>
        </div>
    );
}

export default FailureMessage;