import React from "react";
import '../styles/cardProducto.css';
import '../styles/base.css';

export default function CardProductos({ producto }) {

    return (
        <div className="card h-100 shadow-sm">
            <img 
                src = {producto.imagen}
                alt = {producto.nombre}
                className = "card-img-top"
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-muted">{producto.descripcion}</p>
                <p className= 'fw-bold'>${producto.precio.toLocaleString()}</p>
                <button className="btn btn-danger mt-auto">
                    Agregar al carrito
                </button>

                
                </div>
            </div>
    ); 
}


