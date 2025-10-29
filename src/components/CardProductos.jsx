import React from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from '../context/CarritoContext'; 
import { useState } from "react";
import Toast from './MensajeFlotante';
import '../styles/mensaje.css';
import '../styles/cardProducto.css';
import '../styles/base.css';

export default function CardProductos({ producto}) {
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCarrito();
      const [showToast, setShowToast] = useState(false);
    
    const handleAdd = () => {
    agregarAlCarrito(producto);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

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

                <button className="btn-outline-primary" 
                onClick={() => navigate(`/detalleProductos/${producto.id}`)}> 
                Ver detalles
                </button>
                
                </div>
            </div>
    ); 
}


