import React from 'react';

import ListagemTiposDeCama from './views/listagem-tipos-cama';
import CadastroTipoDeCama from './views/cadastro-tipo-cama';
import ListagemTiposQuarto from './views/listagem-tipos-quarto';
import ListagemServicos from './views/listagem-servicos';
import ListagemItens from './views/listagem-itens';

import {Route, Routes, BrowserRouter} from 'react-router-dom';

function Rotas(props){
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/cadastro-tipos-cama/:idParam?'
          element={<CadastroTipoDeCama />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
