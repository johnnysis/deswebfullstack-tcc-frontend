import React from 'react';
import PropTypes from 'prop-types';

//id; validate (true or false); onChange

const InputText = (props) => {
    return (
        <div className={`input-field ${props.columnSettings}`}>
            <input id={props.inputId} type="date" className={props.validate} value={props.inputValue} onChange={props.handleChange}/>
            <label htmlFor={props.inputId}>{props.inputName}</label>
        </div>
    )
}

InputText.propTypes = {
    columnSettings: PropTypes.string,
    inputValue: PropTypes.string,
    handleChange: PropTypes.func,
    inputName: PropTypes.string,
    validate: PropTypes.bool
}

export default InputText;