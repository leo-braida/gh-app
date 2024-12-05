import React from 'react';

import Card from '../components/card';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListagemTiposCama() {


  const [dados, setDados] = React.useState(null);

  return (
    <div className='container'>
      <Card title='Listagem dos Tipos de Camas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                class='btn btn-warning'
                //onClick={() => cadastrar()}
                >
                Novo tipo de quarto
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Quantidade</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                {/*<tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.tipo}</td>
                      <td>{dado.quantidade}</td>
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
                </tbody> */}
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemTiposCama;
