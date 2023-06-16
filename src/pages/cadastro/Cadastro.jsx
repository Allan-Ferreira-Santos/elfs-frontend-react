import React, { useState } from 'react';
import { ImArrowLeft2 } from 'react-icons/im';
import '../cadastro/Style.css';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '../../services/api';

export default function RegisterUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        endereco: '',
        typeUser: 'false'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);

        try {
            await api.post('/user', formData);

            navigate('/');
        } catch (error) {
            if (!error?.response) {
                console.log('erro');
                toast.error('Sem resposta do servidor');
            } else {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <div className="register">
            <div className="content">
                <div className="section">
                    <div className="row title">
                        <div className="col-xl-1">
                            <a href="/login">
                                <ImArrowLeft2 />
                            </a>
                        </div>
                        <div className="col-xl-11">
                            <h1>Cadastro</h1>
                        </div>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <h2>Dados Pessoais</h2>

                        <div className="form-group">
                            <label>Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Nome"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Endereço</label>
                            <input
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleInputChange}
                                placeholder="Endereço"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Senha"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
