import { useEffect, useState } from "react";
import { useUsuarios } from "../../context/UsuariosContext.jsx"; // import de los contextusuario
import { Link } from "react-router-dom"; 
import "../../styles/global.css";


// acá leemos en tiempo real los usuarios desde el usuarioCOntext, sin depender del localstorage. 
// acá tmb mostramos la lista de usuarios registrados desde el contexto (useUsuarios())
// se refleja cualquier cambio (agregar, editar o eliminar)

export default function UsuariosRegistrados() {
  // Con esto obtenemos los datos y funciones del contexto
  const { usuarios, eliminarUsuario } = useUsuarios(); // la lita y la función elimianr
  const [showToast, setShowToast] = useState(false);



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
                <th>Acciones</th> {/* acá los botones*/}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={u.id || i}>
                  {/* Fecha: si no existe, se muestra la fecha actual */}
                  <td>{u.fecha || new Date().toLocaleDateString()}</td>

                  {/* Datos principales */}
                  <td>{u.nombre}</td>
                  <td>{u.email || u.correo}</td>
                  <td>{u.edad || "—"}</td>
                  <td>{u.estado} </td>

                  {/* Botones de acción */}
                  <td>
                    {/* BTN EDITAR */}
                    <Link to={`/editarUsuario?id=${u.id}`} className="btn btn-sm btn-outline-primary me-2">
                     Editar
                    </Link>

                    {/* BTN ELMINAIR USUARIO */}
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