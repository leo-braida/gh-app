import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL3} from '../config/axios';

const baseURL = `${BASE_URL3}/hospedagens`;

function ListagemHospedagens() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-hospedagem`);
  };

  const editar = (id) => {
    navigate(`/cadastro-hospedagem/${id}`);
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
      mensagemSucesso(`Hospedagem excluído com sucesso!`);
      setDados(
        dados.filter((dado) => {
          return dado.id !== id;
        })
      );
    })
    .catch(function (error) {
      mensagemErro(`Erro ao excluir hospedagem`);
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
      <Card title='Listagem de hospedagens'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
                >
                Nova hospedagem
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Check-in</th>
                    <th scope='col'>Check-out</th>
                    <th scope='col'>Hóspede responsável</th>
                    <th scope='col'>Adultos</th>
                    <th scope='col'>Crianças</th>
                    <th scope='col'>Quartos</th>
                    <th scope='col'>Serviços</th>
                    <th scope='col'>Fez reserva?</th>
                    <th scope='col'>Hotel</th>
                    <th scope='col'>Camas Extras</th>
                    <th scope='col'>Itens Extras</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.checkIn.replace(/[-T]/g, " ").replace(/^(\d{4}) (\d{2}) (\d{2})/, "$3/$2/$1")}</td>
                      <td>{dado.checkOut.replace(/[-T]/g, " ").replace(/^(\d{4}) (\d{2}) (\d{2})/, "$3/$2/$1")}</td>
                      <td>{dado.hospede}</td>
                      <td>{dado.adultos}</td>
                      <td>{dado.criancas}</td>
                      <td>{dado.quarto}</td> 
                      <td>{dado.servicos}</td>
                      <td>{dado.reserva}</td>
                      <td>{dado.hotel}</td>
                      <td>
                      {dado.camasExtras !== undefined && (
                          dado.camasExtras.split("\n").map((linha, index) => (
                          <p key={index}>{linha}</p>
                          ))
                        )}
                      </td>
                      <td>
                      {dado.itensExtras !== undefined && (
                          dado.itensExtras.split("\n").map((linha, index) => (
                          <p key={index}>{linha}</p>
                          ))
                        )}
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

export default ListagemHospedagens;
