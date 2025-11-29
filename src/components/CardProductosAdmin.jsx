import React from "react";
import "../styles/stylesAdmin/productosAdmin.css";

export default function AdminProductCard({ producto, onEditar, onEliminar }) {
  return (
    <div className="admin-card">
      {/* imagen del producto*/}
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="admin-card__imagen"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150?text=Sin+imagen";
        }}
      />

      {/* nombre y contendiod */}
      <div className="admin-card__contenido">
        <h5 className="admin-card__nombre">{producto.nombre}</h5>

        {/* categoría del producto */}
        <p className="admin-card__categoria">
          Categoría: {producto.nombreCategoria || producto.categoriaId || "Sin categoría"}
        </p>

        <p className="admin-card__precio">
          ${producto.precio.toLocaleString()}
        </p>

        <p className="admin-card__stock">
          Stock: {producto.stock ?? 0}
        </p>
      </div>

      {/* BOTONES */}
      <div className="admin-card__acciones">
        <button
          className="admin-card__btn admin-card__btn--editar"
          onClick={() => onEditar(producto.id)}
        >
          ✏️ Editar
        </button>
        <button
          className="admin-card__btn admin-card__btn--eliminar"
          onClick={() => onEliminar(producto.id)}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}