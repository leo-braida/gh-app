import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL2, BASE_URL3 } from '../config/axios';

const baseURL = `${BASE_URL3}/agendamentos`;
const baseURLServicos = `${BASE_URL2}/servicos`;
const baseURLHotel = `${BASE_URL2}/hoteis`

function CadastroAgendamento(){
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [reserva, setReserva] = useState('');
  const [idServicos, setIdServicos] = useState('');
  const [funcionario, setFuncionario] = useState("");
  const [quarto, setQuarto] = useState("");
  const [hospede, setHospede] = useState("");
  const [idHotel, setIdHotel] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setReserva('');
      setIdServicos('');
      setFuncionario('');
      setQuarto('');
      setHospede('');
      setIdHotel(dados.idHotel);
      
    } 
    else {
        setId(dados.id);
        setReserva(dados.horario);
        setIdServicos(dados.idServicos);
        setFuncionario(dados.funcionario);
        setQuarto(dados.quarto);
        setHospede(dados.hospede);
        setIdHotel(dados.idHotel);
    } 
  }

    async function salvar() {
    let data = {
      id,
      reserva,
      idServicos,
      funcionario,
      quarto,
      hospede,
      idHotel,
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
      setIdServicos(dados.idServicos);
    }
  }

const [dadosServicos, setDadosServicos] = useState(null);
const [dadosHotel, setDadosHotel] = useState(null);

useEffect(() => {
    axios.get(baseURLServicos).then((response) => {
      setDadosServicos(response.data);
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
                  value={idServicos}
                  className='form-select'
                  name='idServicos'
                  onChange={(e) => setIdServicos(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosServicos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Funcionário: *' htmlFor='inputFuncionario'>
                <input
                  type='text'
                  id='inputFuncionario'
                  value={funcionario}
                  className='form-control'
                  name='funcionario'
                  onChange={(e) => setFuncionario(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quarto: *' htmlFor='inputQuarto'>
                <input
                  type='text'
                  id='inputQuarto'
                  value={quarto}
                  className='form-control'
                  name='quarto'
                  onChange={(e) => setQuarto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Hóspede: *' htmlFor='inputHospede'>
                <input
                  type='text'
                  id='inputHospede'
                  value={hospede}
                  className='form-control'
                  name='hospede'
                  onChange={(e) => setHospede(e.target.value)}
                />
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

export default CadastroAgendamento;
