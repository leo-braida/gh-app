import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL, BASE_URL2, BASE_URL3 } from '../config/axios';

const baseURL = `${BASE_URL3}/hospedagens`;
const baseURLHospede = `${BASE_URL}/hospedes`;
const baseURLQuarto = `${BASE_URL3}/quartos`;
const baseURLServico = `${BASE_URL2}/servicos`;
const baseURLItem = `${BASE_URL}/itens`;

function CadastroHospedagem() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [idHospede, setIdHospede] = useState('');
  const [adultos, setAdultos] = useState(0);
  const [criancas, setCriancas] = useState(0);
  const [idQuarto, setIdQuarto] = useState('');
  const [idServico, setIdServico] = useState('');
  const [idItem, setIdItem] = useState('');

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setCheckIn('');
      setCheckOut('');
      setIdHospede('');
      setAdultos(0);
      setCriancas(0);
      setIdQuarto('');
      setIdServico('');
      setIdItem('');
    } 
    else {
      setId(dados.id);
      setCheckIn(dados.checkIn);
      setCheckOut(dados.checkOut);
      setIdHospede(dados.idHospede);
      setAdultos(dados.adultos);
      setCriancas(dados.criancas);
      setIdQuarto(dados.idQuarto);
      setIdServico(dados.idServico);
      setIdItem(dados.idItem);
    } 
  }

  async function salvar() {
    let data = {
      id,
      checkIn,
      checkOut,
      idHospede,
      adultos,
      criancas,
      idQuarto,
      idServico,
      idItem,
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
      setIdQuarto(dados.idQuarto);
      setIdServico(dados.idServico);
      setIdItem(dados.idItem);
    }
  }

  const [dadosHospedes, setDadosHospedes] = useState(null);
  const [dadosQuartos, setDadosQuartos] = useState(null);
  const [dadosServicos, setDadosServicos] = useState(null);
  const [dadosItens, setDadosItens] = useState(null);

  const handleHospedeChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setIdHospede(selectedValues);
  };

  const handleQuartoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setIdQuarto(selectedValues);
  };

  const handleServicoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setIdServico(selectedValues);
  };

  const handleItemChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setIdItem(selectedValues);
  };

  useEffect(() => {
    axios.get(baseURLHospede).then((response) => {
        setDadosHospedes(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get(baseURLQuarto).then((response) => {
        setDadosQuartos(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get(baseURLServico).then((response) => {
        setDadosServicos(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get(baseURLItem).then((response) => {
        setDadosItens(response.data);
    })
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;
  if (!dadosHospedes) return null;
  if (!dadosQuartos) return null;
  if (!dadosServicos) return null;
  if (!dadosItens) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Hospedagem'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Check-in: *' htmlFor='inputCheckIn'>
                <input
                  type='text'
                  id='inputCkeckIn'
                  value={checkIn}
                  className='form-control'
                  name='checkIn'
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Check-out: *' htmlFor='inputCheckOut'>
                <input
                  type='text'
                  id='inputCheckOut'
                  value={checkOut}
                  className='form-control'
                  name='checkOut'
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Hóspede Responsável: *' htmlFor='selectHospede'>
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
                  {dadosHospedes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>   
              <FormGroup label='Adultos: *' htmlFor='inputAdultos'>
                <input
                  type='number'
                  id='inputAdultos'
                  value={adultos}
                  className='form-control'
                  name='adultos'
                  onChange={(e) => setAdultos(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Crianças: *' htmlFor='inputCriancas'>
                <input
                  type='number'
                  id='inputCriancas'
                  value={criancas}
                  className='form-control'
                  name='criancas'
                  onChange={(e) => setCriancas(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quartos: *' htmlFor='selectQuarto'>
                <select
                  id='selectQuarto'
                  value={idQuarto}
                  multiple
                  className='form-select'
                  name='idQuarto'
                  onChange={handleQuartoChange}
                >
                  {dadosQuartos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.numero}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Serviços: *' htmlFor='selectServico'>
                <select
                  id='selectServico'
                  value={idServico}
                  multiple
                  className='form-select'
                  name='idServico'
                  onChange={handleServicoChange}
                >
                  {dadosServicos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Itens: *' htmlFor='selectItem'>
                <select
                  id='selectItem'
                  value={idItem}
                  multiple
                  className='form-select'
                  name='idItem'
                  onChange={handleItemChange}
                >
                  {dadosItens.map((dado) => (
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
