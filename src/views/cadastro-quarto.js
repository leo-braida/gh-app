import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL_QUARTOS } from '../config/axios';

const baseURL = `${BASE_URL_QUARTOS}/quartos`;
const baseURLTipoQuarto = `${BASE_URL_QUARTOS}/tipoDeQuartos`;
function CadastroQuarto(){
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [situacao, setSituacao] = useState('');
  const [numero, setNumero] = useState('');
  const [idTipoQuarto, setIdTipoQuarto] = useState('');
  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setSituacao('');
      setNumero('');
      setIdTipoQuarto('');
    } 
    else {
        setId(dados.id);
        setSituacao(dados.situacao);
        setNumero(dados.numero);
        setIdTipoQuarto(dados.idTipoQuarto);
    } 
  }

    async function salvar() {
    let data = {
      id,
      situacao,
      numero,
      idTipoQuarto,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Quarto: ${id} cadastrado com sucesso!`)
          navigate(`/listagem-quartos`);
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
          mensagemSucesso(`Quarto: ${id} alterado com sucesso!`);
          navigate(`/listagem-quartos`);
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
      setSituacao(dados.situacao);
      setNumero(dados.numero);
      setIdTipoQuarto(dados.idTipoQuarto);
    }
  }

const [dadosTipoQuarto, setDadosTipoQuarto] = useState(null);

useEffect(() => {
    axios.get(baseURLTipoQuarto).then((response) => {
      setDadosTipoQuarto(response.data);
    });
}, []);

useEffect(() => {
  buscar();
}, [id]);

if (!dados) return null;
if (!dadosTipoQuarto) return null;

return (
    <div className='container'>
      <Card title='Cadastro de Quarto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Situaçao: *' htmlFor='inputSituacao'>
                <input
                  type='text'
                  id='inputSituacao'
                  value={situacao}
                  className='form-control'
                  name='situacao'
                  onChange={(e) => setSituacao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Numero: *' htmlFor='inputNumero'>
                <input
                  type='number'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>         
              <FormGroup label='TipoQuarto: *' htmlFor='selectTipoQuarto'>
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

export default CadastroQuarto;