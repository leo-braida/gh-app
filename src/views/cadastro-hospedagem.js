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
const baseURLHotel = `${BASE_URL2}/hoteis`;
const baseURLCama = `${BASE_URL3}/camas`;

function CadastroHospedagem() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [hospede, setHospede] = useState('');
  const [adultos, setAdultos] = useState(0);
  const [criancas, setCriancas] = useState(0);
  const [idQuarto, setIdQuarto] = useState('');
  const [idServico, setIdServico] = useState('');
  const [idItem, setIdItem] = useState('');
  const [hotel, setHotel] = useState('');
  const [idCamas, setIdCamas] = useState('');
  const [servico, setServico] = useState('');

  const [dados, setDados] = useState([]);
  
  function inicializar() {
    if (idParam == null) {
      setId('');
      setCheckIn('');
      setCheckOut('');
      setHospede('');
      setAdultos(0);
      setCriancas(0);
      setIdQuarto('');
      setIdServico('');
      setIdItem('');
      setHotel('');
      setIdCamas('');
      setServico('');
      setSelectedItens('');
      setSelectedCamas('');
      setSelectedServicos('');
    } 
    else {
      setId(dados.id);
      setCheckIn(dados.checkIn);
      setCheckOut(dados.checkOut);
      setHospede(dados.hospede);
      setAdultos(dados.adultos);
      setCriancas(dados.criancas);
      setIdQuarto(dados.idQuarto);
      setIdServico(dados.idServico);
      setIdItem(dados.idItem);
      setHotel(dados.hotel);
      setIdCamas(dados.idCamas);
      setSelectedItens(processarSelecionados(dados.itensExtras));
      setSelectedCamas(processarSelecionados(dados.camasExtras));
      setSelectedServicos(processarSelecionados(dados.servicos));
    } 
  }

  async function salvar() {
    let data = {
      id,
      checkIn,
      checkOut,
      hospede,
      adultos,
      criancas,
      idQuarto,
      idServico,
      idItem,
      hotel,
      idCamas,
      servico,
      
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
      setHospede(dados.hospede);
      setAdultos(dados.adultos);
      setCriancas(dados.criancas);
      setIdQuarto(dados.idQuarto);
      setIdServico(dados.idServico);
      setIdItem(dados.idItem);
      setHotel(dados.hotel);
      setIdCamas(dados.idCamas);
      setIdServico(dados.idServico);
    }
  }

  const [dadosHospedes, setDadosHospedes] = useState(null);
  const [dadosQuartos, setDadosQuartos] = useState(null);
  const [dadosServicos, setDadosServicos] = useState(null);
  const [dadosItens, setDadosItens] = useState(null);
  const [dadosHoteis, setDadosHoteis] = useState(null);
  const [dadosCamas, setDadosCamas] = useState(null);
 

const [selectedCamas, setSelectedCamas] = useState({});
const [selectedItens, setSelectedItens] = useState({});
const [selectedServicos, setSelectedServicos] = useState({});

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
      setSelectedCamas(processarSelecionados(dados.camasExtras));
      setSelectedItens(processarSelecionados(dados.itensExtras));
      setSelectedServicos(processarSelecionados(dados.servicos));
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


  const handleHospedeChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setHospede(selectedValues);
  };

  const handleQuartoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setIdQuarto(selectedValues);
  };

  const handleServicoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setIdServico(selectedValues);
  };

  useEffect(() => {
    axios.get(baseURLHospede).then((response) => {
        setDadosHospedes(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get(baseURLCama).then((response) => {
        setDadosCamas(response.data);
    });
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
    axios.get(baseURLHotel).then((response) => {
        setDadosHoteis(response.data);
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
  if (!dadosHoteis) return null;
  if (!dadosCamas) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Hospedagem'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Check-in: *' htmlFor='inputCheckIn'>
                <input
                  type='datetime-local'
                  id='inputCkeckIn'
                  value={checkIn}
                  className='form-control'
                  name='checkIn'
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Check-out: *' htmlFor='inputCheckOut'>
                <input
                  type='datetime-local'
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
                  value={hospede}
                  className='form-select'
                  name='hospede'
                  onChange={(e) => setHospede(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosHospedes.map((dado) => (
                    <option key={dado.id} value={dado.nome}>
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
              <FormGroup label={<strong> Serviços: *</strong>} htmlFor='selectServico'>
                {dadosServicos.map((dado) => (
                  <div key={dado.id} className="flex items-center gap-2">
                    <label key={dado.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={dado.nome}
                        checked={selectedServicos[dado.nome] !== undefined}
                        onChange={(e) => {
                          handleSelectionChange(e, setSelectedServicos);
                        }}
                      />
                      {dado.nome}
                    </label>
                    {selectedServicos[dado.nome] !== undefined && (
                      <input
                        type="number"
                        min="1"
                        value={selectedServicos[dado.nome]?.quantidade || 1}
                        onChange={(e) => handleQuantidadeChange(dado.nome, e.target.value, setSelectedServicos)}
                        className="border p-1 w-16"
                      />
                    )}
                  </div>
                ))}
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
                  {dadosHoteis.map((dado) => (
                    <option key={dado.id} value={dado.nome}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label={<strong> Itens Extras: *</strong>} htmlFor='selectItem'>
                {dadosItens.map((dado) => (
                  <div key={dado.id} className="flex items-center gap-2">
                    <label key={dado.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={dado.nome}
                        checked={selectedItens[dado.nome] !== undefined}
                        onChange={(e) => {
                          handleSelectionChange(e, setSelectedItens);
                        }}
                      />
                      {dado.nome}
                    </label>
                    {selectedItens[dado.nome] !== undefined && (
                      <input
                        type="number"
                        min="1"
                        value={selectedItens[dado.nome]?.quantidade || 1}
                        onChange={(e) => handleQuantidadeChange(dado.nome, e.target.value, setSelectedItens)}
                        className="border p-1 w-16"
                      />
                    )}
                  </div>
                ))}
              </FormGroup>
       
              <FormGroup label={<strong>Camas extras: </strong>} htmlFor='selectCama'>
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
                        value={selectedCamas[dado.tipo]?.quantidade || 1}
                        onChange={(e) => handleQuantidadeChange(dado.tipo, e.target.value, setSelectedCamas)}
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

export default CadastroHospedagem;
