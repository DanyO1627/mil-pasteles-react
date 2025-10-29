import React, { createContext, useContext, useState, useEffect } from "react";
import initialProductos from "../data/dataProductos";
import { useCategorias } from "./CategoriasContext";
const InventarioContext = createContext();

const STORAGE_KEY = "pasteleria_inventario";

export function ProductosProvider({ children }) {
  const { existeCategoria } = useCategorias();
  // Inicializar desde LocalStorage o usar datos iniciales
  const [productos, setProductos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // guardar datos iniciales /1vez
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProductos));
      return initialProductos;
    } catch (error) {
      console.error("Error cargando productos:", error);
      return initialProductos;
    }
  });

  // Sincroniza el localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    } catch (error) {
      console.error("Error guardando productos:", error);
    }
  }, [productos]);

  useEffect(() => {
  const productosValidados = productos.map((p) => {
    if (!p.categoriaId || !existeCategoria(p.categoriaId)) {
      console.warn(`⚠️ Producto "${p.nombre}" tenía categoría inválida. Se movió a "Sin categoría".`);
      return { ...p, categoriaId: null };
    }
    return p;
  });
    setProductos(productosValidados);
  }, []);

  // CRUD
  
  const agregarProducto = (nuevo) => {
    const nuevoProducto = { 
      ...nuevo, 
      id: Date.now(),
      stock: nuevo.stock || 0 
    };
    setProductos((prev) => [nuevoProducto, ...prev]);
  };

  const actualizarProducto = (id, cambios) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, ...cambios } : prod
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((prod) => prod.id !== id));
  };

  // ===== GESTIÓN DE STOCK =====

  // Descontar stock (para compras)
  const descontarStock = (id, cantidad = 1) => {
    setProductos((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const nuevoStock = Math.max(0, (prod.stock || 0) - cantidad);
          return { ...prod, stock: nuevoStock };
        }
        return prod;
      })
    );
  };

  // ajustar stock
  const ajustarStock = (id, diferencia) => {
    setProductos((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const nuevoStock = Math.max(0, (prod.stock || 0) + diferencia);
          return { ...prod, stock: nuevoStock };
        }
        return prod;
      })
    );
  };

// Establecer stock
  const establecerStock = (id, nuevoStock) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, stock: Math.max(0, nuevoStock) } : prod
      )
    );
  };

 

  // producto por id
  const obtenerProducto = (id) => {
    return productos.find((p) => p.id === Number(id));
  };

  // stock crítico
  const productosCriticos = (umbral = 7) => {
    return productos.filter((p) => (p.stock ?? 0) <= umbral);
  };

  // ve si hay stock
  const hayStock = (id, cantidadRequerida = 1) => {
    const producto = obtenerProducto(id);
    return producto && (producto.stock ?? 0) >= cantidadRequerida;
  };
  // Productos sin categoría (huérfanos)
  const productosHuerfanos = () => {
    return productos.filter((p) => !p.categoriaId);
  };
  // Resetear a datos iniciales
  const resetearInventario = () => {
    setProductos(initialProductos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProductos));
  };

  return (
    <InventarioContext.Provider
      value={{
        productos,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
        descontarStock,
        ajustarStock,
        establecerStock,
        obtenerProducto,
        productosCriticos,
        hayStock,
        resetearInventario,
        productosHuerfanos,
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