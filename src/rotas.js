import React from 'react';

import ListagemTiposDeCama from './views/listagem-tipos-cama';

import CadastroTipoDeCama from './views/cadastro-tipo-cama';

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
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
