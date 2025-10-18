import React, { useState } from 'react'
import logo from "../assets/logo.png";
import "../styles/style.css"

export default function Contacto() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contenido, setContenido] = useState("");
    const [mensaje, setMensaje] = useState(null); // para mostrar errores o éxito

    const validarFormulario = () => {
        const errores = [];

        // Validar nombre
        if (nombre.trim() === "") {
            errores.push("El nombre no puede estar vacío.");
        }

        // Validar correo
        if (!email.includes("@")) {
            errores.push("El correo electrónico no es válido.");
        }

        // Validar contenido
        if (contenido.trim() === "") {
            errores.push("El mensaje no puede estar vacío.");
        }

        // Mostrar mensajes
        if (errores.length > 0) {
            setMensaje({
                tipo: "error",
                texto: errores,
            });
        } else {
            setMensaje({
                tipo: "exito",
                texto: ["✅ Envío exitoso"],
            });

            // Opcional: limpiar los campos después del envío
            setNombre("");
            setEmail("");
            setContenido("");
        }
    };
    return (
        <main className="contacto-page">
            <img src={logo} alt="Logo de la tienda" className="logo-formulario-img" />
            <h1>Pastelería Mil Sabores</h1>

            <div className="container mt-5">
                {/* Mensajes dinámicos */}
                {mensaje && (
                    <div
                        className={`alert ${mensaje.tipo === "error" ? "alert-danger" : "alert-success"
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
                    onSubmit={(e) => {
                        e.preventDefault(); // evita recargar la página
                        validarFormulario();
                    }}
                >
                    <h2 className="mb-4">Formulario de Contacto</h2>

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contenido" className="form-label">
                            Contenido
                        </label>
                        <textarea
                            id="contenido"
                            className="form-control"
                            rows="6"
                            placeholder="Escribe tu mensaje aquí..."
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Enviar
                    </button>
                </form>
            </div>
        </main>
    )
}
