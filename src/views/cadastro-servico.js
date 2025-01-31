import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';



import axios from 'axios';
import { BASE_URL3, BASE_URL_HOTEIS } from '../config/axios';

const baseURL = `${BASE_URL3}/servicos`;
const baseURLHoteis = `${BASE_URL_HOTEIS}/hoteis`;
function CadastroServico() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [idHotel, setIdHotel] = useState('');
  const [minutosPorAgendamento, setMinutosPorAgendamento] = useState(0);

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDescricao('');
      setPreco(0);
      setIdHotel('');
      setMinutosPorAgendamento(0);
    } 
    else {
      setId(dados.id);
      setNome(dados.nome);
      setDescricao(dados.descricao);
      setPreco(dados.preco);
      setIdHotel(dados.idHotel);
      setMinutosPorAgendamento(dados.minutosPorAgendamento);
    } 
  }

  async function salvar() {
    let data = {
      id,
      nome,
      descricao,
      preco,
      idHotel,
      minutosPorAgendamento,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`${nome} cadastrado com sucesso!`)
          navigate(`/listagem-servicos`);
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
          mensagemSucesso(`${nome} alterado com sucesso!`);
          navigate(`/listagem-servicos`);
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
      setDescricao(dados.descricao);
      setPreco(dados.preco);
      setIdHotel(dados.idHotel);
      setMinutosPorAgendamento(dados.minutosPorAgendamento);
    }
  }

  const [dadosHoteis, setDadosHoteis] = useState(null);

  useEffect(() => {
    axios.get(baseURLHoteis).then((response) => {
      setDadosHoteis(response.data);
    })
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;
  if (!dadosHoteis) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Tipo de Cama'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Descrição: *' htmlFor='inputDescricao'>
                <input
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>         
              <FormGroup label='Preço: *' htmlFor='inputPreco'>
                <input
                  type='number'
                  id='inputPreco'
                  value={preco}
                  className='form-control'
                  name='preco'
                  onChange={(e) => setPreco(e.target.value)}
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
                  {dadosHoteis.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              
              <FormGroup label='Minutos por agendamento: *' htmlFor='inputMinutosPorAgendamento'>
                <input
                  type='number'
                  id='inputMinutosPorAgendamento'
                  value={minutosPorAgendamento}
                  className='form-control'
                  name='minutosPorAgendamento'
                  onChange={(e) => setMinutosPorAgendamento(e.target.value)}
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

export default CadastroServico;
