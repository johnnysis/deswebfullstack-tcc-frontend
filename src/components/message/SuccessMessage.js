import React from 'react';

const SuccessMessage = (props) => {
    return (
        <div className="col s12 l8 no-padding">
            <div className="alert alert-success" role="alert">
                {props.successMessage}
            </div>
        </div>
    );
}

export default SuccessMessage;