import { useState } from "react";
import "../styles/style.css";

export default function IniciarSesion() {
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { correo, clave } = form;

    if (!correo || !clave) {
      return setMsg("⚠️ Por favor completa todos los campos.");
    }

    // Obtener los usuarios registrados desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuariosExtra") || "[]");

    // Buscar usuario por correo
    const usuarioEncontrado = usuarios.find(u => u.email === correo);

    if (!usuarioEncontrado) {
      return setMsg("❌ No existe una cuenta registrada con este correo.");
    }

    // Validar contraseña
    if (usuarioEncontrado.clave !== clave) {
      return setMsg("❌ Contraseña incorrecta.");
    }

    // Si pasa las validaciones → éxito
    setMsg(`✅ Inicio de sesión exitoso, bienvenido/a ${usuarioEncontrado.nombre}!`);

    // Guardar sesión en localStorage (opcional)
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    // Redirigir (ejemplo: a la página principal)
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
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
            <button type="submit" className="btn-primary">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
