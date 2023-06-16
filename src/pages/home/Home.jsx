import "../home/Style.css";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import api from "../../services/api";
import AppBar from "../../components/appbar/Appbar";
import Card from "../../components/card/Cards";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        listProducts();
    }, []);

    const listProducts = async () => {
        try {
            const response = await api.get('produto/');
            setProducts(response.data.produtos);
        } catch (error) {
            if (!error?.response) {
                console.log('erro');
                toast.error("Sem resposta do servidor");
            } else {
                toast.error(error.response.data.message);
            }
        }
    };

    console.log(products); // Add this console log

    return (
        <>
            <AppBar></AppBar>
            <div className="home">
                <nav className="container">
                    <h1>Seja Bem-Vindo a nossa Loja</h1>
                    <p>Os melhores produtos feitos para você</p>
                    <div className="row catalago">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                url={product.image}
                                name={product.name}
                                preco={product.preco}
                            />
                        ))}
                    </div>
                </nav>
            </div>
        </>
    );
}
