import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "../../styles/global.css";

export default function UsuariosRegistrados() {
  const [usuarios, setUsuarios] = useState([]);

  // Leer usuarios desde localStorage
useEffect(() => {
  const cargarUsuarios = () => {
    const datos = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(datos);
  };

  cargarUsuarios();

  //  Si el usuario vuelve desde editarUsuario, recarga automáticamente
  window.addEventListener("storage", cargarUsuarios);

  return () => window.removeEventListener("storage", cargarUsuarios);
}, []);

  //  Eliminar un usuario
  const eliminarUsuario = (index) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      const actualizados = usuarios.filter((_, i) => i !== index);
      setUsuarios(actualizados);
      localStorage.setItem("usuarios", JSON.stringify(actualizados));
    }
  };

  return (
    <main className="registro-wrapper">
      <div className="container">
        <h1 className="page-title">
          Lista de usuarios registrados en el sistema.
        </h1>
        <p>Usuarios Registrados Recientemente.</p>

        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados aún.</p>
        ) : (
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Edad</th>
                <th>Acciones</th> {/*  nueva columna */}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={i}>
                  <td>{u.fecha || new Date().toLocaleDateString()}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{u.edad}</td>
                  <td>
                    {/* Ir al editor */}
                    <Link
                      to={`/editarUsuario?index=${i}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Editar
                    </Link>

                    {/*  Botón eliminar */}
                   <button
                      className="btn-eliminar"
                        onClick={() => eliminarUsuario(i)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}