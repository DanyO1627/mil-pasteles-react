import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarrito } from '../context/CarritoContext';
import { useProductos } from '../context/InventarioContext';
import '../utils/DetalleProducto.logic.js'; // PARA PRUEBAS UNITARIAS

import Toast from '../components/MensajeFlotante';

import '../styles/mensaje.css';
import '../styles/cardProducto.css';
import '../styles/base.css';
import '../styles/detalle.css';

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito, cantidadTotal } = useCarrito();
  const { obtenerProducto } = useProductos();
  const [showToast, setShowToast] = useState(false);

  // Obtiene producto desde el inventario actualizado
  const producto = obtenerProducto(id);

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  // cambiado para las pruebas unitarias 
  const sinStock = window.DetalleProductoLogic.esSinStock(producto);
  const stockBajo = window.DetalleProductoLogic.esStockBajo(producto);

  const handleAgregar = () => {
    window.DetalleProductoLogic.handleAgregar(
      producto,
      agregarAlCarrito,
      setShowToast
    );
  };


  return (
    <div className="detalle-card detalle-flex">
      <img className="detalle-imagen" src={producto.imagen} alt={producto.nombre} />
      <div className="detalle-texto">
        <h2 className="card-title">{producto.nombre}</h2>
        <p className="card-text-descrip">{producto.descripcion_larga}</p>
        <p className="card-text">
          <strong>${producto.precio.toLocaleString()}</strong>
        </p>

        {/* Indicador de stock */}
        <div style={{ marginBottom: '15px' }}>
          {sinStock ? (
            <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
              Sin stock disponible
            </p>
          ) : stockBajo ? (
            <p style={{ color: '#ff9800', fontWeight: 'bold' }}>
              ¡Últimas unidades! (Stock: {producto.stock})
            </p>
          ) : (
            <p style={{ color: '#28a745', fontWeight: 'bold' }}>
              Stock Disponible (Stock: {producto.stock})
            </p>
          )}
        </div>

        <div className="detalle-botones">
          <button
            className="btn btn-danger btn-agregar"
            onClick={handleAgregar}
            disabled={sinStock}
          >
            {sinStock ? 'Sin stock' : 'Agregar al carrito'}
          </button>
          <button
            className="btn-carrito"
            onClick={() => navigate(`/productos`)}
          >
            Ver más productos
          </button>
          <button
            className="btn-carrito"
            onClick={() => navigate(`/carrito`)}
          >
            Ver carrito
          </button>
        </div>

        {/* contador del carrito */}
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