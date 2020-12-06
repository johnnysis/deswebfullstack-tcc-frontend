import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import { Input } from '../../components/input';
import { Form } from '../../components/wrapper';

const CreateEdit = (props) => {
    const [descricao, setDescricao] = useState('');

    const [messagesList, setMessagesList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    function handleChangeDefault(e, callback) {
        callback(e.target.value);
    }

    const save = () => {
        const messages = [];

        if(!descricao)
            messages.push('Descrição');

        if(messages.length > 0)
            setMessagesList(messages);
        else {
            setMessagesList([]);
            let codigo = props.codigo && props.editando ? props.codigo : 0;
            axios.post(`${url}/categorias/create`, {codigo, descricao})
            .then(
                res => {
                    props.metodos();
                    setSuccessMessage('Salvo com sucesso!');
                    cleanMessageTimeout();

                    limpar();
                },
                err => console.log(err));
        }
    }

    const cleanMessageTimeout = () => {
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
    }

    const limpar = () => {
        props.zerarCodigo();
        setDescricao('');
    }

    useEffect(() => {
        if(props.codigo && props.editando)
            axios.get(`${url}/categorias/${props.codigo}`)
            .then(response => {
                setDescricao(response.data.descricao);
            });
        else
            setDescricao('');
    }, [props.codigo, props.editando]);
    
    
    return(
        <Form
            cardSize="col-sm-4"
            cardTitle={props.codigo && props.editando ? "Editar categoria" : "Nova categoria" }
            save={save}
            messagesList={messagesList}
            successMessage={successMessage}
            limpar={limpar}>
            <Input 
                inputName="Descrição"
                inputId="descricao"
                inputValue={descricao}
                columnSettings="col-sm-12"
                handleChange={e => handleChangeDefault(e, setDescricao)}
                validate={true}
            />
        </Form>
    )
}

export default CreateEdit;