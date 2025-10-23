import React, { createContext, useState, useContext } from 'react';
import { useProductos } from './InventarioContext';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const { descontarStock } = useProductos();

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find((item) => item.id === producto.id);
      const stockDisponible = producto.stock ?? 0;

      // Si ya existe, verificamos que no supere el stock
      if (itemExistente) {
        if (itemExistente.cantidad >= stockDisponible) {
          alert("❌ No puedes agregar más unidades. No hay stock suficiente.");
          return prevCarrito; // no cambia el carrito
        }

        // Si aún hay stock, aumentamos cantidad
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // Si no existe en el carrito y hay stock
      if (stockDisponible > 0) {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }

      alert("❌ Este producto no tiene stock disponible.");
      return prevCarrito;
    });
  };


const disminuirCantidad = (productoId) => {
  setCarrito((prevCarrito) => {
    const item = prevCarrito.find((p) => p.id === productoId);
    if (!item) return prevCarrito;

    if (item.cantidad > 1) {
      return prevCarrito.map((p) =>
        p.id === productoId ? { ...p, cantidad: p.cantidad - 1 } : p
      );
    }

    // si llega a 1 y se resta, se elimina
    return prevCarrito.filter((p) => p.id !== productoId);
  });
};



  const eliminarDelCarrito = (itemId) => {
    setCarrito((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const procesarCompra = () => {
    if (carrito.length === 0) {
      return { success: false, message: 'El carrito está vacío' };
    }

    try {
      carrito.forEach((item) => {
        descontarStock(item.id, item.cantidad);
      });

      vaciarCarrito();

      return {
        success: true,
        message: 'Compra realizada con éxito. Stock actualizado.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al procesar la compra. Intenta nuevamente.',
      };
    }
  };

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const precioTotal = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        procesarCompra,
        disminuirCantidad,
        cantidadTotal,
        precioTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('Error en useCarrito. Se debe usar dentro de CarritoProvider');
  }
  return context;
}
