import React from 'react';

const FailureMessage = (props) => {
    return (
        <div className="col s12 l8 no-padding">
            <div className="alert alert-danger" role="alert">
                <span className="white-text">{props.failureMessage}
                </span>
            </div>
        </div>
    );
}

export default FailureMessage;