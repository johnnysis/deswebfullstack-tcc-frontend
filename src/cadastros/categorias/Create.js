import React, { useState } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import { Input } from '../../components/input';
import { Form } from '../../components/wrapper';

const Create = () => {
    const [codigo, setCodigo] = useState(0);
    const [descricao, setDescricao] = useState('');

    const [messagesList, setMessagesList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    function handleChangeDefault(e, callback) {
        callback(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let config = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'}
        }

        console.log(url);
        axios.post(`${url}/categorias`, {codigo, descricao}, config);
    }
    
    return(
        <Form
            cardSize="col-sm-6"
            cardTitle="Nova categoria"
            handleSubmit={handleSubmit}
            messagesList={messagesList}
            successMessage={successMessage}>
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

export default Create;