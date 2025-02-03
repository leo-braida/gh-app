import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL} from '../config/axios';

const baseURL = `${BASE_URL}/tipoDeQuartos`;
const baseURLCamas = `${BASE_URL}/tipoDeCama`;
const baseURLItens = `${BASE_URL}/itens`;
function CadastroTipoQuarto() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);
  const [preco, setPreco] = useState(0);
  const [idCama, setIdCama] = useState('');
  const [idItem, setIdItem] = useState('');

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setQuantidadeTotal(0);
      setPreco(0);
      setIdCama('');
      setIdItem('');
    } 
    else {
        setId(dados.id);
        setQuantidadeTotal(dados.quantidadeTotal);
        setPreco(dados.preco);
        setIdCama(dados.idCama);
        setIdItem(dados.idItem);
    } 
  }

  async function salvar() {
    let data = {
      id,
      quantidadeTotal,
      preco,
      idCama,
      idItem,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Tipo de quarto: ${id} cadastrado com sucesso!`)
          navigate(`/listagem-tipos-quarto`);
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
          mensagemSucesso(`Tipo de quarto: ${id} alterado com sucesso!`);
          navigate(`/listagem-tipos-quarto`);
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
      setQuantidadeTotal(dados.quantidadeTotal);
      setPreco(dados.preco);
      setIdCama(dados.idCama);
      setIdItem(dados.idItem);
    }
  }

const [dadosCamas, setDadosCamas] = useState([]);
const [dadosItens, setDadosItens] = useState([]);

const handleCamaChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
  setIdCama(selectedValues);
};

const handleItemChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
  setIdItem(selectedValues);
};

useEffect(() => {
  axios.get(baseURLCamas).then((response) => {
    setDadosCamas(response.data);
  });
}, []);

useEffect(() => {
  axios.get(baseURLItens).then((response) => {
    setDadosItens(response.data);
  });
}, []);

useEffect(() => {
  buscar();
}, [id]);

if (!dados) return null;
if (!dadosCamas) return null;
if (!dadosItens) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Tipo de Quarto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Quantidade: *' htmlFor='inputQuantidadeTotal'>
                <input
                  type='number'
                  id='inputQuantidadeTotal'
                  value={quantidadeTotal}
                  className='form-control'
                  name='qauntidadeTotal'
                  onChange={(e) => setQuantidadeTotal(e.target.value)}
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
              <FormGroup label='Cama: *' htmlFor='selectCama'>
                <select
                  id='selectCama'
                  value={idCama}
                  multiple
                  className='form-select'
                  name='idCama'
                  onChange={handleCamaChange}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosCamas.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.tipo}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Item: *' htmlFor='selectItem'>
                <select
                  id='selectItem'
                  value={idItem}
                  multiple
                  className='form-select'
                  name='idItem'
                  onChange={handleItemChange}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
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

export default CadastroTipoQuarto;
