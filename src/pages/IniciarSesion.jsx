import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registro&login.css";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { correo, clave } = form;

    if (!correo || !clave) {
      return setMsg("⚠️ Por favor completa todos los campos.");
    }

    // ========== DETECCIÓN AUTOMÁTICA ==========
    // 1️⃣ Verificar si es empleado/admin (dominio @milsabores.cl)
    if (correo.includes("@milsabores.cl")) {
      const administradores = JSON.parse(
        localStorage.getItem("dataAdministradores") || "[]"
      );

      const adminEncontrado = administradores.find((a) => a.email === correo);

      if (!adminEncontrado) {
        return setMsg("❌ No existe una cuenta de empleado con este correo.");
      }

      if (adminEncontrado.clave !== clave) {
        return setMsg("❌ Contraseña incorrecta.");
      }

      // ✅ Login exitoso como empleado/admin
      const adminConAcceso = {
        ...adminEncontrado,
        ultimoAcceso: new Date().toLocaleString(),
      };

      // Actualizar último acceso en localStorage
      const adminActualizados = administradores.map((a) =>
        a.email === correo ? adminConAcceso : a
      );
      localStorage.setItem(
        "dataAdministradores",
        JSON.stringify(adminActualizados)
      );

      // Guardar sesión activa
      localStorage.setItem("adminActivo", JSON.stringify(adminConAcceso));

      setMsg(`✅ Bienvenido/a ${adminEncontrado.nombre}!`);

      setTimeout(() => {
        navigate("/admin/perfil");
      }, 1500);

      return;
    }

    // 2️⃣ Si no es empleado, buscar en clientes registrados
    const usuarios = JSON.parse(localStorage.getItem("usuariosExtra") || "[]");
    const usuarioEncontrado = usuarios.find((u) => u.email === correo);

    if (!usuarioEncontrado) {
      return setMsg("❌ No existe una cuenta registrada con este correo.");
    }

    if (usuarioEncontrado.clave !== clave) {
      return setMsg("❌ Contraseña incorrecta.");
    }

    // ✅ Login exitoso como cliente
    setMsg(`✅ Inicio de sesión exitoso, bienvenido/a ${usuarioEncontrado.nombre}!`);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // 🔄 NUEVO: Botón para restaurar todo el sistema (incluye administradores)
  const handleResetCompleto = () => {
    const confirmar = window.confirm(
      "⚠️ Esto restaurará TODAS las categorías, productos y administradores a sus valores iniciales.\n\n¿Deseas continuar?"
    );
    if (confirmar) {
      // Elimina datos guardados
      localStorage.removeItem("dataAdministradores");
      localStorage.removeItem("adminActivo");
      localStorage.removeItem("usuarioActivo");
      localStorage.removeItem("categorias");
      localStorage.removeItem("inventario");
      localStorage.removeItem("usuariosExtra");
      

      alert("✅ Sistema restaurado. Recarga la página para aplicar los cambios.");
      window.location.reload();
    }
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

          {/* 🔄 Botón restaurar */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              type="button"
              onClick={handleResetCompleto}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              🔄 Restaurar Todo
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