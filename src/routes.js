import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home/Home";
import Login from "./pages/login/Login";
import RegisterUser from "./pages/cadastro/Cadastro";
import Settings from "./pages/settings/Settings";

export default function App() {
    return (

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register-user" element={<RegisterUser/>} />
            <Route path="/settings" element={<Settings/>} />
        </Routes>

    );
}
