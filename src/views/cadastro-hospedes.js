/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';


import axios from 'axios';
//import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/hospedes`;

function CadastroHospede() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    let [genero, setGenero] = useState('');
    const [outroGenero, setOutroGenero] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numeroMoradia, setNumeroMoradia] = useState('');
    const [complemento, setComplemento] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());


    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setGenero('');
            setOutroGenero('');
            setDataNascimento(null);
            setTelefone('');
            setEmail('');
            setCpf('');
            setEstado('');
            setCidade('');
            setCep('');
            setBairro('');
            setLogradouro('');
            setNumeroMoradia('');
            setComplemento('');
        } 
        else {
            setId(dados.id);
            setNome(dados.nome);
            if (dados.genero != 'Masculino' && dados.genero != 'Feminino') {
                setGenero('Outro');
                setOutroGenero(dados.genero);
            } else {
                setGenero(dados.genero);
            }
            setDataNascimento(dados.dataNascimento);
            setTelefone(dados.telefone);
            setEmail(dados.email);
            setCpf(dados.cpf);
            setEstado(dados.estado);
            setCidade(dados.cidade);
            setCep(dados.cep);
            setBairro(dados.bairro);
            setLogradouro(dados.logradouro);
            setNumeroMoradia(dados.numeroMoradia);
            setComplemento(dados.complemento);
        } 
    }

    async function salvar() {
        genero = genero == 'Outro' ? outroGenero : genero;
        let data = {
            id,
            nome,
            genero,
            dataNascimento,
            telefone,
            email,
            cpf,
            estado,
            cidade,
            cep,
            bairro,
            logradouro,
            numeroMoradia,
            complemento,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
            .post(baseURL, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Hóspede ${nome} cadastrado(a) com sucesso!`)
                navigate(`/listagem-hospedes`);
            }) 
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
        }
        else {
            await axios
            .put(`${baseURL}/${idParam}`, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Hóspede ${nome} alterado(a) com sucesso!`);
                navigate(`/listagem-hospedes`);
            })
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
        }
    }

    async function buscar() {
        if (idParam != null){
            await axios.get(`${baseURL}/${idParam}`).then((response) => {
                setDados(response.data);
            });
            setId(dados.id);
            setNome(dados.nome);
            if (dados.genero != 'Masculino' && dados.genero != 'Feminino') {
                setGenero('Outro');
                setOutroGenero(dados.genero);
            } else {
                setGenero(dados.genero);
            }
            setDataNascimento(dados.dataNascimento);
            setTelefone(dados.telefone?.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"));
            setEmail(dados.email);
            setCpf(dados.cpf);
            setEstado(dados.estado);
            setCidade(dados.cidade);
            setCep(dados.cep);
            setBairro(dados.bairro);
            setLogradouro(dados.logradouro);
            setNumeroMoradia(dados.numeroMoradia);
            setComplemento(dados.complemento);
        }
    }

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Tipo de Cama'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label={<strong>Nome: *</strong>} htmlFor='inputNome'>
                                <input
                                    type='text'
                                    id='inputNome'
                                    value={nome}
                                    className='form-control'
                                    name='nome'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong>Gênero: *</strong>} htmlFor='selectGenero'>  
                                
                                <select
                                    id='selectGenero'
                                    value={genero}
                                    className='form-select'
                                    name='genero'
                                    onChange={(e) => setGenero(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    <option key='Masculino' value='Masculino'>Masculino</option>
                                    <option key='Feminino' value='Feminino'>Feminino</option>
                                    <option key='Outro' value='Outro'>Outro</option>
                                </select>
                            </FormGroup>
                            {(genero === 'Outro') && (
                                <input
                                    type='text'
                                    id='selectOutroGenero'
                                    value={outroGenero}
                                    className='form-control'
                                    name='outroGenero'
                                    placeholder='Digite o gênero'
                                    onChange={(e) => setOutroGenero(e.target.value)}
                                />)}
                            <FormGroup label={<strong>Telefone: *</strong>} htmlFor='inputTelefone'>
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

                            <FormGroup label={<strong>E-mail: *</strong>} htmlFor='inputEmail'>
                                <input
                                    type='email'
                                    id='inputEmail'
                                    value={email}
                                    className='form-control'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>CPF: *</strong>} htmlFor='inputCpf'>
                                <input
                                    type='text'
                                    id='inputCpf'
                                    value={cpf}
                                    className='form-control'
                                    name='cpf'
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>Estado: *</strong>} htmlFor='inputEstado'>
                                <input
                                    type='text'
                                    id='inputEstado'
                                    value={estado}
                                    className='form-control'
                                    name='estado'
                                    onChange={(e) => setEstado(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>Cidade: *</strong>} htmlFor='inputCidade'>
                                <input
                                    type='text'
                                    id='inputCidade'
                                    value={cidade}
                                    className='form-control'
                                    name='cidade'
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>CEP: *</strong>} htmlFor='inputCep'>
                                <input
                                    type='text'
                                    id='inputCep'
                                    value={cep}
                                    className='form-control'
                                    name='cep'
                                    onChange={(e) => setCep(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>Bairro: *</strong>} htmlFor='inputBairro'>
                                <input
                                    type='text'
                                    id='inputBairro'
                                    value={bairro}
                                    className='form-control'
                                    name='bairro'
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>Logradouro: *</strong>} htmlFor='inputLogradouro'>
                                <input
                                    type='text'
                                    id='inputLogradouro'
                                    value={logradouro}
                                    className='form-control'
                                    name='logradouro'
                                    onChange={(e) => setLogradouro(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>Número: *</strong>} htmlFor='inputNumero'>
                                <input
                                    type='text'
                                    id='inputNumero'
                                    value={numeroMoradia}
                                    className='form-control'
                                    name='numeroMoradia'
                                    onChange={(e) => setNumeroMoradia(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>Complemento:</strong>} htmlFor='inputComplemento'>
                                <input
                                    type='text'
                                    id='inputComplemento'
                                    value={complemento}
                                    className='form-control'
                                    name='complemento'
                                    onChange={(e) => setComplemento(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label={<strong>Data de Nascimento: *</strong>} htmlFor='inputDataNasc'>
                                <input
                                    type='date'
                                    id='inputDataNasc'
                                    value={dataNascimento}
                                    className='form-control'
                                    name='dataNasc'
                                    onChange={(e) => setDataNascimento(e.target.value)}
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

export default CadastroHospede;
*/
