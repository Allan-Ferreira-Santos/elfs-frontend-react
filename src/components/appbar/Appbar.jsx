import Logo from "../../../src/assets/images/elfsfc.png";
import LogoText from "../../assets/icons/elfstexticon.svg";

import "../appbar/Style.css";

import { AiOutlineSearch } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from "../../services/api";

export default function Appbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('token');

        navigate("/login");
    };
    const handleSearch = async () => {
        try {
            const response = await api.get(`produto/search?name=${searchTerm}`);
            console.log(response.data);

        } catch (error) {
            if (!error?.response) {
                console.log('erro');
                toast.error("Sem resposta do servidor");
            } else {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className="row appBar">
            <div className="col-xl-3 logo">
                <a href="/">
                    <img src={Logo} alt="Minha Imagem" />
                    <img src={LogoText} alt="Minha Imagem" />
                </a>
            </div>

            <div className='col-xl-6 search-input-container'>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AiOutlineSearch className="search-icon" onClick={handleSearch} />
            </div>

            {localStorage.getItem('token') ? (
                <div className="col-xl-3 button">
                    <p>
                        Seja Bem-Vindo <strong>{localStorage.getItem('name')}</strong>
                    </p>
                    <div className="exit">
                        <MdExitToApp onClick={handleLogout} />
                    </div>
                    <div className="confg">
                        <IoMdSettings onClick={() => navigate("/settings")} />
                    </div>
                </div>
            ) : (
                <div className="col-xl-3 button">
                    <button onClick={() => navigate("/login")}>Entrar</button>
                </div>
            )}
        </div>
    );
}
