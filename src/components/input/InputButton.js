import React from 'react';

const InputButton = (props) => {
    return (
        <button className={`btn ${props.estilo} btn-estilo`} type="button" name="action" onClick={props.handleClick}>{props.buttonName}
            {/* <i className="material-icons right">send</i> */}
        </button>
    )
}

export default InputButton;