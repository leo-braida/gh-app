import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/tiposDeCama`;

function CadastroTipoCama() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidadeAdultos, setQuantidadeAdultos] = useState(0);
  const [quantidadeCriancas, setQuantidadeCriancas] = useState(0);

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setTipo('');
      setQuantidadeAdultos(0);
      setQuantidadeCriancas(0);
    } 
    else {
      setId(dados.id);
      setTipo(dados.tipo);
      setQuantidadeAdultos(dados.quantidadeAdultos);
      setQuantidadeCriancas(dados.quantidadeCriancas);
    }
  }

  async function salvar() {
    let data = {
      id,
      tipo,
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
          mensagemSucesso(`Tipo de cama ${tipo} cadastrado com sucesso!`)
          navigate(`/listagem-tipos-cama`);
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
          mensagemSucesso(`Tipo de cama ${tipo} alterado com sucesso!`);
          navigate(`/listagem-tipos-cama`);
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
      setQuantidadeAdultos(dados.quantidadeAdultos);
      setQuantidadeCriancas(dados.quantidadeCriancas);
    }
  }

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Tipo de Cama'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label={<strong> Tipo: *</strong>} htmlFor='inputTipo'>
                <input
                  type='text'
                  id='inputTipo'
                  value={tipo}
                  className='form-control'
                  name='tipo'
                  onChange={(e) => setTipo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label={<strong> Quantidade de adultos: *</strong>} htmlFor='inputQuantidadeAdultos'>
                <input
                  type='number'
                  id='inputQuantidadeAdultos'
                  value={quantidadeAdultos}
                  className='form-control'
                  name='quantidadeAdultos'
                  onChange={(e) => setQuantidadeAdultos(e.target.value)}
                />
              </FormGroup>
              <FormGroup label={<strong> Quantidade de crianças: *</strong>} htmlFor='inputQuantidadeCriancas'>
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
