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


const baseURL = `${BASE_URL}/tiposDeQuarto`;

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
    let url = `${baseURL}/${id}`;
    console.log(url)
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
    })
    .then(function (response) {
      mensagemSucesso(`Tipo de quarto excluído com sucesso!`);
      setDados(
        dados.filter((dado) => {
          return dado.id !== id;
        })
      );
    })
    .catch(function (error) {
      mensagemErro(`Erro ao excluir tipo de quarto`);
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
                    <th scope='col'>Quantidade de adultos</th>
                    <th scope='col'>Quantidade de crianças</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.tipo}</td>
                      <td>{dado.quantidadeTotal}</td>
                      <td>{dado.preco.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                      <td>
                        {dado.camas.split("\n").map((linha, index) => (
                          <p key={index}>{linha}</p>
                        ))}
                      </td>
                      <td>
                        {dado.itens.split("\n").map((linha, index) => (
                          <p key={index}>{linha}</p>
                        ))}
                      </td>
                      <td>{dado.quantidadeAdultos}</td>
                      <td>{dado.quantidadeCriancas}</td>
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
