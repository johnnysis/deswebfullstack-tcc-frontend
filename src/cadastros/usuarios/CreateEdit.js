import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import { Input, InputCep, Select } from '../../components/input';
import { Form } from '../../components/wrapper';

const CreateEdit = (props) => {
    const [nome, setNome] = useState('');
    const [codigoCidade, setCodigoCidade] = useState('');
    const [codigoEstado, setCodigoEstado] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    
    const [listaEstados, setListaEstados] = useState([]);
    const [listaCidades, setListaCidades] = useState([]);

    const [messagesList, setMessagesList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    function handleChangeDefault(e, callback) {
        callback(e.target.value);
    }

    function handleChangeEstado(e) {
        let codigoEstado = e.target.value;
        setCodigoEstado(codigoEstado);
        atualizaCidades(codigoEstado);
    }

    function atualizaCidades(codigoEstado) {
        axios.get(`${url}/cidades?codigoEstado=${codigoEstado}`)
        .then(response => {
            setListaCidades(response.data);
        });
    }

    function validarInputs(messages) {
        if(codigoEstado === -1)
            messages.push('Estado');
        if(codigoCidade === -1)
            messages.push('Cidade');

        if(!nome)
            messages.push('Nome');
        if(!logradouro)
            messages.push('Logradouro');
        if(!bairro)
            messages.push('Bairro');
        if(!numero)
            messages.push('Número');
        if(!cep || cep.replaceAll("_").length !== 9)
            messages.push('CEP');
        if(!email || email.indexOf("@") === -1)
            messages.push('Email');
    }

    const save = () => {
        const messages = [];

        validarInputs(messages);

        if(messages.length > 0)
            setMessagesList(messages);
        else {
            setMessagesList([]);
            let codigo = props.codigo && props.editando ? props.codigo : 0;
            axios.post(`${url}/usuarios/register`,
                    {codigo, login, senha, nome, codigoCidade, codigoEstado, logradouro,
                    bairro, numero, cep, email}
                )
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
        setNome('');
        setLogradouro('');
        setBairro('');
        setNumero('');
        setCep('');
        setEmail('');
        setLogin('');
        setSenha('');

        setCodigoEstado(-1);
        setCodigoCidade(-1);
    }

    useEffect(() => {
        preencheEstados();
        console.log(props.codigo, props.editando);
        if(props.codigo && props.editando)
            axios.get(`${url}/usuarios/${props.codigo}`)
            .then(async response => {
                if(response.status !== 500) {
                    setLogin(response.data.login);
                    setNome(response.data.nome);
                    setLogradouro(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setNumero(response.data.numero);
                    setCep(response.data.cep);
                    setEmail(response.data.email);

                    setCodigoEstado(response.data.cidade.estado.codigo);
                    await atualizaCidades(response.data.cidade.estado.codigo);
                    setCodigoCidade(response.data.cidade.codigo);
                }
            });
        else {
            setNome('');
        }
    }, [props.codigo, props.editando]);
    
    function preencheEstados() {
        axios.get(`${url}/estados`)
            .then(response => {
                setListaEstados(response.data);
            });
    }

    return(
        <Form
            cardSize="col-sm-12"
            cardTitle={props.codigo && props.editando ? "Editar usuário" : "Novo usuário" }
            save={save}
            messagesList={messagesList}
            successMessage={successMessage}
            limpar={limpar}>
                <div className="row">
                    <Input 
                        inputName="Login"
                        inputId="login"
                        inputValue={login}
                        columnSettings="col-sm-2"
                        handleChange={e => handleChangeDefault(e, setLogin)}
                        validate={true}
                    />
                    <Input 
                        inputName="Senha"
                        inputId="senha"
                        inputValue={senha}
                        columnSettings="col-sm-2"
                        handleChange={e => handleChangeDefault(e, setSenha)}
                        validate={true}
                    />
                    <Input 
                        inputName="Nome"
                        inputId="nome"
                        inputValue={nome}
                        columnSettings="col-sm-4"
                        handleChange={e => handleChangeDefault(e, setNome)}
                        validate={true}
                    />
                    <Input 
                        inputName="Logradouro"
                        inputId="logradouro"
                        inputValue={logradouro}
                        columnSettings="col-sm-4"
                        handleChange={e => handleChangeDefault(e, setLogradouro)}
                        validate={true}
                    />
                </div>
                <div className="row">
                    <Input 
                        inputName="Bairro"
                        inputId="bairro"
                        inputValue={bairro}
                        columnSettings="col-sm-4"
                        handleChange={e => handleChangeDefault(e, setBairro)}
                        validate={true}
                    />
                    <Input 
                        inputName="Número"
                        inputId="numero"
                        inputValue={numero}
                        columnSettings="col-sm-2"
                        handleChange={e => handleChangeDefault(e, setNumero)}
                        validate={true}
                    />
                    <InputCep
                        inputName="CEP"
                        inputId="cep"
                        inputValue={cep}
                        columnSettings="col-sm-2"
                        handleChange={e => handleChangeDefault(e, setCep)}
                        validate={true}
                    />
                    <Input 
                        inputName="Email"
                        inputId="email"
                        inputValue={email}
                        columnSettings="col-sm-4"
                        handleChange={e => handleChangeDefault(e, setEmail)}
                        validate={true}
                    />
                </div>
                <div className="row">
                    <Select
                        columnSettings="col-sm-2"
                        inputId="estado"
                        labelName="Estado"
                        inputValue={codigoEstado}
                        handleChange={e => handleChangeEstado(e)}
                        lista={listaEstados}
                    />
                    <Select
                        columnSettings="col-sm-2"
                        inputId="cidade"
                        labelName="Cidade"
                        inputValue={codigoCidade}
                        handleChange={e => handleChangeDefault(e, setCodigoCidade)}
                        lista={listaCidades}
                    />
                </div>
        </Form>
    )
}

export default CreateEdit;