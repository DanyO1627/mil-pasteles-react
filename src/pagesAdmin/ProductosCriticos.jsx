// src/pagesAdmin/ProductosCriticos.jsx
import React from "react";
import { useProductos } from "../context/InventarioContext";
import { useNavigate } from "react-router-dom";
import "../stylesAdmin/productosCriticos.css";

export default function ProductosCriticosAdmin() {
  const navigate = useNavigate();
  const { productosCriticos } = useProductos();

  // Obtener productos con stock <= 7
  const criticos = productosCriticos(7);

  return (
    <div className="criticos-container">
      {/* Título */}
      <h2 className="criticos-title">📉 Vista de Productos Críticos</h2>
      <p className="criticos-subtitle">
        Aquí puedes revisar los productos con bajo stock y reponerlos.
      </p>

      {/* Botones superiores */}
      <div className="criticos-actions">
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => navigate("/admin/panel/productos")}
        >
          ← Volver al panel
        </button>
        <button 
          className="btn btn-outline-info" 
          onClick={() => navigate("/reportes")}
        >
          📊 Ver reportes
        </button>
      </div>

      {/* Lista de productos críticos */}
      <div className="criticos-list">
        {criticos.length === 0 ? (
          <p className="criticos-empty">
            🎉 Todos los productos tienen stock suficiente.
          </p>
        ) : (
          criticos.map((producto) => {
            const advertencia =
              producto.stock <= 4
                ? "Producto con mínimo stock"
                : "Es importante revisar el stock de este producto";

            const advertenciaClass =
              producto.stock <= 4
                ? "critico-alerta--roja"
                : "critico-alerta--amarilla";

            return (
              <div key={producto.id} className="critico-card">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="critico-card__img"
                />

                <div className="critico-card__info">
                  <h5 className="critico-card__nombre">{producto.nombre}</h5>
                  <p className="critico-card__categoria">
                    Categoría: {producto.categoria ?? "Sin categoría"}
                  </p>
                  <p className="critico-card__precio">
                    Precio: ${producto.precio.toLocaleString()}
                  </p>
                  <p className="critico-card__stock">
                    Stock actual: <strong>{producto.stock}</strong>
                  </p>
                </div>

                {/* Advertencia y botón */}
                <div className="critico-card__acciones">
                  <p className={`critico-alerta ${advertenciaClass}`}>
                    {advertencia}
                  </p>
                  <button
                    className="btn btn-danger btn-reponer"
                    onClick={() => navigate(`/admin/editar/${producto.id}`)}
                  >
                    Reponer stock
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}