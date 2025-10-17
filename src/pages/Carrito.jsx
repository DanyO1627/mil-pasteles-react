import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import lista_productos from "../data/dataProductos";
import "../styles/base.css";
import "../styles/carrito.css";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, precioTotal, agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  return (
    <div className="container mt-5 carrito-page">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>

      <div className="row">
        {/* 🧁 Columna izquierda - Lista de productos */}
        <div className="col-md-6 productos-col">
          <h4 className="mb-3">Agrega más productos</h4>
          <div className="row">
            {lista_productos.map((producto) => (
              <div key={producto.id} className="col-12 col-sm-6 mb-3">
                <div className="card small-card">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="card-img-top small-img"
                  />
                  <div className="card-body p-2 text-center">
                    <h6>{producto.nombre}</h6>
                    <p className="text-muted">${producto.precio.toLocaleString()}</p>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*derecha - carrito*/}
        <div className="col-md-6 carrito-col">
          {carrito.length === 0 ? (
            <div className="text-center mt-5">
              <h5>Tu carrito está vacío</h5>
              <button className="btn btn-danger mt-3" onClick={() => navigate('/productos')}>
                Ver productos
              </button>
            </div>
          ) : (
            <>
              <h4 className="mb-3">Tus productos</h4>
              {carrito.map((item) => (
                <div key={item.itemId} className="card mb-3 p-2 d-flex flex-row align-items-center">
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    className="img-thumbnail me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.nombre}</h6>
                    <p className="text-muted mb-1">${item.precio.toLocaleString()}</p>
                    <p className="text-muted mb-1 small">Subtotal: ${item.precio.toLocaleString()}</p>
                  </div>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarDelCarrito(item.itemId)}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              {/* Total y acciones */}
              <div className="card mt-4 p-4 text-center shadow-sm">
                <h5>Total: ${precioTotal.toLocaleString()}</h5>
                <div className="d-flex flex-column gap-2 mt-3">
                  <button className="btn btn-danger">
                    Comprar ahora
                  </button>
                  <button className="btn btn-outline-secondary" onClick={vaciarCarrito}>
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}