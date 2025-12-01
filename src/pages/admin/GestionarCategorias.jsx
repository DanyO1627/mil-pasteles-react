import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "../../context/CategoriasContext";
import { useProductos } from "../../context/InventarioContext";
import "../../styles/stylesAdmin/categoriasAdmin.css";

export default function GestionarCategorias() {
  const navigate = useNavigate();
  const { 
    categorias, 
    eliminarCategoria, 
    contarProductosPorCategoria, 
    resetearCategorias,
    existeCategoria 
  } = useCategorias();
  
  const { 
    productos, 
    actualizarProducto, 
    productosHuerfanos,
    resetearInventario 
  } = useProductos();
  
  const [mostrarHuerfanos, setMostrarHuerfanos] = useState(false);

  // detectar productos sin categoria
  const productosInvalidos = productosHuerfanos();

  // eliminar una categoria manejado
  const handleEliminar = (categoriaId) => {
    const cantidad = contarProductosPorCategoria(productos, categoriaId);
    const categoria = categorias.find((c) => c.id === categoriaId);

    if (cantidad > 0) {
      const confirmar = window.confirm(
        `⚠️ La categoría "${categoria.nombre}" tiene ${cantidad} producto(s) asociado(s).\n\n` +
        `Si la eliminas, estos productos quedarán sin categoría.\n\n` +
        `¿Deseas continuar?`
      );

      if (confirmar) {
        // sin categoria a null
        productos.forEach((p) => {
          if (p.categoriaId === categoriaId) {
            actualizarProducto(p.id, { categoriaId: null });
          }
        });

        const resultado = eliminarCategoria(categoriaId);
        if (resultado !== false) {
          alert(`✅ Categoría eliminada. ${cantidad} producto(s) movido(s) a "Sin categoría".`);
        }
      }
    } else {
      const confirmar = window.confirm(
        `¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`
      );
      if (confirmar) {
        const resultado = eliminarCategoria(categoriaId);
        if (resultado !== false) {
          alert("✅ Categoría eliminada correctamente.");
        }
      }
    }
  };

  // RESETEA EL SISTEMA COMPLETO Y DEJA CON LOS VALORES DE INICIO AL LOCAL ()
  const handleResetCompleto = () => {
    const confirmar = window.confirm(
      "⚠️ ADVERTENCIA: Esto restaurará TODAS las categorías y productos a sus valores iniciales.\n\n" +
      "Se perderán todos los cambios realizados.\n\n" +
      "¿Estás seguro?"
    );
    
    if (confirmar) {
      resetearCategorias();
      resetearInventario();
      alert("✅ Sistema restaurado completamente. Recarga la página.");
      window.location.reload();
    }
  };

  return (
    <div className="gestion-categorias-container">
      {/* HEADER DE GESTIONAR CATEGORIAS */}
      <div className="gestion-categorias-header">
        <h2 className="gestion-categorias-title">🏷️ Gestión de Categorías</h2>
        <p className="gestion-categorias-subtitle">
          Administra las categorías de productos de tu pastelería
        </p>
      </div>

      {/* ALERTA DE PRODUCTOS SIN CATEGORIA */}
      {productosInvalidos.length > 0 && (
        <div className="alerta-huerfanos">
          <div className="alerta-huerfanos-contenido">
            <div className="alerta-huerfanos-icono">⚠️</div>
            <div className="alerta-huerfanos-texto">
              <h3 className="alerta-huerfanos-title">
                ¡Atención! Productos sin categoría detectados
              </h3>
              <p className="alerta-huerfanos-desc">
                Hay {productosInvalidos.length} producto(s) que no tienen categoría asignada.
                Asígnalos para mejorar la organización de tu inventario.
              </p>
            </div>
          </div>
          <button
            className="alerta-huerfanos-btn"
            onClick={() => {
              setMostrarHuerfanos(!mostrarHuerfanos);
            }}
          >
            {mostrarHuerfanos ? "Ocultar" : "Ver productos"}
          </button>
        </div>
      )}

      {/* LISTA DE PRODUCTOS SIN CATEGORIAS */}
      {mostrarHuerfanos && productosInvalidos.length > 0 && (
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "25px",
          border: "2px solid #ffc107"
        }}>
          <h4 style={{ marginBottom: "15px", color: "#856404" }}>
            📦 Productos sin categoría:
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {productosInvalidos.map((p) => (
              <li
                key={p.id}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span>
                  <strong>{p.nombre}</strong> - ${p.precio.toLocaleString()}
                </span>
                <button
                  style={{
                    padding: "5px 15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/admin/editar/${p.id}`)}
                >
                  Asignar categoría
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* BOTONES */}
      <div className="gestion-categorias-actions">
        <button
          className="gestion-cat-btn gestion-cat-btn--volver"
          onClick={() => navigate("/adminHome")}
        >
          ← Volver al inicio
        </button>
        <button
          className="gestion-cat-btn gestion-cat-btn--nueva"
          onClick={() => navigate("/nuevaCategoria")}
        >
          ➕ Nueva Categoría
        </button>
        <button
          className="gestion-cat-btn gestion-cat-btn--productos"
          onClick={() => navigate("/panelProductos")}
        >
          📦 Ver Productos
        </button>
        <button
          className="gestion-cat-btn"
          onClick={handleResetCompleto}
          style={{ backgroundColor: "#dc3545", color: "white" }}
        >
          🔄 Restaurar Todo
        </button>
      </div>

      {/* GRID DE LAS CATEGORIAS*/}
      {categorias.length === 0 ? (
        <div className="categorias-admin-empty">
          <div className="categorias-admin-empty-icon">📂</div>
          <p className="categorias-admin-empty-text">
            No hay categorías creadas aún
          </p>
          <button
            className="gestion-cat-btn gestion-cat-btn--nueva"
            onClick={() => navigate("/admin/categorias/nueva")}
          >
            Crear primera categoría
          </button>
        </div>
      ) : (
        <div className="categorias-admin-grid">
          {categorias.map((categoria) => {
            const cantidadProductos = contarProductosPorCategoria(productos, categoria.id);
            const esCategoriaBase = [1, 2, 3, 4].includes(categoria.id);

            return (
              <div
                key={categoria.id}
                className={`categoria-admin-card ${
                  !categoria.activa ? "categoria-admin-card--inactiva" : ""
                }`}
              >
                {/* Imagen */}
                <div className="categoria-admin-imagen-container">
                  <img
                    src={categoria.imagen}
                    alt={categoria.nombre}
                    className="categoria-admin-imagen"
                  />
                  <span
                    className={`categoria-admin-badge ${
                      categoria.activa
                        ? "categoria-admin-badge--activa"
                        : "categoria-admin-badge--inactiva"
                    }`}
                  >
                    {categoria.activa ? "Activa" : "Inactiva"}
                  </span>
                  {esCategoriaBase && (
                    <span 
                      className="categoria-admin-badge"
                      style={{ 
                        top: "10px", 
                        left: "10px", 
                        backgroundColor: "#6c757d" 
                      }}
                    >
                      Base
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="categoria-admin-contenido">
                  <h3 className="categoria-admin-nombre">{categoria.nombre}</h3>
                  <p className="categoria-admin-descripcion">
                    {categoria.descripcion || "Sin descripción"}
                  </p>

                  {/* Estadísticas */}
                  <div className="categoria-admin-stats">
                    <div className="categoria-admin-stat">
                      <div className="categoria-admin-stat-label">Productos</div>
                      <div className="categoria-admin-stat-value">
                        {cantidadProductos}
                      </div>
                    </div>
                    <div className="categoria-admin-stat">
                      <div className="categoria-admin-stat-label">ID</div>
                      <div className="categoria-admin-stat-value">
                        #{categoria.id}
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="categoria-admin-acciones">
                    <button
                      className="categoria-admin-btn categoria-admin-btn--editar"
                      onClick={() => navigate(`/editarCategoria/${categoria.id}`)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="categoria-admin-btn categoria-admin-btn--eliminar"
                      onClick={() => handleEliminar(categoria.id)}
                      disabled={esCategoriaBase}
                      title={esCategoriaBase ? "Las categorías base no se pueden eliminar" : ""}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}