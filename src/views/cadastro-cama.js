import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/camas`;

function CadastroTipoCama() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [idTipoDeCama, setIdTipoDeCama] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [idHotel, setIdHotel] = useState(0);

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setIdTipoDeCama(0);
            setQuantidade(0);
            setIdHotel(0);
        } 
        else {
            setId(dados.id);
            setIdTipoDeCama(dados.idTipoDeCama);
            setQuantidade(dados.quantidade);
            setIdHotel(dados.idHotel);
        }
    }

    async function salvar() {
        let data = {
            id,
            idTipoDeCama,
            quantidade,
            idHotel
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
            .post(baseURL, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Cama cadastrada com sucesso!`)
                navigate(`/listagem-cama`);
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
                mensagemSucesso(`Cama alterada com sucesso!`);
                navigate(`/listagem-cama`);
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
            setIdTipoDeCama(dados.idTipoDeCama);
            setQuantidade(dados.quantidade);
            setIdHotel(dados.idHotel);
        }
    }

    const [dadosTipoDeCama, setDadosTipoDeCama] = useState(null);
    const [dadosHotel, setDadosHotel] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/tiposDeCama`).then((response) => {
            setDadosTipoDeCama(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URL}/hoteis`).then((response) => {
            setDadosHotel(response.data);
        });
    }, []);

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;
    if (!dadosHotel) return null;
    if (!dadosTipoDeCama) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Cama'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label={<strong> Tipo de cama: *</strong>} htmlFor='selectTipoDeCama'>
                                <select
                                    id='selectTipoDeCama'
                                    value={idTipoDeCama}
                                    className='form-select'
                                    name='idTipoDeCama'
                                    onChange={(e) => setIdTipoDeCama(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosTipoDeCama.map((dado) => (
                                        <option key={dado.id} value={dado.id}>
                                            {dado.tipo}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label={<strong> Quantidade: *</strong>} htmlFor='inputQuantidade'>
                                <input
                                    type='number'
                                    id='inputQuantidade'
                                    value={quantidade}
                                    className='form-control'
                                    name='quantidade'
                                    onChange={(e) => setQuantidade(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong> Hotel: *</strong>} htmlFor='selectHotel'>
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

export default CadastroTipoCama;
