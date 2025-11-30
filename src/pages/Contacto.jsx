import React, { useState } from 'react';
import "../utils/Contacto.logic.js";
import logo from "../assets/logo.png";
import "../styles/style.css";
export default function Contacto() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contenido, setContenido] = useState("");
    const [mensaje, setMensaje] = useState(null);

    const validarFormulario = () => {
        const res = window.ContactoLogic.validarFormulario(nombre, email, contenido);

        if (res.tipo === "error") {
            setMensaje(res);
        } else {
            setMensaje(res);
            const reset = window.ContactoLogic.resetFormulario();
            setNombre(reset.nombre);
            setEmail(reset.email);
            setContenido(reset.contenido);

            // Redirección
            setTimeout(() => {
                window.location.href = window.ContactoLogic.getRedirectUrl();
            }, 1000);
        }
    };

    return (
        <main className="contacto-wrapper">
            <img src={logo} alt="Logo de la tienda" className="contacto-logo" />
            <h1 className="contacto-titulo">Pastelería Mil Sabores</h1>

            <div className="contacto-contenedor">
                {mensaje && (
                    <div
                        className={`contacto-alert ${mensaje.tipo === "error"
                            ? "contacto-alert-error"
                            : "contacto-alert-exito"
                            }`}
                    >
                        <ul>
                            {mensaje.texto.map((m, i) => (
                                <li key={i}>{m}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form
                    className="contacto-formulario"
                    onSubmit={(e) => {
                        e.preventDefault();
                        validarFormulario();
                    }}
                >
                    <h2 className="contacto-subtitulo">Formulario de Contacto</h2>

                    <div className="contacto-campo">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="contacto-campo">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="contacto-campo">
                        <label htmlFor="contenido">Contenido</label>
                        <textarea
                            id="contenido"
                            rows="6"
                            placeholder="Escribe tu mensaje aquí..."
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="contacto-boton">
                        Enviar
                    </button>
                </form>
            </div>
        </main>
    );
}
