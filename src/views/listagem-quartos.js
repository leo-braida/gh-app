import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL_TIPOQUARTOS } from '../config/axios';

const baseURLQuarto = `${BASE_URL_TIPOQUARTOS}/quartos`;

const baseURLTipoDeQuartos = `${BASE_URL_TIPOQUARTOS}/tipoDeQuartos`;
const baseURLTipoDoQuarto = `${BASE_URL_TIPOQUARTOS}/tipoDoQuarto`;


function ListagemQuartos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-quarto`);
  };

  const editar = (id) => {
    navigate(`/cadastro-quarto/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURLQuarto}/${id}`;
    console.log(url)
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
      mensagemSucesso(`Quarto excluído com sucesso!`);
      setDados(
        dados.filter((dado) => {
          return dado.id !== id;
        })
      );
    })
    .catch(function (error) {
      mensagemErro(`Erro ao excluir Quarto`);
    });
  }

  const [tiposDeQuartos, setTiposDeQuarto] = React.useState(null);
  const [tipoDoQuarto, setTipoDoQuarto] = React.useState(null);



  React.useEffect(() => {
    Promise.all([
    axios.get(baseURLQuarto),
    axios.get(baseURLTipoDeQuartos),
    axios.get(baseURLTipoDoQuarto)
    ])
    .then((responses) => {
        setDados(responses[0].data);
        setTiposDeQuarto(responses[1].data);
        setTipoDoQuarto(responses[2].data);
      })
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de quartos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
                >
                Novo quarto
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Situação</th>
                    <th scope='col'>Número</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.situacao}</td>
                      <td>{dado.numero}</td>
                      <td>
                        {tipoDoQuarto
                          .filter((tipos) => tipos.idQuarto === dado.id)
                          .map((tipos) => {
                            const tipoDeQuarto = tiposDeQuartos.find((h) => h.id === tipos.idTipoDeQuarto);
                            return (
                              <div key={tipos.id}>
                                {tipoDeQuarto.tipo}
                              </div>
                            );
                          })}
                      </td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemQuartos;