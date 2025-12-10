import { useState } from "react";
import "../styles/base.css";

export default function PerfilCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    region: usuario?.region || "",
    comuna: usuario?.comuna || ""
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const guardarCambios = () => {
    const actualizado = { ...usuario, ...form };
    localStorage.setItem("usuarioActivo", JSON.stringify(actualizado));
    alert("Datos actualizados!");
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "/iniciar-sesion";
  };

  if (!usuario) {
    return <p>Debes iniciar sesión.</p>;
  }

  return (
    <main className="perfil">
      <h1>Mi Perfil</h1>

      <label>Nombre</label>
      <input name="nombre" value={form.nombre} onChange={onChange} />

      <label>Email</label>
      <input name="email" value={form.email} disabled />

      <label>Región</label>
      <input name="region" value={form.region} onChange={onChange} />

      <label>Comuna</label>
      <input name="comuna" value={form.comuna} onChange={onChange} />

      <button className="btn btn-guardar" onClick={guardarCambios}>
        Guardar cambios
      </button>

      <button className="btn btn-cerrar" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </main>
  );
}
