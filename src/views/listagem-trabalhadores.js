import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL_TRABALHADORES } from '../config/axios';

const baseURL = `${BASE_URL_TRABALHADORES}/trabalhadores`;
const baseURLHoteis = `${BASE_URL_TRABALHADORES}/hoteis`;
const baseURLHotelDoTrabalhador = `${BASE_URL_TRABALHADORES}/hotelDoTrabalhador`;


function ListagemTrabalhadores() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-trabalhador`);
  };

  const editar = (id) => {
    navigate(`/cadastro-trabalhador/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id){
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url)
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json'},
    })
    .then(function (response) {
      mensagemSucesso(`Trabalhador excluído com sucesso!`);
      setDados(
        dados.filter((dado) => {
          return dado.id !== id;
        })
      );
    })
    .catch(function (error) {
      mensagemErro(`Erro ao excluir Trabalhador`);
    });
  }

  const [hoteis, setHoteis] = React.useState(null);
  const [hotelDoTrabalhador, setHotelDoTrabalhador] = React.useState(null);

  React.useEffect(() => {
    Promise.all([
    axios.get(baseURL),
    axios.get(baseURLHoteis),
    axios.get(baseURLHotelDoTrabalhador)
    
    ])
    .then((responses) => {
        setDados(responses[0].data);
        setHoteis(responses[1].data);
        setHotelDoTrabalhador(responses[2].data);
      })
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de trabalhadores'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
                >
                Novo trabalhador
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Cargo</th>
                    <th scope='col'>Telefone</th>
                    <th scope='col'>Hotel do Trabalhador</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.cargo}</td>
                      <td>{dado.telefone}</td>
                      <td>
                        {hotelDoTrabalhador
                          .filter((hotelTrabalhador) => hotelTrabalhador.idHotel === dado.id)
                          .map((hotelTrabalhador) => {
                            const hotel = hoteis.find(h => h.id === hotelTrabalhador.idHotel);
                            return (
                              <div key={hotelTrabalhador.id}>
                                {hotel?.nome || "Hotel não encontrado"}
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

export default ListagemTrabalhadores;
