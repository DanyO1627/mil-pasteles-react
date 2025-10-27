// es lo mismo que mis card de productos solo qeu no tiene ni el mensaje flotante ni el 
// botón de agregar al carrito, para que así vayan directo a detalles y de ahí se muevan


import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/cardProducto.css'; // usa mismo css

export default function CardHomeProducto({ producto }) {
  const navigate = useNavigate();

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top"
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted">{producto.descripcion}</p>
        <p className="fw-bold">${producto.precio.toLocaleString()}</p>

        <button
          className="btn btn-outline-primary mt-auto"
          onClick={() => navigate(`/detalleProductos/${producto.id}`)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
