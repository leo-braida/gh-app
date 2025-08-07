/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
//import { BASE_URL } from '../config/axios';
/*
const baseURL = `${BASE_URL}/hospedagens`;
const baseURLHospede = `${BASE_URL}/hospedes`;
const baseURLQuarto = `${BASE_URL}/quartos`;
const baseURLHotel = `${BASE_URL}/hoteis`;
const baseURLCama = `${BASE_URL}/camas`;

function CadastroHospedagem() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [idHospede, setIdHospede] = useState('');
    const [adultos, setAdultos] = useState(0);
    const [criancas, setCriancas] = useState(0);
    const [idHotel, setIdHotel] = useState('');
    const [selectedQuartos, setSelectedQuartos] = useState([]);

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setCheckIn('');
            setCheckOut('');
            setIdHospede('');
            setAdultos(0);
            setCriancas(0);
            setIdHotel('');
            setSelectedQuartos([]);
        } 
        else {
            setId(dados.id);
            setCheckIn(dados.checkIn);
            setCheckOut(dados.checkOut);
            setIdHospede(dados.hospede);
            setAdultos(dados.adultos);
            setCriancas(dados.criancas);
            setIdHotel(dados.hotel);
            setSelectedQuartos(processarDadosDaApi(dados.quartoNaHospedagemDTO));
        } 
    }

    async function salvar() {
        const quartosSelecionados = Object.keys(selectedQuartos)
        .filter(id => selectedQuartos[id])
        .map(id => parseInt(id, 10));
        let data = {
            id,
            checkIn,
            checkOut,
            idHospede: parseInt(idHospede, 10),
            adultos: parseInt(adultos, 10),
            criancas: parseInt(criancas, 10),
            idHotel: parseInt(idHotel, 10),
            quartoNaHospedagemDTO: quartosSelecionados,

        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
            .post(baseURL, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Hospedagem ${id} cadastrada com sucesso!`)
                navigate(`/listagem-hospedagens`);
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
                mensagemSucesso(`Hospedagem ${id} cadastrada com sucesso!`);
                navigate(`/listagem-hospedagens`);
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
            setCheckIn(dados.checkIn);
            setCheckOut(dados.checkOut);
            setIdHospede(dados.idHospede);
            setAdultos(dados.adultos);
            setCriancas(dados.criancas);
            setIdHotel(dados.idHotel);
            setSelectedQuartos(processarDadosDaApi(dados.quartoNaHospedagemDTO));
        }
    }

    const processarDadosDaApi = (dados) => {
        if (!dados || dados.length === 0) {
            return {};
        }

        return dados.reduce((acc, quartoId) => {
            acc[quartoId] = true;
            return acc;
        }, {});
    };

    const handleQuartoSelectionChange = (e) => {
        const { value, checked } = e.target;

        setSelectedQuartos((prev) => {
            const updatedSelection = { ...prev };

            if (checked) {
                updatedSelection[value] = true;
            } else {
                delete updatedSelection[value];
            }

            return updatedSelection;
        });
    }

    const [dadosHospedes, setDadosHospedes] = useState(null);
    const [dadosQuartos, setDadosQuartos] = useState(null);
    const [dadosServicos, setDadosServicos] = useState(null);
    const [dadosItens, setDadosItens] = useState(null);
    const [dadosHoteis, setDadosHoteis] = useState(null);
    const [dadosCamas, setDadosCamas] = useState(null);


    const [selectedCamas, setSelectedCamas] = useState({});
    const [selectedItens, setSelectedItens] = useState({});
    const [selectedServicos, setSelectedServicos] = useState({});

    const processarSelecionados = (dadosString) => {
        if (!dadosString) return {};

        return dadosString.split("\n").reduce((acc, item) => {
            const match = item.match(/(\d+)x (.+)/);
            if (match) {
                const quantidade = parseInt(match[1], 10);
                const nome = match[2].trim();
                acc[nome] = { quantidade };
            }
            return acc;
        }, {});
    };

    useEffect(() => {
        if (dados) {
            setSelectedCamas(processarSelecionados(dados.camasExtras));
            setSelectedItens(processarSelecionados(dados.itensExtras));
            setSelectedServicos(processarSelecionados(dados.servicos));
        }
    }, [dados]);

    const handleSelectionChange = (e, setSelected) => {
        const { value, checked } = e.target;

        setSelected((prev) => {
            const updatedSelection = { ...prev };

            if (checked) {
                updatedSelection[value] = { quantidade: 1 };
            } else {
                delete updatedSelection[value];
            }

            return updatedSelection;
        });
    };

    const handleQuantidadeChange = (id, quantidade, setSelected) =>{
        setSelected((prev) => ({...prev,
            [id]: {...prev[id], quantidade },
        }));
    }



    useEffect(() => {
        axios.get(baseURLHospede).then((response) => {
            setDadosHospedes(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get(baseURLCama).then((response) => {
            setDadosCamas(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(baseURLQuarto).then((response) => {
            setDadosQuartos(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get(baseURLHotel).then((response) => {
            setDadosHoteis(response.data);
        })
    }, []);

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;
    if (!dadosHospedes) return null;
    if (!dadosQuartos) return null;
    if (!dadosHoteis) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Hospedagem'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label={<strong>Check-in: *</strong>} htmlFor='inputCheckIn'>
                                <input
                                    type='datetime-local'
                                    id='inputCkeckIn'
                                    value={checkIn}
                                    className='form-control'
                                    name='checkIn'
                                    onChange={(e) => setCheckIn(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong>Check-out: *</strong>} htmlFor='inputCheckOut'>
                                <input
                                    type='datetime-local'
                                    id='inputCheckOut'
                                    value={checkOut}
                                    className='form-control'
                                    name='checkOut'
                                    onChange={(e) => setCheckOut(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong>Hóspede Responsável: *</strong>} htmlFor='selectHospede'>
                                <select
                                    id='selectHospede'
                                    value={idHospede}
                                    className='form-select'
                                    name='hospede'
                                    onChange={(e) => setIdHospede(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosHospedes.map((dado) => (
                                        <option key={dado.id} value={dado.id}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>   
                            <FormGroup label={<strong>Adultos: *</strong>} htmlFor='inputAdultos'>
                                <input
                                    type='number'
                                    id='inputAdultos'
                                    value={adultos}
                                    className='form-control'
                                    name='adultos'
                                    onChange={(e) => setAdultos(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong>Crianças: *</strong>} htmlFor='inputCriancas'>
                                <input
                                    type='number'
                                    id='inputCriancas'
                                    value={criancas}
                                    className='form-control'
                                    name='criancas'
                                    onChange={(e) => setCriancas(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong>Quartos: *</strong>} htmlFor='selectQuarto'>
                                <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                                    {dadosQuartos.map((quarto) => (
                                        <div key={quarto.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={quarto.id}
                                                    checked={!!selectedQuartos[quarto.id]}
                                                    onChange={handleQuartoSelectionChange}
                                                />
                                                {` Quarto N.º ${quarto.numero} - ${quarto.nomeTipoDeQuarto}`}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </FormGroup>
                            <FormGroup label={<strong>Hotel: *</strong>} htmlFor='selectHotel'>
                                <select
                                    id='selectHotel'
                                    value={idHotel}
                                    className='form-select'
                                    name='hotel'
                                    onChange={(e) => setIdHotel(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosHoteis.map((dado) => (
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

export default CadastroHospedagem;
*/
