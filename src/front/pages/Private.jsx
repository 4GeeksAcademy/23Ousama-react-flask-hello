import React, { useEffect } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import "../pages/index.css";

export const Private = () => {
    const { store, actions } = useGlobalReducer();

    useEffect(() => {
        if (store.token) {
            actions.getMessage();
        }
    }, [store.token]);

    return (
        <div className="text-center mt-5">
            <h1>Página Privada</h1>
            {store.token ? (
                <>
                    <p>¡Bienvenido! Has accedido a contenido exclusivo.</p>
                    <p className="alert alert-info">{store.message || "Cargando contenido..."}</p>
                    <p>Tu token: <code>{store.token}</code></p>
                </>
            ) : (
                <p>Redirigiendo al inicio de sesión...</p>
            )}
        </div>
    );
};