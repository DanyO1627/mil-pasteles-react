import React from "react";
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import '../styles/base.css';

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, precioTotal } = useCarrito();
  const navigate = useNavigate();

  if (carrito.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p className="text-muted">¡Agrega algunos productos deliciosos!</p>
        <button className="btn btn-danger mt-3" onClick={() => navigate('/')}>
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      
      <div className="row">
        {carrito.map((item) => (
          <div key={item.itemId} className="col-12 mb-3">
            <div className="card">
              <div className="card-body d-flex align-items-center">
                <img 
                  src={item.imagen} 
                  alt={item.nombre}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="ms-3 flex-grow-1">
                  <h5>{item.nombre}</h5>
                  <p className="text-muted mb-0">{item.descripcion}</p>
                  <p className="fw-bold mb-0">${item.precio.toLocaleString()}</p>
                </div>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => eliminarDelCarrito(item.itemId)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4 p-4">
        <h4>Total: ${precioTotal.toLocaleString()}</h4>
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-danger" onClick={() => alert('Función de pago próximamente')}>
            Proceder al pago
          </button>
          <button className="btn btn-outline-secondary" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}