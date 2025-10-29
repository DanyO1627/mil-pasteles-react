import React, { createContext, useState, useContext } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // ✅ Agregar producto o aumentar cantidad
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

      if (existe) {
        // Si ya está, aumentar cantidad si hay stock
        if (existe.cantidad < producto.stock) {
          return prev.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        } else {
          alert("No hay más stock disponible de este producto.");
          return prev;
        }
      } else {
        // Si no está, agregar con cantidad inicial = 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // ✅ Disminuir cantidad (y eliminar si llega a 0)
  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // ✅ Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // ✅ Cantidad total de productos
  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  // ✅ Precio total
  const precioTotal = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
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
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
