import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/StyleGlobal.css";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routes";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App() {
    return (
        <div className='paginacao'>
            <BrowserRouter>
                <Routes />
                <ToastContainer/>
            </BrowserRouter>
        </div>
    );
}
