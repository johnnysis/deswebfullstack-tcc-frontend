import React from 'react';

//lista de tipo genérico.
export default (props) => {

    return (
    <div className={`input-field ${props.columnSettings}`}>
        <label htmlFor={props.inputId} className="form-label">{props.labelName}</label>
        <select id={props.inputId} className="form-select form-control" value={! props.inputValue !== -1 ? props.inputValue : -1} onChange={props.handleChange}>
            <option value="-1" key = "-1">Selecione</option>
            {props.lista !== undefined && props.lista !== null ?  
            props.lista.map(e => <option value={e.codigo} key={e.codigo}>{e.descricao ? e.descricao : e.nome}</option>)
            : ''}
            
        </select>
    </div>);
}