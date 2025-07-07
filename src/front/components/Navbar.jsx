import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate(); // Obtén la función de navegación

    const handleLogout = () => {
        actions.logout(); // Ejecuta la acción de logout para limpiar el token
        navigate("/login"); // Redirige explícitamente a la página de login
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1 ms-3">Auth App</span>
            </Link>
            <div className="ml-auto me-3">
                {!store.token ? (
                    <>
                        <Link to="/signup">
                            <button className="btn btn-primary me-2">Registro</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn btn-success">Iniciar Sesión</button>
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
                )}
            </div>
        </nav>
    );
};