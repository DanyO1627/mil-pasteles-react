import React from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from '../context/CarritoContext'; 
import { useState } from "react";
import Toast from './MensajeFlotante';

import "../utils/CardProductos.logic.js"; // PARA TESTEAR


import '../styles/mensaje.css';
import '../styles/cardProducto.css';
import '../styles/base.css';

export default function CardProductos({ producto}) {
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCarrito();
      const [showToast, setShowToast] = useState(false);
    


      
const handleAdd = () => {
  // Buscar si este producto ya está en el carrito
  const itemEnCarrito = JSON.parse(localStorage.getItem("carrito"))?.find(
    (item) => item.id === producto.id
  );

  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const stockDisponible = producto.stock ?? 0;

  // Validar stock total vs lo que ya tiene en el carrito
  if (cantidadEnCarrito >= stockDisponible) {
    alert("❌ No puedes agregar más unidades. No hay stock suficiente.");
    return;
  }

  if (stockDisponible <= 0) {
    alert("❌ Este producto no tiene stock disponible.");
    return;
  }

  window.CardProductosLogic.handleAdd(agregarAlCarrito, producto, setShowToast, 2000);
};

  // ESTE FUE EL REEMPLAZO DEBIDO AL TEST
//   const handleAdd = () => {
//   window.CardProductosLogic.handleAdd(agregarAlCarrito, producto, setShowToast, 2000);
// };


    return (
        <div className="card h-100 shadow-sm">
        <Toast mensaje="Producto agregado al carrito" visible={showToast} />
            <img 
                src = {producto.imagen}
                alt = {producto.nombre}
                className = "card-img-top"
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-muted">{producto.descripcion}</p>
                <p className= 'fw-bold'>${producto.precio.toLocaleString()}</p>
                
                <button className="btn btn-danger mt-auto"
                onClick={handleAdd}>
                Agregar al carrito
                </button>

                {/* <button className="btn-outline-primary" 
                onClick={() => navigate(`/producto/${producto.id}`)}> 
                Ver detalles
                </button> */}

                {/* PARA HACER EL TEST  */}
                <button className="btn-outline-primary" 
                onClick={() => window.CardProductosLogic.handleNavigate(navigate, producto)}> 
                Ver detalles
              </button>

                
                </div>
            </div>
    ); 
}


