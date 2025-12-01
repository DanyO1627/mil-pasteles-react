import { createContext, useContext, useState, useEffect } from "react";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../services/categoriasService";

const CategoriasContext = createContext();

export function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

<<<<<<< HEAD
  // CARGAR DESDE BACKEND - VERSIÓN DE CONY 
=======
  // ===============================
  // 🔄 Cargar desde backend
  // ===============================
>>>>>>> 9f3896e1553bc79815cb25e58a7c6689df2a2a27
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

  // ===============================
  // CRUD
  // ===============================
  const agregarCategoria = async (nueva) => {
    const creada = await createCategoria(nueva);
    setCategorias((prev) => [...prev, creada]);
    return creada;
  };

  const actualizarCategoriaContext = async (id, cambios) => {
    const actualizada = await updateCategoria(id, cambios);
    setCategorias((prev) =>
      prev.map((c) => (c.id === id ? actualizada : c))
    );
    return actualizada;
  };

  const eliminarCategoriaContext = async (id) => {
    await deleteCategoria(id);
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
        existeCategoria,
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
