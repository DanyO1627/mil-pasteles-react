import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProductos } from "../services/productosService";

const InventarioContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

  // nuevo obtener productos
  const obtenerProducto = (id) =>
    productos.find((p) => p.id === Number(id));

  function hayStock(id) {
    const p = productos.find(prod => prod.id === parseInt(id));
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


  return (
  <InventarioContext.Provider
    value={{
      productos,
      cargando,
      error,
      obtenerProducto,
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
