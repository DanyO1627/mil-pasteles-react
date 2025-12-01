import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/usuariosApi";
import "../styles/registro&login.css";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { correo, clave } = form;

    if (!correo || !clave) {
      return setMsg("⚠️ Por favor completa todos los campos.");
    }

    try {
      // el login ahora usa el backend
      const user = await loginUsuario({ email: correo, clave });

      // guarda SOLO SI es activa
      localStorage.setItem("usuarioActivo", JSON.stringify(user));

      setMsg(`✅ Bienvenido/a ${user.nombre}!`);

      // si es admin te manda para el admin, si no te deja en home
      setTimeout(() => {
        if (user.rol === "admin") {
          navigate("/adminHome");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      setMsg("❌ Correo o contraseña incorrectos.");
    }
  };

  return (
    <main className="login-wrapper">
      <div className="container">
        <h1 className="page-title">Iniciar sesión</h1>

        {msg && <p id="mensaje">{msg}</p>}

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
            />
            <small style={{ marginTop: "5px", display: "block", color: "#666" }}>
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
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn-primary">
              Ingresar
            </button>
          </div>

          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <a
              href="/registrarse"
              style={{ color: "#d8a1a7", textDecoration: "none" }}
            >
              ¿No tienes cuenta? Regístrate aquí
            </a>
          </div>
        </form>
      </div>

      
    </main>
  );
}
