import React, {createContext, useState, useContext} from 'react';
import { useProductos } from './InventarioContext';

const CarritoContext = createContext();

export function CarritoProvider({children}) {
  const [carrito, setCarrito] = useState([]);
  const { descontarStock, hayStock } = useProductos();

  const agregarAlCarrito = (producto) => {
    // Ver si queda stock
    if (!hayStock(producto.id, 1)) {
      alert(`Lo sentimos, "${producto.nombre}" no tiene stock disponible por el momento.`);
      return false;
    }

    setCarrito(prev => [...prev, { ...producto, itemId: Date.now() }]);
    return true;
  };

  const eliminarDelCarrito = (itemId) => {
    setCarrito(prev => prev.filter(item => item.itemId !== itemId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // para procesar la compra, DESCUENTA STOCK
  const procesarCompra = () => {
    if (carrito.length === 0) {
      return { success: false, message: 'El carrito está vacío' };
    }

    try {
      // descontar stock de cada producto
      carrito.forEach(item => {
        descontarStock(item.id, 1);
      });

      // vaciar el carrito después de comprar
      vaciarCarrito();

      return { 
        success: true, 
        message: 'Compra realizada con éxito. Stock actualizado.' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Error al procesar la compra. Intenta nuevamente.' 
      };
    }
  };

  const cantidadTotal = carrito.length;

  const precioTotal = carrito.reduce((sum, item) => sum + item.precio, 0);

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      procesarCompra,
      cantidadTotal,
      precioTotal
    }}>
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