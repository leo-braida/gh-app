import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL, BASE_URL2, BASE_URL3 } from '../config/axios';

const baseURL = `${BASE_URL3}/agendamentos`;
const baseURLServicos = `${BASE_URL2}/servicos`;
const baseURLHotel = `${BASE_URL2}/hoteis`;
const baseURLTrabalhador = `${BASE_URL2}/trabalhadores`;
const baseURLHospede = `${BASE_URL}/hospedes`;
const baseURLQuarto = `${BASE_URL3}/quartos`;

function CadastroAgendamento(){
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [reserva, setReserva] = useState('');
  const [servico, setServico] = useState('');
  const [trabalhador, setTrabalhador] = useState('');
  const [quarto, setQuarto] = useState(0);
  const [hospede, setHospede] = useState('');
  const [hotel, setHotel] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setReserva('');
      setServico('');
      setTrabalhador('');
      setQuarto(0);
      setHospede('');
      setHotel('');
      
    } 
    else {
        setId(dados.id);
        setReserva(dados.horario);
        setServico(dados.servico);
        setTrabalhador(dados.trabalhador);
        setQuarto(dados.quarto);
        setHospede(dados.hospede);
        setHotel(dados.hotel);
    } 
  }

    async function salvar() {
    let data = {
      id,
      reserva,
      servico,
      trabalhador,
      quarto,
      hospede,
      hotel,
    };
    
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Agendamento ${id} cadastrado com sucesso!`)
          navigate(`/listagem-agendamentos`);
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
          mensagemSucesso(`Agendamento ${id} alterado com sucesso!`);
          navigate(`/listagem-agendamentos`);
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
      setReserva(dados.reserva);
      setServico(dados.servico);
      setTrabalhador(dados.trabalhador);
      setHospede(dados.hospede);
      setQuarto(dados.quarto);
      setHotel(dados.hotel);
    }
  }

const [dadosServicos, setDadosServicos] = useState(null);
const [dadosTrabalhador, setDadosTrabalhador] = useState(null);
const [dadosHospede, setDadosHospede] = useState(null);
const [dadosQuartos, setDadosQuartos] = useState(null);
const [dadosHotel, setDadosHotel] = useState(null);

useEffect(() => {
    axios.get(baseURLServicos).then((response) => {
      setDadosServicos(response.data);
    });
}, []);

useEffect(() => {
  axios.get(baseURLTrabalhador).then((response) => {
    setDadosTrabalhador(response.data);
  });
}, []);

useEffect(() => {
  axios.get(baseURLHospede).then((response) => {
    setDadosHospede(response.data);
  });
}, []);

useEffect(() => {
  axios.get(baseURLQuarto).then((response) => {
    setDadosQuartos(response.data);
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
if (!dadosServicos) return null;
if (!dadosTrabalhador) return null;
if (!dadosHospede) return null;
if (!dadosQuartos) return null;
if (!dadosHotel) return null;

return (
    <div className='container'>
      <Card title='Cadastro de Agendamento'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Reserva: *' htmlFor='inputReserva'>
                <input
                  type='datetime-local'
                  id='inputReserva'
                  value={reserva}
                  className='form-control'
                  name='reserva'
                  onChange={(e) => setReserva(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Serviço: *' htmlFor='selectServicos'>
                <select
                  id='selectServicos'
                  value={servico}
                  className='form-select'
                  name='servico'
                  onChange={(e) => setServico(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosServicos.map((dado) => (
                    <option key={dado.id} value={dado.nome}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Trabalhador: *' htmlFor='selectTrabalhador'>
                <select
                  id='selectTrabalhador'
                  value={trabalhador}
                  className='form-select'
                  name='trabalhador'
                  onChange={(e) => setTrabalhador(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTrabalhador.map((dado) => (
                    <option key={dado.id} value={dado.nome}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Hospede: *' htmlFor='selectHospede'>
                  <select
                    id='selectHospede'
                    value={hospede}
                    className='form-select'
                    name='hospede'
                    onChange={(e) => setHospede(e.target.value)}
                  >
                    <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosHospede.map((dado) => (
                      <option key={dado.id} value={dado.nome}>
                        {dado.nome}
                      </option>
                    ))}
                  </select>
                </FormGroup>         
              <FormGroup label='Quarto: *' htmlFor='selectQuarto'>
                <select
                  id='selectQuarto'
                  value={quarto}
                  className='form-select'
                  name='quarto'
                  onChange={(e) => setQuarto(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosQuartos.map((dado) => (
                    <option key={dado.id} value={dado.numero}>
                      {dado.numero}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Hotel: *' htmlFor='selectHotel'>
                <select
                  id='selectHotel'
                  value={hotel}
                  className='form-select'
                  name='hotel'
                  onChange={(e) => setHotel(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosHotel.map((dado) => (
                    <option key={dado.id} value={dado.nome}>
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

export default CadastroAgendamento;
