import React from 'react';

const SuccessMessage = (props) => {
    return (
        <div className="col s12 l8 no-padding">
            <div className="card-panel teal">
                <span className="white-text">{props.successMessage}
                </span>
            </div>
        </div>
    );
}

export default SuccessMessage;