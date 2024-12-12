import React from 'react';

import Card from '../components/card';



import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/hospedagens`;

function ListagemHospedagens() {
  const navigate = useNavigate();

  /*const cadastrar = () => {
    navigate('/cadastro-tipoDeCama');
  };*/

  /*const editar = (id) => {
    navigate('/cadastro/tipoDeCama/${id}');
  };*/

  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
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
                //onClick={() => cadastrar()}
                >
                Nova hospedagem
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Check-in</th>
                    <th scope='col'>Check-out</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.checkIn}</td>
                      <td>{dado.checkOut}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            //onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          
                          <IconButton
                            aria-label='delete'
                            //onClick={() => excluir(dado.id)}
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
