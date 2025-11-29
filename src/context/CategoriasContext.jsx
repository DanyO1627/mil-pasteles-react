import { createContext, useContext, useState, useEffect } from "react";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from "../services/categoriasApi";

const CategoriasContext = createContext();

export function CategoriasProvider({ children }) {

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // CARGAR LAS CATEGORÍAS DEL BACKEND
  useEffect(() => {
    (async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error cargando categorías", err);
      } finally {
        setCargando(false);
      }
    })();
  }, []);


  // CRUD DEL BACKEND
  const agregarCategoria = async (nueva) => {
    const creada = await createCategoria(nueva);
    setCategorias((prev) => [...prev, creada]);
    return creada;
  };

  const actualizarCategoria = async (id, cambios) => {
    const actualizada = await updateCategoria(id, cambios);
    setCategorias((prev) =>
      prev.map((c) => (c.id === id ? actualizada : c))
    );
    return actualizada;
  };

  const eliminarCategoria = async (id) => {
    await deleteCategoria(id);
    setCategorias((prev) => prev.filter((c) => c.id !== id));
  };


 // FUNCIONES

  const obtenerCategoria = (id) => {
    return categorias.find((c) => c.id === Number(id));
  };

  const obtenerCategoriaPorNombre = (nombre) => {
    return categorias.find((c) => c.nombre === nombre);
  };

  const categoriasActivas = () => {
    return categorias.filter((c) => c.activo);
  };

  const contarProductosPorCategoria = (productos, categoriaId) => {
    return productos.filter((p) => p.categoriaId === categoriaId).length;
  };

  const existeCategoria = (id) => {
    return categorias.some((c) => c.id === Number(id));
  };


  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        cargando,

        agregarCategoria,
        actualizarCategoria,
        eliminarCategoria,

        obtenerCategoria,
        obtenerCategoriaPorNombre,
        categoriasActivas,
        contarProductosPorCategoria,
        existeCategoria
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}

export function useCategorias() {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error("useCategorias debe usarse dentro de CategoriasProvider");
  }
  return context;
}
