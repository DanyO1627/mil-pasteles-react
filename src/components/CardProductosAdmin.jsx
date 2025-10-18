import React from "react";
import '../stylesAdmin/productosAdmin.css';

export default function AdminProductCard({ producto, onEditar, onEliminar }) {
  return (
    <div className="admin-card">
      <img src={producto.imagen} alt={producto.nombre} className="admin-card__imagen" />
      <div className="admin-card__contenido">
        <h5 className="admin-card__nombre">{producto.nombre}</h5>
        <p className="admin-card__categoria">Categoría: {producto.categoria}</p>
        <p className="admin-card__precio">${producto.precio.toLocaleString()}</p>
        <p className="admin-card__stock">Stock: {producto.stock ?? 0}</p>
      </div>
      <div className="admin-card__acciones">
        <button className="admin-card__btn admin-card__btn--editar" onClick={() => onEditar(producto.id)}>
            Editar
            </button>
        <button className="admin-card__btn admin-card__btn--eliminar" onClick={() => onEliminar(producto.id)}>
            Eliminar
            </button>
      </div>
    </div>
  );
}