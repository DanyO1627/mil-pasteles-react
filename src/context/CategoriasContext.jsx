import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../services/categoriasService";

const CategoriasContext = createContext();

export function CategoriasProvider({ children }) {

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ===============================
  // 🔄 Cargar desde backend
  // ===============================
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error cargando categorías", err);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  // ===============================
  // CRUD
  // ===============================
  const agregarCategoria = async (nueva) => {
    const creada = await crearCategoria(nueva);
    setCategorias((prev) => [...prev, creada]);
    return creada;
  };

  const actualizarCategoriaContext = async (id, cambios) => {
    const actualizada = await actualizarCategoria(id, cambios);
    setCategorias((prev) =>
      prev.map((c) => (c.id === id ? actualizada : c))
    );
    return actualizada;
  };

  const eliminarCategoriaContext = async (id) => {
    await eliminarCategoria(id);
    setCategorias((prev) => prev.filter((c) => c.id !== id));
  };

  // ===============================
  // Utilidades
  // ===============================
  const obtenerCategoria = (id) =>
    categorias.find((c) => c.id === Number(id));

  const obtenerCategoriaPorNombre = (nombre) =>
    categorias.find((c) => c.nombre === nombre);

  const categoriasActivas = () =>
    categorias.filter((c) => c.activo);

  const contarProductosPorCategoria = (productos, categoriaId) =>
    productos.filter((p) => p.categoriaId === categoriaId).length;

  const existeCategoria = (id) =>
    categorias.some((c) => c.id === Number(id));

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        cargando,

        agregarCategoria,
        actualizarCategoria: actualizarCategoriaContext,
        eliminarCategoria: eliminarCategoriaContext,

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
