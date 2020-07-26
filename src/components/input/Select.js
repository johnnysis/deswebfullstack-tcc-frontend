import React from 'react';

//lista de tipo genérico.
export default (props) => {

    // console.log(props.inputValue !== null && props.inputValue !== undefined ? props.inputValue : '');
    return (
    <div className={`input-field ${props.columnSettings}`}>
        
        <select value={!props.inputValue ? props.inputValue : ''} onChange={props.handleChange}>
            <option value="0" key = "0" disabled>Escolha o {props.labelName}</option>
            {props.lista !== undefined && props.lista !== null ?  
            props.lista.map(e => <option value={e.codigo} key={e.codigo}>{e.descricao}</option>)
            : ''}
            
        </select>
        <label>{props.labelName}</label>
    </div>);
}