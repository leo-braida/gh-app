import React from 'react';

import Card from '../components/card';



import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL_HOSPEDAGENS, BASE_URL_QUARTOS} from '../config/axios';

const baseURL = `${BASE_URL_QUARTOS}/hospedagens`;
const baseURLHospedes = `${BASE_URL_HOSPEDAGENS}/hospedes`;
const baseURLServicos = `${BASE_URL_HOSPEDAGENS}/servicos`;
const baseURLItens = `${BASE_URL_HOSPEDAGENS}/itens`;
const baseURLItensNaHospedagem = `${BASE_URL_HOSPEDAGENS}/itensNaHospedagem`;
const baseURLServicosNaHospedagem = `${BASE_URL_HOSPEDAGENS}/servicosNaHospedagem`;
const baseURLQuartos = `${BASE_URL_QUARTOS}/quartos`;
const baseURLTipoQuartos = `${BASE_URL_QUARTOS}/tipoDeQuartos`;
const baseURLQuartosNaHospedagem = `${BASE_URL_QUARTOS}/quartosNaHospedagem`;
const baseURLReservas = `${BASE_URL_QUARTOS}/reservas`;

function ListagemHospedagens() {
  const navigate = useNavigate();

  /*const cadastrar = () => {
    navigate('/cadastro-tipoDeCama');
  };*/

  /*const editar = (id) => {
    navigate('/cadastro/tipoDeCama/${id}');
  };*/


  const [dados, setDados] = React.useState(null);

  const [hospedes, setHospedes] = React.useState(null);
  const [servicos, setServicos] = React.useState(null);
  const [itens, setItens] = React.useState(null);
  const [itensNaHospedagem, setItensNaHospedagem] = React.useState(null);
  const [servicosNaHospedagem, setServicosNaHospedagem] = React.useState(null);
  const [quartos, setQuartos] = React.useState(null);
  const [tipoQuartos, setTipoQuartos] = React.useState(null);
  const [quartosNaHospedagem, setQuartosNaHospedagem] = React.useState(null);
  const [reservas, setReservas] = React.useState(null);

  React.useEffect(() => {
    Promise.all([
    axios.get(baseURL),
    axios.get(baseURLHospedes),
    axios.get(baseURLServicos),
    axios.get(baseURLItens),
    axios.get(baseURLItensNaHospedagem),
    axios.get(baseURLServicosNaHospedagem),
    axios.get(baseURLQuartos),
    axios.get(baseURLTipoQuartos),
    axios.get(baseURLQuartosNaHospedagem),
    axios.get(baseURLReservas)
    ])
    .then((responses) => {
        setDados(responses[0].data);
        setHospedes(responses[1].data);
        setServicos(responses[2].data);
        setItens(responses[3].data);
        setItensNaHospedagem(responses[4].data);
        setServicosNaHospedagem(responses[5].data);
        setQuartos(responses[6].data);
        setTipoQuartos(responses[7].data);
        setQuartosNaHospedagem(responses[8].data);
        setReservas(responses[9].data);
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
                //onClick={() => cadastrar()}
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
                    <th scope='col'>Itens usados</th>
                    <th scope='col'>Reserva</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.checkIn}</td>
                      <td>{dado.checkOut}</td>
                      <td>{hospedes.find((hospede) => hospede.id === dado.idHospede).nome}</td>
                      <td>{dado.adultos}</td>
                      <td>{dado.criancas}</td>
                      <td>
                        {quartosNaHospedagem
                          .filter((quartoNaHospedagem) => quartoNaHospedagem.idHospedagem === dado.id)
                          .map((quartoNaHospedagem) => {
                            const quartoNaHosp = quartos.find((quarto) => quarto.id === quartoNaHospedagem.idQuarto);
                            const tipoQuarto = tipoQuartos.find((tipoQuarto) => tipoQuarto.id === quartoNaHosp.idTipoDeQuarto);
                            return (
                              <div key={quartoNaHosp.id}>
                                {quartoNaHospedagem.quantidade}x {tipoQuarto.tipo}
                              </div>
                            )
                          })
                        }
                      </td>
                      <td>
                        {servicosNaHospedagem
                          .filter((servicoNaHospedagem) => servicoNaHospedagem.idHospedagem === dado.id)
                          .map((servicoNaHospedagem) => {
                            const servNaHosp = servicos.find((servico) => servico.id === servicoNaHospedagem.idServico);
                            return (
                              <div key={servNaHosp.id}>
                              {servicoNaHospedagem.quantidade}x {servNaHosp.nome}
                              </div>
                            )
                          })
                        }
                      </td>
                        {itensNaHospedagem
                          .filter((itemNaHospedagem) => itemNaHospedagem.idHospedagem === dado.id)
                          .map((itemNaHospedagem) => {
                            const itemNaHosp = itens.find((item) => item.id === itemNaHospedagem.idItem);
                            return (
                              <div key={itemNaHosp.id}>
                              {itemNaHospedagem.quantidade}x {itemNaHosp.nome}
                              </div>
                            )
                          })
                        }
                      <td>
                        {reservas
                          .filter((reserva) => reserva.id == dado.idReserva)
                          .map((reserva) => {
                            return(
                              <div key={reserva.id}>
                                {reserva.id}
                              </div>
                            )
                          })
                        }
                      </td>
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
