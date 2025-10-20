import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "../context/CategoriasContext";
import "../stylesAdmin/categoriasAdmin.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim()) {
      setMensaje({ tipo: "error", texto: "El nombre es obligatorio" });
      return;
    }

    if (formData.nombre.length < 3) {
      setMensaje({ tipo: "error", texto: "El nombre debe tener al menos 3 caracteres" });
      return;
    }

    // Verificar que no exista una categoría con el mismo nombre
    const nombreExiste = categorias.some(
      (cat) => cat.nombre.toLowerCase() === formData.nombre.toLowerCase()
    );

    if (nombreExiste) {
      setMensaje({ 
        tipo: "error", 
        texto: `Ya existe una categoría con el nombre "${formData.nombre}"` 
      });
      return;
    }

    // Agregar categoría
    try {
      agregarCategoria({
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        imagen: formData.imagen.trim() || "https://via.placeholder.com/400x300?text=Sin+Imagen",
      });

      setMensaje({ 
        tipo: "exito", 
        texto: `✅ Categoría "${formData.nombre}" creada exitosamente` 
      });

      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        navigate("/admin/categorias");
      }, 1500);
    } catch (error) {
      setMensaje({ 
        tipo: "error", 
        texto: "Error al crear la categoría. Intenta nuevamente." 
      });
    }
  };

  return (
    <div className="gestion-categorias-container">
      <div className="categoria-form-container">
        <h2 className="categoria-form-title">➕ Crear Nueva Categoría</h2>

        {/* Mensaje de feedback */}
        {mensaje.texto && (
          <div
            className={`categoria-form-mensaje categoria-form-mensaje--${mensaje.tipo}`}
          >
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo: Nombre */}
          <div className="categoria-form-group">
            <label className="categoria-form-label">
              Nombre de la categoría *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="categoria-form-input"
              placeholder="Ej: Tortas Especiales"
              required
              maxLength={50}
            />
            <p className="categoria-form-helper">
              Este nombre será visible para los clientes
            </p>
          </div>

          {/* Campo: Descripción */}
          <div className="categoria-form-group">
            <label className="categoria-form-label">
              Descripción (opcional)
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="categoria-form-textarea"
              placeholder="Describe brevemente esta categoría..."
              maxLength={200}
            />
            <p className="categoria-form-helper">
              Máximo 200 caracteres. Ayuda a los clientes a entender qué productos encontrarán.
            </p>
          </div>

          {/* Campo: Imagen (URL) */}
          <div className="categoria-form-group">
            <label className="categoria-form-label">
              URL de la imagen (opcional)
            </label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="categoria-form-input"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <p className="categoria-form-helper">
              Puede ser una URL externa o dejar vacío para usar imagen por defecto
            </p>
          </div>

          {/* Preview de imagen */}
          {formData.imagen && (
            <div className="categoria-form-group">
              <label className="categoria-form-label">Vista previa:</label>
              <div style={{ 
                width: "100%", 
                height: "200px", 
                borderRadius: "8px", 
                overflow: "hidden",
                border: "2px solid #ddd"
              }}>
                <img
                  src={formData.imagen}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Error+al+cargar";
                  }}
                />
              </div>
            </div>
          )}

          {/* Botones */}
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