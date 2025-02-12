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
const baseURLItem = `${BASE_URL}/itens`;
const baseURLCama = `${BASE_URL3}/camas`;

function CadastroReserva(){
    const { idParam } = useParams();
  
    const navigate = useNavigate();
  
    const [id, setId] = useState('');
    const [chegada, setChegada] = useState('');
    const [saida, setSaida] = useState('');
    const [idHospede, setIdHospede] = useState('');
    const [idTipoQuarto, setIdTipoQuarto] = useState('');
    const [dados, setDados] = useState([]);
    const [idHotel, setIdHotel] = useState('');
    const [idCamas, setIdCamas] = useState('');
    const [idItens, setIdItens] = useState('');
  
    function inicializar() {
      if (idParam == null) {
        setId('');
        setChegada('');
        setSaida('');
        setIdHospede('');
        setIdTipoQuarto('');
        setIdHotel('');
        setIdCamas('');
        setIdItens('');
      } 
      else {
        setId(dados.id);
        setChegada(dados.dataChegada);
        setSaida(dados.dataSaida);
        setIdHospede(dados.idHospede);
        setIdTipoQuarto(dados.idTipoQuarto);
        setIdHotel(dados.hotel);
        setIdCamas(dados.camas);
        setIdItens(dados.itens);
        setSelectedQuartos(processarSelecionados(dados.tiposDeQuarto));
        setSelectedCamas(processarSelecionados(dados.camasExtras));
        setSelectedItens(processarSelecionados(dados.itensExtras));
    } 
    }
  
      async function salvar() {
      let data = {
        id,
        chegada,
        saida,
        idHospede,
        idTipoQuarto,
        idHotel,
        idCamas,
        idItens,
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
        setChegada(dados.chegada);
        setSaida(dados.saida);
        setIdHospede(dados.idHospede);
        setIdTipoQuarto(dados.idTipoQuarto);
        setIdHotel(dados.hotel);
      }
    }

  const [dadosHospede, setDadosHospede] = useState(null);
  const [dadosTipoQuarto, setDadosTipoQuarto] = useState(null);
  const [dadosHotel, setDadosHotel] = useState(null);
  const [dadosCamas, setDadosCamas] = useState(null);
  const [dadosItens, setDadosItens] = useState(null);

const [selectedQuartos, setSelectedQuartos] = useState({});
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
      setSelectedQuartos(processarSelecionados(dados.tiposDeQuarto));
      setSelectedCamas(processarSelecionados(dados.camasExtras));
      setSelectedItens(processarSelecionados(dados.itensExtras));
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
    axios.get(baseURLCama).then((response) => {
        setDadosCamas(response.data);
    });
}, []);

  useEffect(() => {
    axios.get(baseURLItem).then((response) => {
        setDadosItens(response.data);
    });
}, []);
  
  useEffect(() => {
    buscar();
  }, [id]);
  
  if (!dados) return null;
  if (!dadosHospede) return null;
  if (!dadosTipoQuarto) return null;
  if (!dadosHotel) return null;
  if (!dadosCamas) return null;
  if (!dadosItens) return null;
  
  return (
      <div className='container'>
        <Card title='Cadastro de Reserva'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Chegada: *' htmlFor='inputChegada'>
                  <input
                    type='datetime-local'
                    id='inputChegada'
                    value={chegada}
                    className='form-control'
                    name='chegada'
                    onChange={(e) => setChegada(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Saída: *' htmlFor='inputSaida'>
                  <input
                    type='datetime-local'
                    id='inputSaida'
                    value={saida}
                    className='form-control'
                    name='saida'
                    onChange={(e) => setSaida(e.target.value)}
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
                <FormGroup label={<strong>Tipos de Quarto: *</strong>} htmlFor='selectTipoDeQuarto'>
                {dadosTipoQuarto.map((dado) => (
                  <div key={dado.id} className="flex items-center gap-2">
                    <label key={dado.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={dado.tipo}
                        checked={selectedQuartos[dado.tipo] !== undefined}
                        onChange={(e) => {
                          handleSelectionChange(e, setSelectedQuartos);
                        }}
                      />
                      {dado.tipo}
                    </label>
                    {selectedQuartos[dado.tipo] !== undefined && (
                      <input
                        type="number"
                        min="1"
                        value={selectedQuartos[dado.tipo]?.quantidade || 1}
                        onChange={(e) => handleQuantidadeChange(dado.tipo, e.target.value, setSelectedQuartos)}
                        className="border p-1 w-16"
                      />
                    )}
                  </div>
                ))}
              </FormGroup>
              <FormGroup label={<strong>Camas extras:</strong>} htmlFor='selectCama'>
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
              <FormGroup label={<strong>Itens extras:</strong>} htmlFor='selectItem'>
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
                        value={selectedItens[dado.nome]?.quantidade || 1}
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
  
  export default CadastroReserva;
