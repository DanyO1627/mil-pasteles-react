import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchProductos,
  eliminarProductoBack,
  actualizarProductoBack,
} from "../services/productosService";

const InventarioContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ============================
  // 🔄 CARGAR DESDE BACKEND
  // ============================
  useEffect(() => {
    async function cargar() {
      try {
        const data = await fetchProductos();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar productos");
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  // ============================
  // 🔍 OBTENER 1 PRODUCTO
  // ============================
  const obtenerProducto = (id) =>
    productos.find((p) => p.id === Number(id));

  // ============================
  // ❌ ELIMINAR PRODUCTO (backend + estado)
  // ============================
  async function eliminarProducto(id) {
    try {
      await eliminarProductoBack(id);

      setProductos((prev) => prev.filter((p) => p.id !== id));

    } catch (err) {
      console.error("❌ Error al eliminar producto:", err);
      throw err;
    }
  }

  // ============================
  // ✏️ ACTUALIZAR PRODUCTO (backend + estado)
  // ============================
  async function actualizarProducto(id, datosActualizados) {
    try {
      const actualizadoBack = await actualizarProductoBack(id, datosActualizados);

      // Actualizar el estado local
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? actualizadoBack : p))
      );

    } catch (err) {
      console.error("❌ Error al actualizar producto:", err);
      throw err;
    }
  }

  // ============================
  // 🏪 UTILIDADES EXISTENTES
  // ============================
  function hayStock(id) {
    const p = productos.find((prod) => prod.id === parseInt(id));
    return p && p.stock > 0;
  }

  function descontarStock(id) {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === parseInt(id)
          ? { ...p, stock: p.stock > 0 ? p.stock - 1 : 0 }
          : p
      )
    );
  }

  // ============================
  // PROVIDER
  // ============================
  return (
    <InventarioContext.Provider
      value={{
        productos,
        cargando,
        error,
        obtenerProducto,
        eliminarProducto,
        actualizarProducto,
        hayStock,
        descontarStock,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}

export function useProductos() {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de ProductosProvider");
  }
  return context;
}
