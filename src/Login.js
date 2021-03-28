import Axios from 'axios';
import React, { useState } from 'react';
import { Input } from './components/input';
import InputPassword from './components/input/InputPassword';
import Messages from './components/message/Messages';
import { Form } from './components/wrapper';
import { url } from './util/constants';
import { formTypes } from './util/constants';

const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const [failureMessage, setFailureMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    function handleChangeDefault(e, callback) {
        callback(e.target.value);
    }

    const handleClick = (e) => {
        Axios.post(`${url}/login`, {login, senha})
            .then(result => {
                localStorage.setItem('token', result.data.token);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data.erro);
                setFailureMessage(error.response.data.erro);
            });
    }
    return (
        <Form
            cardSize="col-sm-6"
            cardTitle="Login"
            handleClick={handleClick}
            messagesList={messagesList}
            formType={ formTypes.LOGIN}>
            <Input 
                inputName="Login"
                inputId="login"
                inputValue={login}
                columnSettings="col-sm-12"
                handleChange={e => handleChangeDefault(e, setLogin)}
                validate={true}
            />
            <InputPassword 
                inputName="Senha"
                inputId="senha"
                inputValue={senha}
                columnSettings="col-sm-12"
                handleChange={e => handleChangeDefault(e, setSenha)}
                validate={true}
            />
            <Messages failureMessage={failureMessage}/>
        </Form>
    );
}

export default Login;