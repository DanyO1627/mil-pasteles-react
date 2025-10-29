import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/IniciarSesion.logic.js";
import "../styles/registro&login.css";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm(window.IniciarSesionLogic.onChange(form, e));

  const onSubmit = (e) => {
    e.preventDefault();
    const res = window.IniciarSesionLogic.onSubmit(form, localStorage, navigate);
    setMsg(res.mensaje);
  };

  // 🔄 NUEVO: Botón para restaurar todo el sistema (incluye administradores)
  const handleResetCompleto = () => {
    window.IniciarSesionLogic.handleResetCompleto(
      localStorage,
      window.confirm,
      window.alert,
      () => window.location.reload()
    );
  };





  return (
    <main className="login-wrapper">
      <div className="container">
        <h1 className="page-title">Iniciar sesión</h1>

        {msg && <p id="mensaje" role="status">{msg}</p>}

        <form id="loginForm" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="correo@ejemplo.cl"
              value={form.correo}
              onChange={onChange}
              autoComplete="email"
            />
            <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
              💡 Empleados: usar correo @milsabores.cl
            </small>
          </div>

          <div className="field">
            <label htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              name="clave"
              type="password"
              placeholder="********"
              value={form.clave}
              onChange={onChange}
              autoComplete="current-password"
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn-primary">
              Ingresar
            </button>
          </div>



          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <a
              href="/registro"
              style={{ color: "#d8a1a7", textDecoration: "none" }}
            >
              ¿No tienes cuenta? Regístrate aquí
            </a>
          </div>
        </form>
      </div>

      {/* Botón oculto para restaurar sistema (por lo de los admin que están en data) */}
      <button
        type="button"
        onClick={handleResetCompleto}
        className="btn-reset-total"
        title="Restaurar datos del sistema"
      >
        🔄
      </button>


    </main>
  );
}