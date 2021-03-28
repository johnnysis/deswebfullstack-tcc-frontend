import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import { Input, InputCep, Select, InputCnpj } from '../../components/input';
import { Form } from '../../components/wrapper';

const CreateEdit = (props) => {
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [codigoCidade, setCodigoCidade] = useState('');
    const [codigoEstado, setCodigoEstado] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    
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

        if(!nomeFantasia)
            messages.push('Nome Fantasia');
        if(!razaoSocial)
            messages.push('Razão Social');
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
        if(!cnpj || cnpj.replaceAll(".", "").replaceAll("-", "").replaceAll("/", "").replaceAll("_").length !== 14)
            messages.push('Cnpj');
    }

    const save = () => {
        const messages = [];

        validarInputs(messages);

        if(messages.length > 0)
            setMessagesList(messages);
        else {
            setMessagesList([]);
            let codigo = props.codigo && props.editando ? props.codigo : 0;
            axios.post(`${url}/fornecedores/create`,
                    {codigo, nomeFantasia, razaoSocial, codigoCidade, codigoEstado, logradouro,
                    bairro, numero, cep, email, cnpj}
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
        setNomeFantasia('');
        setLogradouro('');
        setBairro('');
        setNumero('');
        setCep('');
        setEmail('');
        setCnpj('');
        setRazaoSocial('');

        setCodigoEstado(-1);
        setCodigoCidade(-1);
    }

    useEffect(() => {
        preencheEstados()
        if(props.codigo && props.editando)
            axios.get(`${url}/fornecedores/${props.codigo}`)
            .then(async response => {
                if(response.status !== 500) {
                    setNomeFantasia(response.data.nomeFantasia);
                    setRazaoSocial(response.data.razaoSocial);
                    setLogradouro(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setNumero(response.data.numero);
                    setCep(response.data.cep);
                    setEmail(response.data.email);
                    setCnpj(response.data.cnpj);

                    setCodigoEstado(response.data.cidade.estado.codigo);
                    await atualizaCidades(response.data.cidade.estado.codigo);
                    setCodigoCidade(response.data.cidade.codigo);
                }
            });
        else {
            setNomeFantasia('');
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
            cardTitle={props.codigo && props.editando ? "Editar fornecedor" : "Novo fornecedor" }
            save={save}
            messagesList={messagesList}
            successMessage={successMessage}
            limpar={limpar}>
                <div className="row">
                    <Input 
                        inputName="Nome Fantasia"
                        inputId="nome"
                        inputValue={nomeFantasia}
                        columnSettings="col-sm-6"
                        handleChange={e => handleChangeDefault(e, setNomeFantasia)}
                        validate={true}
                    />
                    <Input 
                        inputName="Razão Social"
                        inputId="razaoSocial"
                        inputValue={razaoSocial}
                        columnSettings="col-sm-6"
                        handleChange={e => handleChangeDefault(e, setRazaoSocial)}
                        validate={true}
                    />
                    <InputCnpj 
                        inputName="CNPJ"
                        inputId="cnpj"
                        inputValue={cnpj}
                        columnSettings="col-sm-6"
                        handleChange={e => handleChangeDefault(e, setCnpj)}
                        validate={true}
                    />
                    <Input 
                        inputName="Logradouro"
                        inputId="logradouro"
                        inputValue={logradouro}
                        columnSettings="col-sm-6"
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