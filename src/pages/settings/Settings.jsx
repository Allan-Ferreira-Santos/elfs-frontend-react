import "../settings/Style.css";
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from "../../services/api";
import AppBar from "../../components/appbar/Appbar";
import { useNavigate } from 'react-router-dom';


export default function Setting() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        endereco: localStorage.getItem('endereco'),
        password: localStorage.getItem('password')
    });

    const userId = localStorage.getItem('id');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.patch(`/user/${userId}`, formData);
            localStorage.setItem('id', response.data.user._id)
            localStorage.setItem('name', response.data.user.name)
            localStorage.setItem('email', response.data.user.email)
            localStorage.setItem('endereco', response.data.user.endereco)
            localStorage.setItem('password', response.data.user.password)
            localStorage.setItem('token', response.data.token)
            toast.success('Dados atualizados com sucesso!');
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error('Erro ao atualizar os dados do cliente.');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await api.delete(`/user/${userId}`);
            toast.success('Conta excluída com sucesso!');

            navigate("/login")
        } catch (error) {
            toast.error('Erro ao excluir a conta do cliente.');
        }
    };

    return (
        <>
            <AppBar />
            <div className="settings">
                <nav className="container">
                    <h1>Atualize seu cadastro</h1>

                    <div>
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Dados Pessoais</h2>

                            <div className="form-group">
                                <label>Nome Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Endereço</label>
                                <input
                                    type="text"
                                    name="endereco"
                                    placeholder="Endereço"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="form-group col-xl-2">
                                    <button type="submit">Atualizar</button>
                                </div>
                                <div className="form-group col-xl-2 delete">
                                    <button type="button" onClick={handleDeleteAccount}>
                                        Deletar Conta
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
        </>
    );
}
