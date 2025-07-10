import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL, BASE_URL3 } from '../config/axios';

const baseURL = `${BASE_URL3}/tiposDeQuarto`;
const baseURLCamas = `${BASE_URL}/tiposDeCama`;
const baseURLItens = `${BASE_URL}/itens`;
function CadastroTipoQuarto() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);
  const [preco, setPreco] = useState(0);
  const [idCama, setIdCama] = useState('');
  const [idItem, setIdItem] = useState('');

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setTipo('');
      setQuantidadeTotal(0);
      setPreco(0);
      setIdCama('');
      setIdItem('');
      setSelectedCamas('');
      setSelectedItens('');
    } 
    else {
        setId(dados.id);
        setTipo(dados.tipo);
        setQuantidadeTotal(dados.quantidadeTotal);
        setPreco(`R$ ${dados.preco}`);
        setIdCama(dados.idCama);
        setIdItem(dados.idItem);
        setSelectedCamas(processarSelecionados(dados.camas));
        setSelectedItens(processarSelecionados(dados.itens));
    } 
  }

  async function salvar() {
    let data = {
      id,
      tipo,
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
          mensagemSucesso(`Tipo de quarto: ${tipo} cadastrado com sucesso!`)
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
      setTipo(dados.tipo);
      setQuantidadeTotal(dados.quantidadeTotal);
      setPreco(`R$ ${dados.preco}`);
      setIdCama(dados.idCama);
      setIdItem(dados.idItem);
    }
  }

const [dadosCamas, setDadosCamas] = useState([]);
const [dadosItens, setDadosItens] = useState([]);

const [selectedCamas, setSelectedCamas] = useState({});
const [selectedItens, setSelectedItens] = useState({});

const processarSelecionados = (dadosString) => {
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

useEffect(() => {
    if (dados) {
      setSelectedCamas(processarSelecionados(dados.camas));
      setSelectedItens(processarSelecionados(dados.itens));
    }
  }, [dados]);

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
              <FormGroup label={<strong> Quantidade: *</strong>} htmlFor='inputQuantidadeTotal'>
                <input
                  type='number'
                  id='inputQuantidadeTotal'
                  value={quantidadeTotal}
                  className='form-control'
                  name='qauntidadeTotal'
                  onChange={(e) => setQuantidadeTotal(e.target.value)}
                />
              </FormGroup>
              <FormGroup label={<strong> Preço: *</strong>} htmlFor='inputPreco'>
                <input
                  type='text'
                  id='inputPreco'
                  value={preco}
                  className='form-control'
                  name='preco'
                  onChange={(e) => {
                      let valor = (e.target.value.replace(/[^\d,]/g, ""));
                      valor = `R$ ${valor}`;

                      setPreco(valor);
                      }}
                />
              </FormGroup>         
              <FormGroup label={<strong> Camas: *</strong>} htmlFor='selectCama'>
                {dadosCamas.map((dado) => (
                  <div key={dado.id} className="flex items-center gap-2">
                    <label key={dado.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={dado.tipo}
                        checked={selectedCamas[dado.tipo] !== undefined}
                        onChange={(e) => {
                          handleSelectionChange(e, setSelectedCamas);
                        }}
                      />
                      {dado.tipo}
                    </label>
                    {selectedCamas[dado.tipo] !== undefined && (
                      <input
                        type="number"
                        min="1"
                        value={selectedCamas[dado.tipo]?.quantidade || ""}
                        onChange={(e) => handleQuantidadeChange(dado.tipo, e.target.value, setSelectedCamas)}
                        className="border p-1 w-16"
                      />
                    )}
                  </div>
                ))}
              </FormGroup>
              <FormGroup label={<strong> Itens: *</strong>} htmlFor='selectItem'>
                {dadosItens.map((dado) => (
                  <div key={dado.id} className="flex items-center gap-2">
                    <label key={dado.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={dado.nome}
                        checked={selectedItens[dado.nome] !== undefined}
                        onChange={(e) => {
                          handleSelectionChange(e, setSelectedItens)}}
                      />
                      {dado.nome}
                    </label>
                    {selectedItens[dado.nome] !== undefined && (
                      <input
                        type="number"
                        min="1"
                        value={selectedItens[dado.nome]?.quantidade || ""}
                        onChange={(e) => handleQuantidadeChange(dado.nome, e.target.value, setSelectedItens)}
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

export default CadastroTipoQuarto;
