import React from 'react';
import api from '../config/api';
import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';

import '../custom.css';

function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = React.useState('');
    const [senha, setSenha] = React.useState('');

    const logar = async () => {
        try {
            const response = await api.post(`/usuarios/auth`, {
                login: login,
                senha: senha
            });

            localStorage.setItem('token', response.data.token);

            mensagemSucesso(`Bem-vindo, ${login}!`);
            navigate('/listagem-hoteis');
        } catch (error) {
            if (error.response && error.response.status === 401 || error.response.status === 403) {
                mensagemErro('Credenciais inválidas.');
            } else {
                mensagemErro('Ocorreu um erro inesperado ao tentar realizar o login. Por favor, tente novamente mais tarde.');
            }
        };
    }

    const cancelar = () => {
        setLogin('');
        setSenha('');
        navigate('/');
    };

    return (
        <div className="container">
            <Card title="Login">
                <Stack spacing={2}>
                    <FormGroup label="Login" htmlFor="inputLogin">
                        <input
                            type="Login"
                            id="inputLogin"
                            className="form-control"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Senha" htmlFor="inputSenha">
                        <input
                            type="password"
                            id="inputSenha"
                            className="form-control"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </FormGroup>
                    <button
                        className="btn btn-primary"
                        onClick={logar}
                    >
                        Entrar
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={cancelar}
                    >
                        Cancelar
                    </button>
                </Stack>
            </Card>
        </div>
    );
}

export default Login;
