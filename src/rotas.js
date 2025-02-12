import React from 'react';

import ListagemTiposDeCama from './views/listagem-tipos-cama';
import ListagemTiposQuarto from './views/listagem-tipos-quarto';
import ListagemServicos from './views/listagem-servicos';
import ListagemItens from './views/listagem-itens';
import ListagemQuartos from './views/listagem-quartos';
import ListagemHospedes from './views/listagem-hospedes';
import ListagemReservas from './views/listagem-reservas';
import ListagemHospedagens from './views/listagem-hospedagens';
import ListagemAgendamentos from './views/listagem-agendamentos';
import ListagemTrabalhadores from './views/listagem-trabalhadores';
import ListagemHoteis from './views/listagem-hoteis';
import ListagemCargo from './views/listagem-cargo';
import ListagemCama from './views/listagem-cama';
import CadastroTipoCama from './views/cadastro-tipo-cama';
import CadastroHotel from './views/cadastro-hotel';
import CadastroItem from './views/cadastro-itens';
import CadastroHospede from './views/cadastro-hospedes';
import CadastroServico from './views/cadastro-servico';
import CadastroTiposQuarto from './views/cadastro-tipos-quarto';
import CadastroTrabalhador from './views/cadastro-trabalhador';
import CadastroQuarto from './views/cadastro-quarto';
import CadastroReserva from './views/cadastro-reserva';
import CadastroAgendamento from './views/cadastro-agendamento';
import CadastroHospedagem from './views/cadastro-hospedagem';
import CadastroCargo from './views/cadastro-cargo';
import CadastroCama from './views/cadastro-cama';


import {Route, Routes, BrowserRouter} from 'react-router-dom';

function Rotas(props){
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/cadastro-cama/:idParam?'
          element={<CadastroCama />}
        />

        <Route
          path='/cadastro-cargo/:idParam?'
          element={<CadastroCargo />}
        />

        <Route
          path='/cadastro-hospedagem/:idParam?'
          element={<CadastroHospedagem />}
        />

        <Route
          path='/cadastro-agendamento/:idParam?'
          element={<CadastroAgendamento />}
        />

        <Route
          path='/cadastro-reserva/:idParam?'
          element={<CadastroReserva />}
        />

        <Route
          path='/cadastro-quarto/:idParam?'
          element={<CadastroQuarto />}
        />

        <Route
          path='/cadastro-trabalhador/:idParam?'
          element={<CadastroTrabalhador />}
        />

        <Route
          path='/cadastro-tipo-cama/:idParam?'
          element={<CadastroTipoCama />}
        />

        <Route
          path='/cadastro-hotel/:idParam?'
          element={<CadastroHotel />}
        />

        <Route
          path='/cadastro-itens/:idParam?'
          element={<CadastroItem />}
        />
        
        <Route
          path='cadastro-hospede/:idParam?'
          element={<CadastroHospede />}
        />

        <Route
          path='cadastro-servico/:idParam?'
          element={<CadastroServico />}
        />

        <Route
          path='cadastro-tipos-quarto/:idParam?'
          element={<CadastroTiposQuarto />}
        />

        <Route
          path='/listagem-cama'
          element={<ListagemCama />}
        />

        <Route
          path='/listagem-cargo'
          element={<ListagemCargo />}
        />

        <Route
          path='/listagem-tipos-cama'
          element={<ListagemTiposDeCama />}
        />

        <Route
          path='/listagem-tipos-quarto/:idParam?'
          element={<ListagemTiposQuarto />}
        />

        <Route
          path='/listagem-servicos/:idParam?'
          element={<ListagemServicos />}
        />

        <Route
          path='/listagem-itens/:idParam?'
          element={<ListagemItens />}
        />

        <Route
          path='/listagem-quartos/:idParam?'
          element={<ListagemQuartos />}
        />
        <Route
          path='/listagem-hospedes/:idParam?'
          element={<ListagemHospedes />}
        />
        <Route
          path='/listagem-reservas/:idParam?'
          element={<ListagemReservas />}
        />
        <Route
          path='/listagem-hospedagens/:idParam?'
          element={<ListagemHospedagens />}
        />
        <Route
          path='/listagem-agendamentos/:idParam?'
          element={<ListagemAgendamentos />}
        />
        <Route
          path='/listagem-trabalhadores/:idParam?'
          element={<ListagemTrabalhadores />}
        />
        <Route
          path='/listagem-hoteis/:idParam?'
          element={<ListagemHoteis />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
