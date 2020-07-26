import React from 'react';

const InputButton = (props) => {
    return (
        <button className="btn btn-primary botao-salvar" type="submit" name="action">{props.buttonName}
            {/* <i className="material-icons right">send</i> */}
        </button>
    )
}

export default InputButton;