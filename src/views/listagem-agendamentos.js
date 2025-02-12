import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';

const baseURL = `${BASE_URL3}/agendamentos`;

function ListagemAgendamentos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-agendamento`);
  };

  const editar = (id) => {
    navigate(`/cadastro-agendamento/${id}`);
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
      mensagemSucesso(`Agendamento excluído com sucesso!`);
      setDados(
        dados.filter((dado) => {
          return dado.id !== id;
        })
      );
    })
    .catch(function (error) {
      mensagemErro(`Erro ao excluir Agendamento`);
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
      <Card title='Listagem de agendamentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
                >
                Novo agendamento
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Reserva</th>
                    <th scope='col'>Serviço</th>
                    <th scope='col'>Funcionário</th>
                    <th scope='col'>Hóspede</th>
                    <th scope='col'>Quarto</th>
                    <th scope='col'>Hotel</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{new Date(dado.reserva).toLocaleDateString("pt-br")} {new Date(dado.reserva).toLocaleTimeString("pt-br", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                      </td>
                      <td>{dado.servico}</td>
                      <td>{dado.funcionario}</td>
                      <td>{dado.hospedeRegistrado}</td>
                      <td>{dado.quarto}</td>
                      <td>{dado.hotel}</td>
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

export default ListagemAgendamentos;
