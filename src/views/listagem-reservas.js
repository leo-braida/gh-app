import React from 'react';

import Card from '../components/card';



import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL_RESERVAS } from '../config/axios';

const baseURL = `${BASE_URL_RESERVAS}/reservas`;
const baseURLHospede = `${BASE_URL_RESERVAS}/hospedes`
const baseURLHospedeNaReserva = `${BASE_URL_RESERVAS}/hospedesNaReserva`
const baseURLTipoDeQuartoNaReserva = `${BASE_URL_RESERVAS}/tipoDeQuartosNaReserva`
const baseURLTipoDeQuarto = `${BASE_URL_RESERVAS}/tipoDeQuartos`


function ListagemReservas() {
  const navigate = useNavigate();

  /*const cadastrar = () => {
    navigate('/cadastro-tipoDeCama');
  };*/

  /*const editar = (id) => {
    navigate('/cadastro/tipoDeCama/${id}');
  };*/

  const [dados, setDados] = React.useState(null);

  const [hospedes, setHospedes] = React.useState(null);
  const [hospedesNaReserva, setHospedesNaReserva] = React.useState(null);
  const [tipoDeQuartosNaReserva, setTipoDeQuartosNaReserva] = React.useState(null);
  const [tipoDeQuartos, setTipoDeQuarto] = React.useState(null);

  React.useEffect(() => {
    Promise.all([
    axios.get(baseURL),
    axios.get(baseURLHospede),
    axios.get(baseURLHospedeNaReserva),
    axios.get(baseURLTipoDeQuartoNaReserva),
    axios.get(baseURLTipoDeQuarto)
    
    ])
    .then((responses) => {
        setDados(responses[0].data);
        setHospedes(responses[1].data);
        setHospedesNaReserva(responses[2].data);
        setTipoDeQuartosNaReserva(responses[3].data);
        setTipoDeQuarto(responses[4].data);
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
                //onClick={() => cadastrar()}
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
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.dataChegada}</td>
                      <td>{dado.dataSaida}</td>
                      <td>
                        {hospedesNaReserva
                          .filter((hospedeNaReserva) => hospedeNaReserva.idReserva === dado.id)
                          .map((hospedeNaReserva) => {
                            const hospede = hospedes.find((h) => h.id === hospedeNaReserva.idHospede);
                            return (
                              <div key={hospedeNaReserva.id}>
                                {hospede.nome}
                              </div>
                            );
                          })}
                      </td>
                      <td>
                        {tipoDeQuartosNaReserva
                          .filter((tipoReserva) => tipoReserva.idReserva === dado.id)
                          .map((tipoReserva) => {
                            const tipoQuarto = tipoDeQuartos.find((tq) => tq.id === tipoReserva.idTipoDeQuarto);
                            return (
                              <div key={tipoReserva.id}>
                                {tipoQuarto.tipo}
                              </div>
                            );
                          })}
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

export default ListagemReservas;
