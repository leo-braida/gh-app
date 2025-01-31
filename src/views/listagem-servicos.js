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

const baseURL = `${BASE_URL3}/agendas`;
const baseURLGrupos = `${BASE_URL3}/gruposPorAgenda`;
const baseURLHorarios = `${BASE_URL3}/horarios`;
const baseURLTrabalhadores = `${BASE_URL3}/trabalhadores`;
const baseURLServicos = `${BASE_URL3}/servicos`;

function ListagemServicos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate('/cadastro-servico');
  };

  const editar = (id) => {
    navigate(`/cadastro-servico/${id}`);
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

  const [grupos, setGrupos] = React.useState(null);
  const [horarios, setHorarios] = React.useState(null);
  const [trabalhadores, setTrabalhadores] = React.useState(null);
  const [servicos, setServicos] = React.useState(null);
  
  React.useEffect(() => {
    Promise.all([
    axios.get(baseURL),
    axios.get(baseURLGrupos),
    axios.get(baseURLHorarios),
    axios.get(baseURLTrabalhadores),
    axios.get(baseURLServicos)
    ])
    .then((responses) => {
        setDados(responses[0].data);
        setGrupos(responses[1].data);
        setHorarios(responses[2].data);
        setTrabalhadores(responses[3].data);
        setServicos(responses[4].data);
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
                Nova agenda
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Serviço</th>
                    <th scope='col'>Descrição do serviço</th>
                    <th scope='col'>Dias</th>
                    <th scope='col'>Horários</th>
                    <th scope='col'>Funcionários</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>
                        {
                          servicos.find((servico) => servico.id === dado.idServico).nome
                        }
                      </td>
                      <td>
                        {
                          servicos.find((servico) => servico.id === dado.idServico).descricao
                        }
                      </td>
                      <td>
                        {dado.dias}
                      </td>
                      <td>
                        {horarios
                          .filter((horario) => horario.idAgenda === dado.id)
                          .map((horario) => {
                            return(
                              <div key={horario.id}>
                                {horario.horarioInicio} - {horario.horarioFim}
                              </div>
                            )
                          })
                        }
                      </td>
                      <td>
                        {grupos
                          .filter((grupo) => grupo.idAgenda === dado.id)
                          .map((grupo) => { 
                            const trabalhadorDoServico = trabalhadores.find((trabalhador) => trabalhador.id === grupo.idTrabalhador);
                            return (
                              <div key={trabalhadorDoServico.id}>
                                {trabalhadorDoServico.nome}
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

export default ListagemServicos;
