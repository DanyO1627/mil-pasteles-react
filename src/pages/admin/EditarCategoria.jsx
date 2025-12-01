// src/pagesAdmin/EditarCategoria.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategorias } from "../../context/CategoriasContext";
import { useProductos } from "../../context/InventarioContext";
import "../../styles/stylesAdmin/categoriasAdmin.css";

export default function EditarCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { 
    obtenerCategoria, 
    actualizarCategoria, 
    categorias, 
    contarProductosPorCategoria 
  } = useCategorias();

  const { productos } = useProductos();

  const categoria = obtenerCategoria(id);

  const [formData, setFormData] = useState({
    nombre: categoria?.nombre || "",
    descripcion: categoria?.descripcion || "",
    imagen: categoria?.imagen || "", // URL completa o null
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  if (!categoria) {
    return (
      <div className="gestion-categorias-container">
        <div className="categoria-form-container">
          <h3>Categoría no encontrada</h3>
          <button
            className="categoria-form-btn categoria-form-btn--cancelar"
            onClick={() => navigate("/admin/categorias")}
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  const cantidadProductos = contarProductosPorCategoria(productos, categoria.id);

  // ===========================
  //   HANDLE CHANGE
  // ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ===========================
  //   HANDLE SUBMIT
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setMensaje({ tipo: "error", texto: "El nombre es obligatorio" });
      return;
    }

    if (formData.nombre.length < 3) {
      setMensaje({ tipo: "error", texto: "Debe tener mínimo 3 caracteres" });
      return;
    }

    const duplicada = categorias.some(
      (cat) =>
        cat.id !== categoria.id &&
        cat.nombre.toLowerCase() === formData.nombre.toLowerCase()
    );

    if (duplicada) {
      setMensaje({
        tipo: "error",
        texto: `Ya existe otra categoría con el nombre "${formData.nombre}"`,
      });
      return;
    }

    try {
      await actualizarCategoria(categoria.id, {
        nombreCategoria: formData.nombre.trim(),
        descripcionCategoria: formData.descripcion.trim(),
        imagenUrl: formData.imagen.trim() || null,
        activo: categoria.activo,
      });

      setMensaje({
        tipo: "exito",
        texto: "✅ Categoría actualizada correctamente",
      });

      setTimeout(() => navigate("/admin/categorias"), 1500);
    } catch (err) {
      console.error(err);
      setMensaje({ tipo: "error", texto: "Error al actualizar la categoría" });
    }
  };

  return (
    <div className="gestion-categorias-container">
      <div className="categoria-form-container">
        <h2 className="categoria-form-title">✏️ Editar Categoría</h2>

        <div
          style={{
            padding: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        >
          <strong>📦 Productos asociados:</strong> {cantidadProductos}
        </div>

        {mensaje.texto && (
          <div
            className={`categoria-form-mensaje categoria-form-mensaje--${mensaje.tipo}`}
          >
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* NOMBRE */}
          <div className="categoria-form-group">
            <label className="categoria-form-label">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="categoria-form-input"
              required
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div className="categoria-form-group">
            <label className="categoria-form-label">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="categoria-form-textarea"
            />
          </div>

          {/* IMAGEN */}
          <div className="categoria-form-group">
            <label className="categoria-form-label">Imagen (URL)</label>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="categoria-form-input"
            />
          </div>

          {/* PREVIEW */}
          {formData.imagen && (
            <div className="categoria-form-group">
              <label className="categoria-form-label">Vista previa</label>
              <img
                src={formData.imagen}
                alt="Preview"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x300?text=No+image")
                }
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}

          {/* BOTONES */}
          <div className="categoria-form-actions">
            <button
              type="submit"
              className="categoria-form-btn categoria-form-btn--guardar"
            >
              💾 Guardar Cambios
            </button>

            <button
              type="button"
              className="categoria-form-btn categoria-form-btn--cancelar"
              onClick={() => navigate("/admin/categorias")}
            >
              ↩️ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
