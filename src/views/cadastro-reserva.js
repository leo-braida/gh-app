import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL, BASE_URL3, BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL}/reservas`;
const baseURLHospede = `${BASE_URL}/hospedes`;
const baseURLTipoQuarto = `${BASE_URL3}/tipoDeQuartos`;
const baseURLHotel = `${BASE_URL2}/hoteis`;

function CadastroReserva(){
    const { idParam } = useParams();
  
    const navigate = useNavigate();
  
    const [id, setId] = useState('');
    const [dataChegada, setDataChegada] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [idHospede, setIdHospede] = useState('');
    const [idTipoQuarto, setIdTipoQuarto] = useState('');
    const [dados, setDados] = useState([]);
    const [idHotel, setIdHotel] = useState('');
  
    function inicializar() {
      if (idParam == null) {
        setId('');
        setDataChegada('');
        setDataSaida('');
        setIdHospede('');
        setIdTipoQuarto('');
        setIdHotel('');
      } 
      else {
          setId(dados.id);
          setDataChegada(dados.dataChegada);
          setDataSaida(dados.dataSaida);
          setIdHospede(dados.idHospede);
          setIdTipoQuarto(dados.idTipoQuarto);
          setIdHotel(dados.hotel);
      } 
    }
  
      async function salvar() {
      let data = {
        id,
        dataChegada,
        dataSaida,
        idHospede,
        idTipoQuarto,
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
        setIdTipoQuarto(dados.idTipoQuarto);
        setIdHotel(dados.hotel);
      }
    }

  const [dadosHospede, setDadosHospede] = useState(null);
  const [dadosTipoQuarto, setDadosTipoQuarto] = useState(null);
  const [dadosHotel, setDadosHotel] = useState(null);

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
                <FormGroup label='Data de Chegada: *' htmlFor='inputDataChegada'>
                  <input
                    type='text'
                    id='inputDataChegada'
                    value={dataChegada}
                    className='form-control'
                    name='dataChegada'
                    onChange={(e) => setDataChegada(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Data de Saída: *' htmlFor='inputDataSaida'>
                  <input
                    type='text'
                    id='inputDataSaida'
                    value={dataSaida}
                    className='form-control'
                    name='dataSaida'
                    onChange={(e) => setDataSaida(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Hospede: *' htmlFor='selectHospede'>
                  <select
                    id='selectHospede'
                    value={idHospede}
                    className='form-select'
                    name='idHospede'
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
                <FormGroup label='Tipo de Quarto: *' htmlFor='selectTipoQuarto'>
                  <select
                    id='selectTipoQuarto'
                    value={idTipoQuarto}
                    className='form-select'
                    name='idTipoQuarto'
                    onChange={(e) => setIdTipoQuarto(e.target.value)}
                  >
                    <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosTipoQuarto.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.tipo}
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
  
  export default CadastroReserva;
