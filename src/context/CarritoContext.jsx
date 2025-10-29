import React, { createContext, useState, useContext } from "react";
import { useProductos } from "./InventarioContext";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const { descontarStock, hayStock } = useProductos();

  // ✅ Agregar al carrito (sumando cantidad si ya existe)
  const agregarAlCarrito = (producto) => {
    // Verificar si hay stock disponible
    if (!hayStock(producto.id, 1)) {
      alert(`Lo sentimos, "${producto.nombre}" no tiene stock disponible por el momento.`);
      return false;
    }

    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      let nuevoCarrito;

      if (existe) {
        // Si ya está en el carrito, aumenta la cantidad
        nuevoCarrito = prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no está, agrégalo con cantidad = 1
        nuevoCarrito = [...prev, { ...producto, cantidad: 1, itemId: Date.now() }];
      }

      return nuevoCarrito;
    });

    return true;
  };

  // ✅ Disminuir cantidad (si llega a 0, lo elimina)
  const disminuirCantidad = (id) => {
    setCarrito((prev) => {
      const nuevoCarrito = prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0);
      return nuevoCarrito;
    });
  };

  // ✅ Eliminar producto directamente
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // ✅ Calcular totales
  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const precioTotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  // ✅ Procesar compra: descuenta stock según cantidad
  const procesarCompra = () => {
    if (carrito.length === 0) {
      return { success: false, message: "El carrito está vacío" };
    }

    try {
      carrito.forEach((item) => {
        descontarStock(item.id, item.cantidad);
      });

      vaciarCarrito();

      return {
        success: true,
        message: "Compra realizada con éxito. Stock actualizado.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al procesar la compra. Intenta nuevamente.",
      };
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        procesarCompra,
        cantidadTotal,
        precioTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

// Hook de uso
export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
