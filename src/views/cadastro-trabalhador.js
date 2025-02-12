import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL2, BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL2}/trabalhadores`;
const baseURLHotel = `${BASE_URL2}/hoteis`;
const baseURLCargo = `${BASE_URL}/cargos`;

function CadastroTrabalhador() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [idHotel, setIdHotel] = useState('');
    const [idCargos, setIdCargos] = useState([]);

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setCargo('');
            setIdHotel('');
            setIdCargos([]);
        }
        else {
            setId(dados.id);
            setNome(dados.nome);
            setCargo(dados.cargo);
            setIdHotel(dados.idHotel);
            setIdCargos(dados.cargos);
        }
    }

    async function salvar() {
        let data = {
            id,
            nome,
            cargo,
            idHotel,
            idCargos,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
              .post(baseURL, data, {
                headers: { 'Content-Type': 'application/json' },
              })
              .then(function (response) {
                mensagemSucesso(`Trabalhador ${nome} cadastrado com sucesso!`)
                navigate(`/listagem-trabalhadores`);
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
                mensagemSucesso(`Trabalhador ${nome} alterado com sucesso!`);
                navigate(`/listagem-trabalhadores`);
              })
              .catch(function (error) {
                mensagemErro(error.response.data);
            });
        }

    }

    async function buscar() {
        if (idParam != null) {
            await axios.get(`${baseURL}/${idParam}`).then((response) => {
                setDados(response.data);
            });
            setId(dados.id);
            setNome(dados.nome);
            setCargo(dados.cargo);
            setIdHotel(dados.idHotel);
            setIdCargos(dados.cargos);
        }
    }

    const [dadosHotel, setDadosHotel] = useState(null);
    const [dadosCargos, setDadosCargos] = useState(null);

    useEffect(() => {
        axios.get(baseURLHotel).then((response) => {
            setDadosHotel(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(baseURLCargo).then((response) => {
            setDadosCargos(response.data);
        });
    }, []);

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;
    if (!dadosHotel) return null;
    if (!dadosCargos) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Trabalhador'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Nome: *' htmlFor='inputQuantidadeTotal'>
                                <input
                                    type='text'
                                    id='inputNome'
                                    value={nome}
                                    className='form-control'
                                    name='nome'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Cargo: *' htmlFor='selectCargo'>
                                <select
                                    id='selectCargo'
                                    value={cargo}
                                    className='form-select'
                                    name='cargo'
                                    onChange={(e) => setCargo(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosCargos.map((dado) => (
                                        <option key={dado.id} value={dado.id}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label='Hotel: *' htmlFor='selectHotel'>
                                <select
                                    id='selectHotel'
                                    value={idHotel}
                                    className='form-select'
                                    name='idHotel'
                                    onChange={(e) => setIdHotel(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosHotel.map((dado) => (
                                        <option key={dado.id} value={dado.id}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
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

export default CadastroTrabalhador;
