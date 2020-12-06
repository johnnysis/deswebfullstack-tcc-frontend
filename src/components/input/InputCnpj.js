import React from 'react';
import CurrencyFormat from 'react-currency-format';

const InputCnpj = (props) => {
    return (
        <div className={`${props.columnSettings}`}>
            <label htmlFor={props.inputId} className="form-label">{props.inputName}</label>
            
            <CurrencyFormat id={props.inputId}
                class="form-control"
                value={props.inputValue}
                onChange={props.handleChange}
                format="##.###.###/####-##"
                mask="_"
                allowNegative={false}/>
        </div>
    )
}

export default InputCnpj;