import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarrito } from '../context/CarritoContext';
import lista_productos from "../data/dataProductos";
import Toast from '../components/MensajeFlotante';

import '../styles/mensaje.css';
import '../styles/cardProducto.css';
import '../styles/base.css';
import '../styles/detalle.css';

export default function DetalleProducto() {
  const { id } = useParams(); // viene de la ruta /producto/:id
  const navigate = useNavigate();
  const { agregarAlCarrito, cantidadTotal } = useCarrito(); 
  const [showToast, setShowToast] = useState(false);

  const producto = lista_productos.find((p) => p.id === Number(id));
  if (!producto)
    return <p>Producto no encontrado.</p>;

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setShowToast(true);
    //2 segundos
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="detalle-card detalle-flex">
      <img className="detalle-imagen" src={producto.imagen} alt={producto.nombre} />
      <div className="detalle-texto">
        <h2 className="card-title">{producto.nombre}</h2>
        <p className="card-text-descrip">{producto.descripcion_larga}</p>
        <p className="card-text">
          <strong>${producto.precio}</strong>
        </p>
        <div className = "detalle-botones">
        <button className="btn btn-danger btn-agregar" onClick={handleAgregar}>
          Agregar al carrito
        </button>
        <button className="btn-carrito"
          onClick={() => navigate(`/productos`)}>
          Ver más productos
                </button>

        <button className="btn-carrito"
          onClick={() => navigate(`/carrito`)}>
          Ver carrito
          </button>

        </div>

        {/* Mostrar contador de carrito */}
        <div className="detalle-carrito">
          <span className="carrito-icon">Productos totales del carrito: </span>
          <span className="carrito-contador">{cantidadTotal}</span>
        </div>
      </div>

      {/* Toast (mensaje flotante) */}
      <Toast mensaje="Producto agregado al carrito" visible={showToast} />
    </div>
  );
}