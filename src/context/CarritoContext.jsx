import React, {createContext, useState, useContext} from 'react';

const CarritoContext = createContext();

export function CarritoProvider({children}) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, { ...producto, itemId: Date.now() }]);
  };

  const eliminarDelCarrito = (itemId) => {
    setCarrito(prev => prev.filter(item => item.itemId !== itemId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = carrito.length;

  const precioTotal = carrito.reduce((sum, item) => sum + item.precio, 0);

return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
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
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;


}