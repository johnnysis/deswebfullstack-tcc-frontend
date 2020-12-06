import React from 'react';
import CurrencyFormat from 'react-currency-format';

const InputCurrency = (props) => {
    return (
        <div className={`${props.columnSettings}`}>
            <label htmlFor={props.inputId} className="form-label">{props.inputName}</label>
            
            <CurrencyFormat id={props.inputId}
                class="form-control"
                value={props.inputValue}
                onChange={props.handleChange}
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}/>
        </div>
    )
}

export default InputCurrency;