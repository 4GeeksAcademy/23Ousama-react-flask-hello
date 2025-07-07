import React, { useState } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import "../pages/index.css";

export const Signup = () => {
    const { store, actions } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.signup(email, password);
        if (success) {
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigate("/login");
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Registro</h1>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
            {store.message && <p className="mt-3 text-danger">{store.message}</p>}
        </div>
    );
};