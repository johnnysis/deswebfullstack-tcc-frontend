import React from 'react';
import PropTypes from 'prop-types';

//id; validate (true or false); onChange

const InputPassword = (props) => {
    return (
        <div className={`${props.columnSettings}`}>
            {/* <div className="col-sm-2 col-form-label"> */}
                <label htmlFor={props.inputId} className="form-label">{props.inputName}</label>
            {/* </div> */}
            {/* <div className="col-sm-10"> */}
                <input id={props.inputId} type="password" className="form-control" value={props.inputValue} onChange={props.handleChange}/>
            {/* </div> */}
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