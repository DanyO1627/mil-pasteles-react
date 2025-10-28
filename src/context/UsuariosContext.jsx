// para que los usuarios se estándaricen y se sincronicen con el localStorage. 
// con esto el localstorage se actualiza solo, 
// el crud es independiente de los productos , carrito etc
// se puede usar el user usuarios () en registro, usuarios, usuarios registrados, etidtar usuarios y todo eso. 

import { createContext, useContext, useState, useEffect } from "react";
import dataUsuarios from "../data/dataUsuarios";

const STORAGE_KEY = "pasteleria_usuarios";
const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  // si hay usuarios guardados los carga, sino usa los base
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem(STORAGE_KEY);
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      // inicializa localStorage con los usuarios base
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUsuarios));
      return dataUsuarios;
    }
  });

  // ✅ sincroniza automáticamente los cambios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
  }, [usuarios]);
  // EL CRUD DE LOS USUARIOS (LAS FUNCIONES QUE LUEGO SE LLAMAN)

    const agregarUsuario = (nuevo) => {
    const usuario = {
        id: "USR" + Date.now(),
        nombre: nuevo.nombre,
        email: nuevo.email,
        clave: nuevo.clave,
        rol: nuevo.rol || "cliente",
        fecha: new Date().toISOString().slice(0, 10),
        origen: "nuevo", // 🔹 marca los nuevos
    };

    setUsuarios((prev) => [...prev, usuario]);
    };


  // por id (no por indice)
  const editarUsuario = (id, cambios) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              ...cambios,
              // Mantiene contraseñas anteriores si no se cambian
              clave: cambios.clave || u.clave,
            }
          : u
      )
    );
  };

  const eliminarUsuario = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  const obtenerUsuario = (id) => {
    return usuarios.find((u) => u.id === id);
  };

  const resetearUsuarios = () => {
    setUsuarios([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        agregarUsuario,
        editarUsuario,
        eliminarUsuario,
        obtenerUsuario,
        resetearUsuarios,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

// Hook personalizado
export const useUsuarios = () => useContext(UsuariosContext);