import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/itens`;

function CadastroItem() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [quantidadeEmEstoque, setQuantidadeEmEstoque] = useState(0);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setQuantidadeEmEstoque(0);
      setNome('');
      setPreco(0);
    } 
    else {
        setId(dados.id);
        setQuantidadeEmEstoque(dados.quantidadeEmEstoque);
        setNome(dados.nome);
        setPreco(dados.preco);
    }
  }

  async function salvar() {
    let data = {
      id,
      quantidadeEmEstoque,
      nome,
      preco,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Item ${nome} cadastrada com sucesso!`)
          navigate(`/listagem-itens`);
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
          mensagemSucesso(`Item ${nome} alterado com sucesso!`);
          navigate(`/listagem-itens`);
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
        setQuantidadeEmEstoque(dados.quantidadeEmEstoque);
        setNome(dados.nome);
        setPreco(dados.preco);
    }
  }

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Item'>
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
              <FormGroup label='Quantidade Em Estoque: *' htmlFor='inputQuantidadeEmEstoque'>
                <input
                  type='number'
                  id='inputQuantidadeEmEstoque'
                  value={quantidadeEmEstoque}
                  className='form-control'
                  name='quantidade em estoque'
                  onChange={(e) => setQuantidadeEmEstoque(e.target.value)}
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

export default CadastroItem;
