import { createContext, useContext, useEffect, useState } from "react";
import {
  getUsuarios,
  loginUsuario,
  updateUsuario,
  deleteUsuario,
} from "../services/usuariosApi";

const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // CARGAR USUARIOS DESDE EL BACKEND
  useEffect(() => {
    async function cargar() {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  // OBTENER USUARIO POR ID
  const obtenerUsuario = (id) =>
    usuarios.find((u) => String(u.id) === String(id));

  // REGISTRAR USUARIO 
  const agregarUsuario = async (data) => {
    try {
      const nuevo = await fetch("http://localhost:9090/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());

      setUsuarios([...usuarios, nuevo]);
      return nuevo;
    } catch (err) {
      console.error("Error registrando usuario:", err);
    }
  };

  // EDITAR USUARIO
  const editarUsuario = async (id, datosActualizados) => {
    try {
      const actualizado = await updateUsuario(id, datosActualizados);

      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? actualizado : u))
      );

      return actualizado;
    } catch (err) {
      console.error("Error actualizando usuario:", err);
    }
  };

  // ELIMINAR USUARIO
  const eliminarUsuario = async (id) => {
    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error eliminando usuario:", err);
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        cargando,
        obtenerUsuario,
        agregarUsuario,
        editarUsuario,
        eliminarUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}

export const useUsuarios = () => useContext(UsuariosContext);
