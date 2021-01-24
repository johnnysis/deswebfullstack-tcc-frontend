import React from 'react';
import PropTypes from 'prop-types';

const InputPassword = (props) => {
    return (
        <div className={`${props.columnSettings}`}>
            <label htmlFor={props.inputId} className="form-label">{props.inputName}</label>
            <input id={props.inputId} type="password" className="form-control" value={props.inputValue} onChange={props.handleChange}/>
        </div>
    )
}

InputPassword.propTypes = {
    columnSettings: PropTypes.string,
    inputValue: PropTypes.string,
    handleChange: PropTypes.func,
    inputName: PropTypes.string,
    validate: PropTypes.bool
}

export default InputPassword;