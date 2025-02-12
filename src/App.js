import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Navbar from './components/navbar.js';
import Rotas from './rotas.js';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Rotas />
        <Navbar />
      </div>
    );
  }
}

export default App;

/*
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
