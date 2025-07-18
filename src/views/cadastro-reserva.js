import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/reservas`;
const baseURLHospede = `${BASE_URL}/hospedes`;
const baseURLTipoQuarto = `${BASE_URL}/tiposDeQuarto`;
const baseURLHotel = `${BASE_URL}/hoteis`;

function CadastroReserva(){
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [dataChegada, setDataChegada] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [idHospede, setIdHospede] = useState(0);
    const [tiposDeQuartoNaReserva, setTiposDeQuartoNaReserva] = useState([]);
    const [idHotel, setIdHotel] = useState(0);
    const [selectedQuartos, setSelectedQuartos] = useState({});

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setDataChegada('');
            setDataSaida('');
            setIdHospede(0);
            setTiposDeQuartoNaReserva([]);
            setIdHotel(0);
            setSelectedQuartos({});
        } 
        else {
            setId(dados.id);
            setDataChegada(dados.dataChegada);
            setDataSaida(dados.dataSaida);
            setIdHospede(dados.idHospede);
            setTiposDeQuartoNaReserva(dados.tiposDeQuartoNaReserva);
            setIdHotel(dados.idHotel);
            setSelectedQuartos(processarDadosDaApi(dados.tiposDeQuartoNaReserva));
        } 
    }

    async function salvar() {
        const quartosParaEnviar = Object.keys(selectedQuartos).map((key) => ({
            idTipoDeQuarto: parseInt(key, 10),
            quantidade: selectedQuartos[key].quantidade,
        }));
        let data = {
            id,
            dataChegada,
            dataSaida,
            idHospede,
            tipoDeQuartoNaReservaDTO: quartosParaEnviar,
            idHotel,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
            .post(baseURL, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Reserva: ${id} cadastrada com sucesso!`)
                navigate(`/listagem-reservas`);
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
                mensagemSucesso(`Reserva: ${id} alterada com sucesso!`);
                navigate(`/listagem-reservas`);
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
            setDataChegada(dados.dataChegada);
            setDataSaida(dados.dataSaida);
            setIdHospede(dados.idHospede);
            setTiposDeQuartoNaReserva(dados.tiposDeQuartoNaReserva);
            setIdHotel(dados.idHotel);
            setSelectedQuartos(processarDadosDaApi(dados.tiposDeQuartoNaReserva));
        }
    }

    const [dadosHospede, setDadosHospede] = useState(null);
    const [dadosTipoQuarto, setDadosTipoQuarto] = useState(null);
    const [dadosHotel, setDadosHotel] = useState(null);

    //const [selectedQuartos, setSelectedQuartos] = useState({});

    const processarDadosDaApi = (dados) => {
        if (!dados || dados.length === 0) {
            return {};
        }

        // O reduce transforma o array de mapas no nosso objeto de estado
        return dados.reduce((acc, mapa) => {
            // Pega o primeiro (e único) par chave-valor do mapa. Ex: ["5", 1]
            const [id, quantidade] = Object.entries(mapa)[0];

            acc[id] = { quantidade };
            return acc;
        }, {});
    };
    /*const processarSelecionados = (dadosString) => {
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
*/
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
            setDadosHospede(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(baseURLTipoQuarto).then((response) => {
            setDadosTipoQuarto(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(baseURLHotel).then((response) => {
            setDadosHotel(response.data);
        });
    }, []);


    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;
    if (!dadosHospede) return null;
    if (!dadosTipoQuarto) return null;
    if (!dadosHotel) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Reserva'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label={<strong>Chegada: *</strong>} htmlFor='inputChegada'>
                                <input
                                    type='datetime-local'
                                    id='inputChegada'
                                    value={dataChegada}
                                    className='form-control'
                                    name='dataChegada'
                                    onChange={(e) => setDataChegada(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong>Saída: *</strong>} htmlFor='inputSaida'>
                                <input
                                    type='datetime-local'
                                    id='inputSaida'
                                    value={dataSaida}
                                    className='form-control'
                                    name='saida'
                                    onChange={(e) => setDataSaida(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label={<strong>Hospede: *</strong>} htmlFor='selectHospede'>
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
                                    {dadosHospede.map((dado) => (
                                        <option key={dado.id} value={dado.id}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
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
                                    {dadosHotel.map((dado) => (
                                        <option key={dado.id} value={dado.id}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label={<strong>Tipos de Quarto: *</strong>} htmlFor='selectTipoDeQuarto'>
                                {dadosTipoQuarto.map((dado) => (
                                    <div key={dado.id} className="flex items-center gap-2">
                                        <label key={dado.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                value={dado.id}
                                                checked={selectedQuartos[dado.id] !== undefined}
                                                onChange={(e) => {
                                                    handleSelectionChange(e, setSelectedQuartos);
                                                }}
                                            />
                                            {dado.tipo}
                                        </label>
                                        {selectedQuartos[dado.id] !== undefined && (
                                            <input
                                                type="number"
                                                min="1"
                                                value={selectedQuartos[dado.id]?.quantidade || 1}
                                                onChange={(e) => handleQuantidadeChange(dado.id, parseInt(e.target.value, 10), setSelectedQuartos)}
                                                className="border p-1 w-16"
                                            />
                                        )}
                                    </div>
                                ))}
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

export default CadastroReserva;
