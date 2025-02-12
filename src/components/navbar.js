import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem.js';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          GH
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-tipos-cama'
              label='Tipos de Cama'
            />
          </ul>
        </div>
        {/* Falta completar com os href após fazer as rotas */}
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-hoteis'
              label='Hotéis'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-cama'
              label='Camas por Hotel'
              />
          </ul>
         </div>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-tipos-quarto'
              label='Tipos de Quartos'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-servicos'
              label='Serviços'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-itens'
              label='Itens'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-quartos'
              label='Quartos'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-hospedes'
              label='Hóspedes'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-reservas'
              label='Reservas'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-hospedagens'
              label='Hospedagens'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-agendamentos'
              label='Agendamentos'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-cargo'
              label='Cargos'
              />
          </ul>
         </div>
         <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-trabalhadores'
              label='Trabalhadores'
              />
          </ul>
         </div>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/cadastro-reserva'
              label='Fazer reserva'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
