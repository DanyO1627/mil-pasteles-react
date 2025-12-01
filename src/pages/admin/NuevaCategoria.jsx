// src/pagesAdmin/NuevaCategoria.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "../../context/CategoriasContext";
import "../../styles/stylesAdmin/categoriasAdmin.css";

export default function NuevaCategoria() {
  const navigate = useNavigate();
  const { agregarCategoria, categorias } = useCategorias();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setMensaje({ tipo: "error", texto: "El nombre es obligatorio" });
      return;
    }

    if (formData.nombre.length < 3) {
      setMensaje({ tipo: "error", texto: "Debe tener al menos 3 caracteres" });
      return;
    }

    const duplicada = categorias.some(
      (c) => c.nombre.toLowerCase() === formData.nombre.toLowerCase()
    );

    if (duplicada) {
      setMensaje({
        tipo: "error",
        texto: `Ya existe una categoría "${formData.nombre}"`,
      });
      return;
    }

    try {
      await agregarCategoria({
        nombreCategoria: formData.nombre.trim(),
        descripcionCategoria: formData.descripcion.trim(),
        imagenUrl:
          formData.imagen.trim() ||
          "/img/default.webp",
        activo: true,
      });

      setMensaje({
        tipo: "exito",
        texto: `✅ Categoría "${formData.nombre}" creada`,
      });

      setTimeout(() => navigate("/gestionarCategorias"), 1500);
    } catch (error) {
      console.error(error);
      setMensaje({
        tipo: "error",
        texto: "Error al crear la categoría",
      });
    }
  };

  return (
    <div className="gestion-categorias-container">
      <div className="categoria-form-container">
        <h2 className="categoria-form-title">➕ Nueva Categoría</h2>

        {mensaje.texto && (
          <div
            className={`categoria-form-mensaje categoria-form-mensaje--${mensaje.tipo}`}
          >
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="categoria-form-group">
            <label className="categoria-form-label">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="categoria-form-input"
            />
          </div>

          <div className="categoria-form-group">
            <label className="categoria-form-label">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="categoria-form-textarea"
            />
          </div>

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

          {formData.imagen && (
            <div className="categoria-form-group">
              <label className="categoria-form-label">Vista previa</label>
              <img
                src={formData.imagen}
                alt="preview"
                onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x300?text=No+image")
                }
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div className="categoria-form-actions">
            <button
              type="submit"
              className="categoria-form-btn categoria-form-btn--guardar"
            >
              💾 Crear Categoría
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
