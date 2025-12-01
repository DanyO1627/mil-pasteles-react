import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchProductos,
  crearProducto,
  eliminarProductoBack,
  actualizarProductoBack
} from "../services/productosService";

const InventarioContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ===============================
  // 🔄 Cargar productos desde backend
  // ===============================
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

  // ===============================
  // 🔎 Obtener un producto por ID
  // ===============================
  const obtenerProducto = (id) =>
    productos.find((p) => p.id === Number(id));

  // ===============================
  // ❌ ELIMINAR en backend + estado
  // ===============================
  async function eliminarProducto(id) {
    await eliminarProductoBack(id);
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }

  // ===============================
  // ✏️ ACTUALIZAR producto
  // ===============================
  async function actualizarProducto(id, cambiosFront) {
    const productoBack = {
      nombreProducto: cambiosFront.nombre,
      precio: Number(cambiosFront.precio),
      stock: Number(cambiosFront.stock),
      descripcionProducto: cambiosFront.descripcion,
      descripcionLarga: cambiosFront.descripcion,
      imagenUrl: cambiosFront.imagen,
      categoria: cambiosFront.categoriaId
        ? { id: Number(cambiosFront.categoriaId) }
        : null,
      activo: true
    };

    const actualizado = await actualizarProductoBack(id, productoBack);

    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              nombre: actualizado.nombreProducto,
              precio: actualizado.precio,
              stock: actualizado.stock,
              descripcion: actualizado.descripcionProducto,
              descripcion_larga: actualizado.descripcionLarga,
              imagen: actualizado.imagenUrl,
              categoriaId: actualizado.categoria?.id ?? null
            }
          : p
      )
    );
  }

  // ===============================
  // 🟡 Productos huérfanos (sin categoría)
  // ===============================
  const productosHuerfanos = () =>
    productos.filter((p) => !p.categoriaId);

  // ===============================
  // 🔍 Stock
  // ===============================
  function hayStock(id) {
    const p = productos.find((prod) => prod.id === Number(id));
    return p && p.stock > 0;
  }

  function descontarStock(id) {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === Number(id)
          ? { ...p, stock: p.stock > 0 ? p.stock - 1 : 0 }
          : p
      )
    );
  }

  return (
    <InventarioContext.Provider
      value={{
        productos,
        cargando,
        error,

        obtenerProducto,
        eliminarProducto,
        actualizarProducto,
        productosHuerfanos,
        hayStock,
        descontarStock
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
