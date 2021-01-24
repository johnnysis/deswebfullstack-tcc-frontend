import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, Router } from 'react-router-dom';
import { Input } from './components/input';
import InputPassword from './components/input/InputPassword';
import { Form } from './components/wrapper';
import { url } from './util/constants';
import {} from './util/constants';

const LoginGoogle = ({ location }) => {
    
    useEffect(() => {
        console.log('teste');
        console.log(location.search);

        console.log(`login/google/redirect${location.search}`);
        
        Axios.get(`/login/google/redirect${location.search}`).then(response => {
            console.log(response);
            // response: 
        })
        .catch(err => console.log(err));
    }, [location.search]);

    return (
        <></> //chamar tela de registro.
    );
}

export default LoginGoogle;