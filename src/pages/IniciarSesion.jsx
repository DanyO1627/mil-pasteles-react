import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/usuariosApi";
import { useAuth } from "../context/AuthContext";
import "../styles/registro&login.css";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", clave: "" });
  const [msg, setMsg] = useState("");
  const { login } = useAuth();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, clave } = form;

    if (!email || !clave) {
      return setMsg("⚠️ Por favor completa todos los campos.");
    }

    try {
      // el login ahora usa el backend

      const user = await login(email, clave);

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
      setMsg("❌ email o contraseña incorrectos.");
    }
  };




  // guarda SOLO SI es activa
  // localStorage.setItem(
  //   "usuarioActivo",
  //   JSON.stringify({
  //     id: user.id,
  //     nombre: user.nombre,
  //     email: user.email,
  //     rol: user.rol,
  //     token: user.token
  //   })
  // );

  


return (
  <main className="login-wrapper">
    <div className="container">
      <h1 className="page-title">Iniciar sesión</h1>

      {msg && <p id="mensaje">{msg}</p>}

      <form id="loginForm" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@ejemplo.cl"
            value={form.email}
            onChange={onChange}
          />
          <small style={{ marginTop: "5px", display: "block", color: "#666" }}>
            💡 Empleados: usar email @milsabores.cl
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
