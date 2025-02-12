import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/reservas`;

function ListagemReservas() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-reserva`);
  };

  const editar = (id) => {
    navigate(`/cadastro-reserva/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url)
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
      mensagemSucesso(`Reserva excluída com sucesso!`);
      setDados(
        dados.filter((dado) => {
          return dado.id !== id;
        })
      );
    })
    .catch(function (error) {
      mensagemErro(`Erro ao excluir Reserva`);
    });
  }

  React.useEffect(() => {
    Promise.all([
    axios.get(baseURL),   
    ])
    .then((responses) => {
        setDados(responses[0].data);
      })
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de reservas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
                >
                Nova reserva
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Data de chegada</th>
                    <th scope='col'>Data de saída</th>
                    <th scope='col'>Hóspedes na Reserva</th>
                    <th scope='col'>Tipo de quarto</th>
                    <th scope='col'>Hotel</th>
                    <th scope='col'>Extras no quarto</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.chegada.replace(/[-T]/g, " ").replace(/^(\d{4}) (\d{2}) (\d{2})/, "$3/$2/$1")}</td>
                      <td>{dado.saida.replace(/[-T]/g, " ").replace(/^(\d{4}) (\d{2}) (\d{2})/, "$3/$2/$1")}</td>
                      <td>{dado.hospede}</td>
                      <td>{dado.tipoDeQuarto}</td>
                      <td>{dado.hotel}</td>
                      <td>
                        {dado.extras.split("\n").map((linha, index) => (
                          <p key={index}>{linha}</p>
                        ))}
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

export default ListagemReservas;
