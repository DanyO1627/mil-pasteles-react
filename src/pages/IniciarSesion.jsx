import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

export default function IniciarSesion() {
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { correo, clave } = form;

    if (!correo || !clave) {
      return setMsg("⚠️ Por favor completa todos los campos.");
    }

    const usuarios = JSON.parse(localStorage.getItem("usuariosExtra") || "[]");
    const usuarioEncontrado = usuarios.find((u) => u.email === correo);

    if (!usuarioEncontrado) {
      return setMsg("❌ No existe una cuenta registrada con este correo.");
    }

    if (usuarioEncontrado.clave !== clave) {
      return setMsg("❌ Contraseña incorrecta.");
    }

    // Si llega aquí, el login fue exitoso
    setMsg(`✅ Inicio de sesión exitoso, bienvenido/a ${usuarioEncontrado.nombre}!`);

    // Guardar sesión
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    // Redirección condicional según dominio
    setTimeout(() => {
      if (correo.includes("@milsabores.cl")) {
        navigate("/adminHome");
      } else {
        navigate("/");
      }
    }, 1000);
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
              value={form.correo}
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
              value={form.clave}
              onChange={onChange}
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn-primary">Ingresar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
