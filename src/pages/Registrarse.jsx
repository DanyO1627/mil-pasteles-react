import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Registrarse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    edad: "",
    clave1: "",
    clave2: "",
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, edad, clave1, clave2 } = form;

    if (!nombre || !correo || !edad || !clave1 || !clave2) {
      return setMsg("Por favor completa todos los campos.");
    }
    if (Number(edad) < 18) {
      return setMsg("Debes ser mayor de edad para registrarte.");
    }
    if (clave1 !== clave2) {
      return setMsg("Las contraseñas no coinciden.");
    }

    const nuevoUsuario = {
      nombre,
      correo,
      edad,
      fecha: new Date().toLocaleDateString(),
    };

   
    const usuariosExistentes =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    
    const listaActualizada = [...usuariosExistentes, nuevoUsuario];

    
    localStorage.setItem("usuarios", JSON.stringify(listaActualizada));

    setMsg(`¡Registro exitoso! Bienvenido/a, ${nombre}.`);

 
    setTimeout(() => {
      navigate("/usuarios");
    }, 1000);
  };

  return (
    <main className="registro-wrapper">
      <div className="container">
        <h1 className="page-title">Crear cuenta</h1>
        {msg && <p id="mensajes">{msg}</p>}

        <form id="nuevoUsuario" onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="nombre">Nombre completo</label>
              <input id="nombre" name="nombre" type="text" onChange={onChange} />
            </div>

            <div className="field">
              <label htmlFor="correo">Correo electrónico</label>
              <input id="correo" name="correo" type="email" onChange={onChange} />
            </div>

            <div className="field">
              <label htmlFor="edad">Edad</label>
              <input id="edad" name="edad" type="number" min="0" onChange={onChange} />
            </div>

            <div className="field">
              <label htmlFor="clave1">Contraseña</label>
              <input id="clave1" name="clave1" type="password" onChange={onChange} />
            </div>

            <div className="field">
              <label htmlFor="clave2">Confirmar contraseña</label>
              <input id="clave2" name="clave2" type="password" onChange={onChange} />
            </div>
          </div>

          <div className="actions">
            <button className="btn-primary" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
