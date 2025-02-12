import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL3, BASE_URL2, BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL3}/camas`;
const baseURLTipoDeCama = `${BASE_URL}/tipoDeCama`;
const baseURLHotel = `${BASE_URL2}/hoteis`;

function CadastroTipoCama() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [hotel, setHotel] = useState('');
  const [quantidadeAdultos, setQuantidadeAdultos] = useState(0);
  const [quantidadeCriancas, setQuantidadeCriancas] = useState(0);

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setTipo('');
      setQuantidade(0);
      setHotel('');
      setQuantidadeAdultos(0);
      setQuantidadeCriancas(0);
    } 
    else {
      setId(dados.id);
      setTipo(dados.tipo);
      setQuantidade(dados.quantidade);
      setHotel(dados.hotel);
      setQuantidadeAdultos(dados.quantidadeAdultos);
      setQuantidadeCriancas(dados.quantidadeCriancas);
    }
  }

  async function salvar() {
    let data = {
      id,
      tipo,
      quantidade,
      hotel,
      quantidadeAdultos,
      quantidadeCriancas,
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
      setTipo(dados.tipo);
      setQuantidade(dados.quantidade);
      setHotel(dados.hotel);
      setQuantidadeAdultos(dados.quantidadeAdultos);
      setQuantidadeCriancas(dados.quantidadeCriancas);
    }
  }

  const [dadosTipoDeCama, setDadosTipoDeCama] = useState(null);
  const [dadosHotel, setDadosHotel] = useState(null);

  useEffect(() => {
    axios.get(baseURLTipoDeCama).then((response) => {
        setDadosTipoDeCama(response.data);
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
  if (!dadosHotel) return null;
  if (!dadosTipoDeCama) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Cama'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Tipo de Cama: *' htmlFor='selectTipoDeCama'>
                  <select
                    id='selectTipoDeCama'
                    value={tipo}
                    className='form-select'
                    name='tipoDeCama'
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosTipoDeCama.map((dado) => (
                      <option key={dado.id} value={dado.tipo}>
                        {dado.tipo}
                      </option>
                    ))}
                  </select>
              </FormGroup>
              <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  name='quantidade'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
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
              <FormGroup label='Quantidade de adultos: *' htmlFor='inputQuantidadeAdultos'>
                <input
                  type='number'
                  id='inputQuantidadeAdultos'
                  value={quantidadeAdultos}
                  className='form-control'
                  name='quantidadeAdultos'
                  onChange={(e) => setQuantidadeAdultos(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup label='Quantidade de crianças: *' htmlFor='inputQuantidadeCriancas'>
                <input
                  type='number'
                  id='inputQuantidadeCriancas'
                  value={quantidadeCriancas}
                  className='form-control'
                  name='quantidadeCriancas'
                  onChange={(e) => setQuantidadeCriancas(e.target.value)}
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

export default CadastroTipoCama;
