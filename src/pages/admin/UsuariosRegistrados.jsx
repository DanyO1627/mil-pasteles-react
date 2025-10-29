import { useEffect, useState } from "react";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import { Link } from "react-router-dom";
import "../../styles/global.css";

// ✅ Lee en tiempo real los usuarios desde el contexto.
// ✅ Muestra la lista completa de usuarios registrados.
// ✅ Refleja cualquier cambio (agregar, editar, eliminar).
export default function UsuariosRegistrados() {
  const { usuarios, eliminarUsuario } = useUsuarios();
  const [showToast, setShowToast] = useState(false);

  return (
    <main className="registro-wrapper">
      <div className="container">
        <h1 className="page-title">
          Lista de usuarios registrados en el sistema.
        </h1>
        <p>Usuarios Registrados Recientemente.</p>

        <Link
          to={`/adminHome`}
          className="btn btn-sm btn-outline-primary me-2"
        >
          Volver al Dashboard
        </Link>

        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados aún.</p>
        ) : (
          <>
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Edad</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={u.id || i}>
                    <td>{u.fecha || new Date().toLocaleDateString()}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email || u.correo}</td>
                    <td>{u.edad || "—"}</td>
                    <td>{u.estado || "Activo"}</td>
                    <td>
                      {/* BTN EDITAR */}
                      <Link
                        to={`/editarUsuario?id=${u.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Editar
                      </Link>

                      {/* BTN ELIMINAR */}
                      <button
                        className="btn-eliminar"
                        onClick={() => {
                          eliminarUsuario(u.id);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 2000);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 🔽 Botón para volver al inicio 🔽 */}
            <div className="volver-inicio">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn btn-sm btn-outline-secondary mt-4"
              >
                ⬆ Volver al inicio
              </button>
            </div>
          </>
        )}

        {showToast && (
          <div className="toast-noti toast-exito">
            Usuario eliminado correctamente
          </div>
        )}
      </div>
    </main>
  );
}