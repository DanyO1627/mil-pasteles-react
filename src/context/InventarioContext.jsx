import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchProductos,
  crearProducto,
  eliminarProductoBack,
  actualizarProductoBack,
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
        // fetchProductos ya devuelve datos normalizados
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
  const obtenerProducto = (id) => productos.find((p) => p.id === Number(id));

  // ===============================
  // ➕ CREAR producto nuevo
  // ===============================
  async function agregarProducto(productoFront) {
    // Tu servicio crearProducto ya maneja toda la conversión
    const creado = await crearProducto(productoFront);

    // Normalizar respuesta del backend para el estado local
    const nuevoProducto = {
      id: creado.id,
      nombre: creado.nombreProducto,
      precio: creado.precio,
      stock: creado.stock,
      descripcion: creado.descripcionProducto || creado.descripcionLarga || "",
      descripcion_larga: creado.descripcionLarga || "",
      imagen: creado.imagenUrl || "/assets/sin_imagen.webp",
      categoriaId: creado.categoria?.id ?? null,
      categoriaNombre: creado.categoria?.nombre ?? null,
      activo: creado.activo ?? true,
    };

    setProductos((prev) => [...prev, nuevoProducto]);
    return nuevoProducto;
  }

  // ===============================
  // ✏️ ACTUALIZAR producto
  // ===============================
  async function actualizarProducto(id, cambiosFront) {
    // Tu servicio actualizarProductoBack ya maneja la conversión
    const actualizado = await actualizarProductoBack(id, cambiosFront);

    // Actualizar el estado local con datos normalizados
    setProductos((prev) =>
      prev.map((p) =>
        p.id === Number(id)
          ? {
              id: actualizado.id,
              nombre: actualizado.nombreProducto,
              precio: actualizado.precio,
              stock: actualizado.stock,
              descripcion: actualizado.descripcionProducto || actualizado.descripcionLarga || "",
              descripcion_larga: actualizado.descripcionLarga || "",
              imagen: actualizado.imagenUrl || "/assets/sin_imagen.webp",
              categoriaId: actualizado.categoria?.id ?? null,
              categoriaNombre: actualizado.categoria?.nombre ?? null,
              activo: actualizado.activo ?? true,
            }
          : p
      )
    );

    return actualizado;
  }

  // ===============================
  // ❌ ELIMINAR en backend + estado
  // ===============================
  async function eliminarProducto(id) {
    await eliminarProductoBack(id);
    setProductos((prev) => prev.filter((p) => p.id !== Number(id)));
  }

  // ===============================
  // 🟡 Productos huérfanos (sin categoría)
  // ===============================
  const productosHuerfanos = () => productos.filter((p) => !p.categoriaId);

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
        p.id === Number(id) ? { ...p, stock: Math.max(0, p.stock - 1) } : p
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
        agregarProducto,        // ✅ AHORA EXPUESTA
        actualizarProducto,
        eliminarProducto,
        productosHuerfanos,
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