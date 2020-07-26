import React from 'react';
import PropTypes from 'prop-types';

//id; validate (true or false); onChange

const InputText = (props) => {
    return (
        <div className={`${props.columnSettings}`}>
            {/* <div className="col-sm-2 col-form-label"> */}
                <label htmlFor={props.inputId} className="form-label">{props.inputName}</label>
            {/* </div> */}
            {/* <div className="col-sm-10"> */}
                <input id={props.inputId} type="text" className="form-control" value={props.inputValue} onChange={props.handleChange}/>
            {/* </div> */}
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