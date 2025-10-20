import React, { createContext, useContext, useState, useEffect } from "react";
import initialProductos from "../data/dataProductos";

const InventarioContext = createContext();

const STORAGE_KEY = "pasteleria_inventario";

export function ProductosProvider({ children }) {
  // Inicializar desde LocalStorage o usar datos iniciales
  const [productos, setProductos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const productosGuardados = JSON.parse(stored);
        
        // validar que tengan id valido
        const productosValidados = productosGuardados.map(prod => {
          if (!prod.categoriaId || prod.categoriaId === 0) {
            console.warn(`⚠️ Producto "${prod.nombre}" sin categoría válida`);
            return { ...prod, categoriaId: null };
          }
          return prod;
        });
        
        return productosValidados;
      }
      
      // guardar datos iniciales // SI SE EDITA DE DATAPRODUCTOS, TENGO UN BOTON EN GESTIONAR CATEGORIAS
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProductos));
      return initialProductos;
    } catch (error) {
      console.error("Error cargando productos:", error);
      return initialProductos;
    }
  });

  // sincroniza el localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    } catch (error) {
      console.error("Error guardando productos:", error);
    }
  }, [productos]);

  // CRUD
  
  const agregarProducto = (nuevo) => {
    const nuevoProducto = { 
      ...nuevo, 
      id: Date.now(),
      stock: nuevo.stock || 0,
      categoriaId: nuevo.categoriaId || null // ✅ ASEGURAR que tenga categoriaId
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

  // GESTIOANR STOCK

  // descontar stock cuando se haga compra
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

  // establecer stock
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

  //reasignar productos sin categoria
  const reasignarProductosHuerfanos = (categoriaIdDestino = null) => {
    let contadorReasignados = 0;
    setProductos((prev) =>
      prev.map((prod) => {
        if (!prod.categoriaId || prod.categoriaId === 0) {
          contadorReasignados++;
          return { ...prod, categoriaId: categoriaIdDestino };
        }
        return prod;
      })
    );
    return contadorReasignados;
  };

  // obtener productos sin categoría
  const productosHuerfanos = () => {
    return productos.filter((p) => !p.categoriaId || p.categoriaId === 0);
  };

  // resetear a datos iniciales
  const resetearInventario = () => {
    setProductos(initialProductos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProductos));
    alert("✅ Inventario restaurado a valores iniciales");
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
        reasignarProductosHuerfanos, // ✅ NUEVA
        productosHuerfanos, // ✅ NUEVA
        resetearInventario,
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