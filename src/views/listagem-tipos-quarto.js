import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL, BASE_URL_QUARTOS } from '../config/axios';

const baseURL = `${BASE_URL}/tipoDeQuartos`;
const baseURLTipoCama = `${BASE_URL}/tipoDeCama`;
const baseURLTipoCamaNoQuarto = `${BASE_URL}/tipoCamaNoQuarto`;
const baseURLItens = `${BASE_URL}/itens`;
const baseURLItemNoQuarto = `${BASE_URL}/itemNoQuarto`;

const baseURLNova = `${BASE_URL_QUARTOS}/tipoDequartos`;

function ListagemTiposQuarto() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-tipos-quarto`);
  };

  const editar = (id) => {
    navigate(`/cadastro-tipos-quarto/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURLNova}/${id}`;
    console.log(url)
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
      mensagemSucesso(`Serviço excluído com sucesso!`);
      setDados(
        dados.filter((dado) => {
          return dado.id !== id;
        })
      );
    })
    .catch(function (error) {
      mensagemErro(`Erro ao excluir serviço`);
    });
  }
  
  const [tiposDeCama, setTiposDeCama] = React.useState(null);
  const [tiposCamaNoQuarto, setTiposCamaNoQuarto] = React.useState(null);
  const [itens, setItens] = React.useState(null);
  const [itensNoQuarto, setItensNoQuarto] = React.useState(null);
  
  
  React.useEffect(() => {
    Promise.all([
    axios.get(baseURLNova),
    axios.get(baseURLTipoCama),
    axios.get(baseURLTipoCamaNoQuarto),
    axios.get(baseURLItens),
    axios.get(baseURLItemNoQuarto)
    ])
    .then((responses) => {
        setDados(responses[0].data);
        setTiposDeCama(responses[1].data);
        setTiposCamaNoQuarto(responses[2].data);
        setItens(responses[3].data);
        setItensNoQuarto(responses[4].data);
      })
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem dos Tipos de Quartos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
                >
                Novo tipo de quarto
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Quantidade Total</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Camas</th>
                    <th scope='col'>Itens</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.tipo}</td>
                      <td>{dado.quantidadeTotal}</td>
                      <td>{dado.preco}</td>
                      <td>
                        {tiposCamaNoQuarto
                          .filter((camaNoQuarto) => camaNoQuarto.idQuarto === dado.id)
                          .map((camaNoQuarto) => {
                            const cama = tiposDeCama.find((tipo) => tipo.id === camaNoQuarto.idTipoCama);
                            return (
                              <div key={camaNoQuarto.id}>
                                {camaNoQuarto.quantidadeCama}x {cama.tipo}
                              </div>
                            )
                          })
                        }
                      </td>
                      <td>
                        {itensNoQuarto
                          .filter((itemNoQuarto) => itemNoQuarto.idQuarto === dado.id)
                          .map((itemNoQuarto) => {
                            const item = itens.find((itemDaLista) => itemDaLista.id === itemNoQuarto.idQuarto);
                            return (
                              <div key={itemNoQuarto.id}>
                                {itemNoQuarto.quantidade}x {item.nome}
                              </div>
                            )
                          })
                        }
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

export default ListagemTiposQuarto;
