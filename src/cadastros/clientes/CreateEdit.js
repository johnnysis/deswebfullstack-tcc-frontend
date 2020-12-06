import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../../util/constants';
import { Input, InputCep, Select, InputCpf, InputTelefone, InputButton } from '../../components/input';
import { Form } from '../../components/wrapper';

const CreateEdit = (props) => {
    const [nome, setNome] = useState('');
    const [codigoCidade, setCodigoCidade] = useState('');
    const [codigoEstado, setCodigoEstado] = useState('');
    const [codigoTelefone, setCodigoTelefone] = useState('');
    const [telefone, setTelefone] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    
    const [listaEstados, setListaEstados] = useState([]);
    const [listaCidades, setListaCidades] = useState([]);
    const [listaTelefones, setListaTelefones] = useState([]);

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
        if(listaTelefones.length === 0)
            messages.push('Informe ao menos um telefone');
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
        if(!cpf || cpf.replaceAll(".", "").replaceAll("-", "").replaceAll("_").length !== 11)
            messages.push('Cpf');
    }

    const save = () => {
        const messages = [];

        validarInputs(messages);

        if(messages.length > 0)
            setMessagesList(messages);
        else {
            setMessagesList([]);
            let codigo = props.codigo && props.editando ? props.codigo : 0;
            axios.post(`${url}/clientes/create`,
                    {codigo, nome, codigoCidade, codigoEstado, logradouro,
                    bairro, numero, cep, email, cpf}
                )
            .then(
                async res => {
                    let numeros = listaTelefones.map(el => {return {numero: el.descricao}});
                    console.log(numeros);
                    let clienteCodigo = codigo ? codigo : res.data.codigo;
                    console.log(res);
                    await axios.post(`${url}/clientes/telefones?codigoCliente=${clienteCodigo}`,
                        {listaTelefones : numeros}).then(res => {
                            props.metodos();
                            setSuccessMessage('Salvo com sucesso!');
                            cleanMessageTimeout();
                        }, err => console.log(err));
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
        setCpf('');
        setListaTelefones([]);

        setCodigoTelefone(-1);
        setCodigoEstado(-1);
        setCodigoCidade(-1);
    }

    const adicionarTelefone = () => {
        const messages = [];

        const novoCodigo = listaTelefones.length === 0 ? 0 : listaTelefones[listaTelefones.length - 1].codigo + 1;

        const tel = telefone.replaceAll('_', '');
        if(tel.length !== 14 && tel.length !== 15)
            messages.push('Telefone');

        if(messages.length > 0)
            setMessagesList(messages);
        else {
            setListaTelefones([...listaTelefones, { codigo: novoCodigo, descricao: tel }]);
            setTelefone('');
        }
    }

    const removerTelefone = () => {
        let novaLista = listaTelefones.filter(v => v.codigo !== parseInt(codigoTelefone));
        setListaTelefones(novaLista);
    }

    const atualizaListaTelefones = async (clienteCodigo) => {
        await axios.get(`${url}/clientes/telefones?pes_codigo=${clienteCodigo}`)
            .then(res => {
                const lista = res.data;
                setListaTelefones(lista.map((v, pos) => { return {codigo: pos, descricao: v.numero}}));
            });
    }

    useEffect(() => {
        preencheEstados()
        if(props.codigo && props.editando)
            axios.get(`${url}/clientes/${props.codigo}`)
            .then(async response => {
                if(response.status !== 500) {
                    console.log('teste');
                    setNome(response.data.nome);
                    setLogradouro(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setNumero(response.data.numero);
                    setCep(response.data.cep);
                    setEmail(response.data.email);
                    setCpf(response.data.cpf);

                    setCodigoEstado(response.data.cidade.estado.codigo);
                    await atualizaCidades(response.data.cidade.estado.codigo);
                    setCodigoCidade(response.data.cidade.codigo);
                    await atualizaListaTelefones(props.codigo);
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
            cardTitle={props.codigo && props.editando ? "Editar cliente" : "Novo cliente" }
            save={save}
            messagesList={messagesList}
            successMessage={successMessage}
            limpar={limpar}>
                <div className="row">
                    <Input 
                        inputName="Nome"
                        inputId="nome"
                        inputValue={nome}
                        columnSettings="col-sm-4"
                        handleChange={e => handleChangeDefault(e, setNome)}
                        validate={true}
                    />
                    <InputCpf 
                        inputName="CPF"
                        inputId="cpf"
                        inputValue={cpf}
                        columnSettings="col-sm-2"
                        handleChange={e => handleChangeDefault(e, setCpf)}
                        validate={true}
                    />
                    <Input 
                        inputName="Logradouro"
                        inputId="logradouro"
                        inputValue={logradouro}
                        columnSettings="col-sm-3"
                        handleChange={e => handleChangeDefault(e, setLogradouro)}
                        validate={true}
                    />
                    <Input 
                        inputName="Bairro"
                        inputId="bairro"
                        inputValue={bairro}
                        columnSettings="col-sm-3"
                        handleChange={e => handleChangeDefault(e, setBairro)}
                        validate={true}
                    />
                </div>
                <div className="row">                    
                    <Input 
                        inputName="Número"
                        inputId="numero"
                        inputValue={numero}
                        columnSettings="col-sm-1"
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
                        columnSettings="col-sm-3"
                        handleChange={e => handleChangeDefault(e, setEmail)}
                        validate={true}
                    />
                    <Select
                        columnSettings="col-sm-3"
                        inputId="estado"
                        labelName="Estado"
                        inputValue={codigoEstado}
                        handleChange={e => handleChangeEstado(e)}
                        lista={listaEstados}
                    />
                    <Select
                        columnSettings="col-sm-3"
                        inputId="cidade"
                        labelName="Cidade"
                        inputValue={codigoCidade}
                        handleChange={e => handleChangeDefault(e, setCodigoCidade)}
                        lista={listaCidades}
                    />
                    
                </div>
                <div className="row">
                        <InputTelefone
                            inputName="Telefone"
                            inputId="telefone"
                            inputValue={telefone}
                            columnSettings="col-sm-3"
                            handleChange={e => handleChangeDefault(e, setTelefone)}
                            validate={true}
                        />
                        <div className="col-auto button-bottom-align">
                            <InputButton buttonName="Adicionar" estilo="btn-outline-primary" handleClick={adicionarTelefone}/>
                        </div>
                        <Select
                            columnSettings="col-sm-3"
                            inputId="cidade"
                            labelName="Telefones"
                            inputValue={codigoTelefone}
                            handleChange={e => handleChangeDefault(e, setCodigoTelefone)}
                            lista={listaTelefones}
                        />
                        <div className="col-auto button-bottom-align">
                            <InputButton buttonName="Remover" estilo="btn-outline-danger" handleClick={removerTelefone}/>
                        </div>
                </div>

                {/* Exibir somente se editando */}
        </Form>
    )
}

export default CreateEdit;