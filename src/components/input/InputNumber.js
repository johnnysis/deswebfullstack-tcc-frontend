import React from 'react';
import CurrencyFormat from 'react-currency-format';

const InputNumber = (props) => {
    return (
        <div className={`${props.columnSettings}`}>
            <label htmlFor={props.inputId} className="form-label">{props.inputName}</label>
            
            <CurrencyFormat id={props.inputId}
                class="form-control"
                value={props.inputValue}
                onChange={props.handleChange}
                maxLength={8}
                decimalScale={0}
                fixedDecimalScale={true}
                allowNegative={false}/>
        </div>
    )
}

export default InputNumber;