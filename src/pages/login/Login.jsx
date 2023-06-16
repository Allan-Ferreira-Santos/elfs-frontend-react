

import { ImArrowLeft2 } from 'react-icons/im';
import ImgFundo from "../../assets/images/ElfsPretaFBranco.png";
import "../login/Style.css";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetData = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    
    try {
      const obj = {
        email: email,
        password: password
      };
      const response = await api.post('user/login', obj);
     
      console.log(response)

      const token = response.data.token;
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('id', response.data.user._id)
      localStorage.setItem('name', response.data.user.name)
      localStorage.setItem('email', response.data.user.email)
      localStorage.setItem('endereco', response.data.user.endereco)
      localStorage.setItem('password', response.data.user.password)
      localStorage.setItem('token', response.data.token)

      navigate("/");
    } catch (error) {
      if (!error?.response) {
        console.log('erro');
        toast.error("Sem resposta do servidor");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="loginUser" >
      <div className="fundo" />

      <div className="container">
        <div className="login">
          <div>
            <a href="/">
              <ImArrowLeft2 />
            </a>
          </div>
          <div className="imgFundo">
            <img src={ImgFundo} alt="Minha Imagem" />
          </div>

          <div className="input-email">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleSetData}
              placeholder="Email"
            />
          </div>
          <div className="input-senha">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleSetData}
              placeholder="Senha"
            />
          </div>
          <div className="btn-acessar">
            <button type="submit" onClick={handleLogin}>Acessar</button>
          </div>
          <div className="btn-acessar">
            <button type="submit" onClick={() => navigate("/register-user")}>Criar Conta</button>

          </div>
        </div>
      </div>
    </div>
  );
}
