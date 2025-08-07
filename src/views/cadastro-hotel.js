/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
//import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/hoteis`;
function CadastroHotel() {
    const token = localStorage.getItem('token');
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setCidade('');
            setCep('');
            setBairro('');
            setLogradouro('');
            setNumero('');
            setTelefone('');
            setCelular('');
            setEmail('');
        } 
        else {
            setId(dados.id);
            setNome(dados.nome);
            setCidade(dados.cidade);
            setCep(dados.cep);
            setBairro(dados.bairro);
            setLogradouro(dados.logradouro);
            setNumero(dados.numero);
            setTelefone(dados.telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"));
            setCelular(dados.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"));
            setEmail(dados.email);
        }
    }

    async function salvar() {
        let data = {
            id,
            nome,
            estado,
            cidade,
            cep,
            bairro,
            logradouro,
            numero,
            telefone,
            celular,
            email,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
            .post(baseURL, data, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            })
            .then(function (response) {
                mensagemSucesso(`Hotel ${nome} cadastrado com sucesso!`)
                navigate(`/listagem-hoteis`);
            }) 
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
        }
        else {
            await axios
            .put(`${baseURL}/${idParam}`, data, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            })
            .then(function (response) {
                mensagemSucesso(`Hotel ${nome} alterado com sucesso!`);
                navigate(`/listagem-hoteis`);
            })
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
        }
    }

    async function buscar() {
        if (idParam != null){
            await axios.get(`${baseURL}/${idParam}`, 
                {headers: {'Authorization': `Bearer ${token}`}}).then((response) => {
                setDados(response.data);
            });
            setId(dados.id);
            setNome(dados.nome);
            setEstado(dados.estado);
            setCidade(dados.cidade);
            setCep(dados.cep);
            setBairro(dados.bairro);
            setLogradouro(dados.logradouro);
            setNumero(dados.numero);
            setTelefone(dados.telefone?.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"));
            setCelular(dados.celular?.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"));
            setEmail(dados.email);
        }
    }

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de hotel'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label={<strong> Nome: *</strong>} htmlFor='inputNome'>
                                <input
                                    type='text'
                                    id='inputNome'
                                    value={nome}
                                    className='form-control'
                                    name='nome'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Estado: *</strong>} htmlFor='inputEstado'>
                                <input
                                    type='text'
                                    id='inputEstado'
                                    value={estado}
                                    className='form-control'
                                    name='estado'
                                    onChange={(e) => setEstado(e.target.value)}
                                />
                            </FormGroup>         
                            <FormGroup label={<strong> Cidade: *</strong>} htmlFor='inputCidade'>
                                <input
                                    type='text'
                                    id='inputCidade'
                                    value={cidade}
                                    className='form-control'
                                    name='cidade'
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong> Cep: *</strong>} htmlFor='inputCep'>
                                <input
                                    type='text'
                                    id='inputCep'
                                    value={cep}
                                    className='form-control'
                                    name='cep'
                                    onChange={(e) => setCep(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Bairro: *</strong>} htmlFor='inputBairro'>
                                <input
                                    type='text'
                                    id='inputBairro'
                                    value={bairro}
                                    className='form-control'
                                    name='bairro'
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Logradouro: *</strong>} htmlFor='inputLogradouro'>
                                <input
                                    type='text'
                                    id='inputLogradouro'
                                    value={logradouro}
                                    className='form-control'
                                    name='logradouro'
                                    onChange={(e) => setLogradouro(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Número: *</strong>} htmlFor='inputNumero'>
                                <input
                                    type='text'
                                    id='inputNumero'
                                    value={numero}
                                    className='form-control'
                                    name='numero'
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Telefone: *</strong>} htmlFor='inputTelefone'>
                                <input
                                    type='tel'
                                    id='inputTelefone'
                                    value={telefone}
                                    className='form-control'
                                    placeholder="(00) 00000-0000"
                                    name='telefone'
                                    onChange={(e) => {
                                        const valor = (e.target.value.replace(/\D/g, ""));
                                        if (valor.length <= 2) {
                                            return setTelefone(valor);
                                        }
                                        if (valor.length <= 7) {
                                            return setTelefone(valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2"));
                                        } else {
                                            return setTelefone(valor.substring(0, 11).replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3"));
                                        }
                                    }
                                    }
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Celular: *</strong>} htmlFor='inputCelular'>
                                <input
                                    type='text'
                                    id='inputCelular'
                                    value={celular}
                                    className='form-control'
                                    name='celular'
                                    onChange={(e) => {
                                        const valor = (e.target.value.replace(/\D/g, ""));
                                        if (valor.length <= 2) {
                                            return setCelular(valor);
                                        }
                                        if (valor.length <= 7) {
                                            return setCelular(valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2"));
                                        } else {
                                            return setCelular(valor.substring(0, 11).replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3"));
                                        }
                                    }
                                    }
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Email: *</strong>} htmlFor='inputEmail'>
                                <input
                                    type='text'
                                    id='inputEmail'
                                    value={email}
                                    className='form-control'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <Stack spacing={1} padding={1} direction='row'>
                                <button
                                    onClick={salvar}
                                    type='button'
                                    className='btn btn-success'
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={inicializar}
                                    type='button'
                                    className='btn btn-danger'
                                >
                                    Cancelar
                                </button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );

}

export default CadastroHotel;*/
