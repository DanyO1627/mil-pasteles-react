import { useState } from "react";
import "../styles/global.css";

export default function IniciarSesion() {
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { correo, clave } = form;

    if (!correo || !clave) {
      return setMsg("Por favor completa todos los campos.");
    }

    setMsg(`Inicio de sesión exitoso, bienvenido/a ${correo.split("@")[0]}!`);
  };

  return (
    <main className="login-wrapper">
      <div className="container">
        <h1 className="page-title">Iniciar sesión</h1>

        {msg && <p id="mensaje" role="status">{msg}</p>}

        <form id="loginForm" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="correo">Correo o usuario</label>
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="correo@ejemplo.cl"
              onChange={onChange}
            />
          </div>

          <div className="field">
            <label htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              name="clave"
              type="password"
              placeholder="********"
              onChange={onChange}
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn-primary">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
