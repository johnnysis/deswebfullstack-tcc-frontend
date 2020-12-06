import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import {colonToPoint} from '../../util/conversor';
import { Input, InputCurrency, InputNumber, Select } from '../../components/input';
import { Form } from '../../components/wrapper';

const CreateEdit = (props) => {
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [codigoCategoria, setCodigoCategoria] = useState(-1);
    const [preco, setPreco] = useState('');
    
    const [listaCategorias, setListaCategorias] = useState([]);

    const [messagesList, setMessagesList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    function handleChangeDefault(e, callback) {
        callback(e.target.value);
    }

    function validarInputs(messages) {
        if(codigoCategoria === -1)
            messages.push("Categoria");
        if(!descricao)
            messages.push("Descrição");
        if(!quantidade)
            messages.push("Quantidade");
        if(!preco)
            messages.push("Preço");
    }

    const save = () => {
        const messages = [];

        validarInputs( messages);

        if(messages.length > 0)
            setMessagesList(messages);
        else {
            const precoConvertido = colonToPoint(preco);
            setMessagesList([]);
            let codigo = props.codigo && props.editando ? props.codigo : 0;
            axios.post(`${url}/produtos/create`, {codigo, descricao, quantidade, preco: precoConvertido, codigoCategoria})
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
        setCodigoCategoria(-1);
        setPreco('');
        setQuantidade('');
    }

    useEffect(() => {
        preencheCategorias()
        if(props.codigo && props.editando)
            axios.get(`${url}/produtos/${props.codigo}`)
            .then(response => {
                setDescricao(response.data.descricao);
                setQuantidade(response.data.quantidade);
                setCodigoCategoria(response.data.categoria.codigo);
                setPreco(response.data.preco);
            });
        else
            setDescricao('');
    }, [props.codigo, props.editando]);
    
    function preencheCategorias() {
        axios.get(`${url}/categorias`)
            .then(response => {
                setListaCategorias(response.data);
            });
    }

    return(
        <Form
            cardSize="col-sm-4"
            cardTitle={props.codigo && props.editando ? "Editar produto" : "Novo produto" }
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
            <InputNumber
                inputName="Quantidade"
                inputId="quantidade"
                inputValue={quantidade}
                columnSettings="col-sm-12"
                handleChange={e => handleChangeDefault(e, setQuantidade)}
                validate={true}
            />
            <Select
                columnSettings="col s12 m6"
                inputId="categoria"
                labelName="Categoria"
                inputValue={codigoCategoria}
                handleChange={e => handleChangeDefault(e, setCodigoCategoria)}
                lista={listaCategorias}
            />
            <InputCurrency
                inputName="Preço"
                inputId="preco"
                inputValue={preco}
                columnSettings="col-sm-12"
                handleChange={e => handleChangeDefault(e, setPreco)}
                validate={true}
            />
        </Form>
    )
}

export default CreateEdit;