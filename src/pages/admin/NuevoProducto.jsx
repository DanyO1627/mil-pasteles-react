import React, { useState } from "react";
import "../../utils/NuevoProducto.logic.js";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import { useCategorias } from "../../context/CategoriasContext"; // ✅ Importar categorías
import "../../styles/stylesAdmin/nuevoProducto.css";

export default function NuevoProducto() {
  const navigate = useNavigate();
  const { agregarProducto } = useProductos();
  const { categorias } = useCategorias(); // ✅ Obtener las categorías registradas

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: 0,
    categoriaId: "",
    imagen: "",
    descripcion: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [preview, setPreview] = useState("/assets/sin_imagen.webp");

  // =======================
  // 🔧 Manejador de cambios
  // =======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    const result = window.NuevoProductoLogic.handleChange(formData, name, value);
    setFormData(result.nuevoFormData);
    setPreview(result.preview);
  };

  // =======================
  // 💾 Guardar nuevo producto
  // =======================
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = window.NuevoProductoLogic.handleSubmit(formData);
    setMensaje(result.mensaje);

    if (result.valido) {
      agregarProducto(result.nuevoProducto);
      setTimeout(() => navigate(window.NuevoProductoLogic.getRedirectUrl()), 1500);
    }
  };

  // =======================
  // 🧱 Render del formulario
  // =======================
  return (
    <div className="agregar-prod-wrapper">
      <div className="agregar-prod-container">
        <h2 className="agregar-prod-titulo">➕ Agregar Nuevo Producto</h2>
        <p className="agregar-prod-subtitulo">
          Complete los datos del nuevo producto
        </p>

        {mensaje && <div className="agregar-prod-mensaje">{mensaje}</div>}

        <form onSubmit={handleSubmit} className="agregar-prod-form">
          {/* Nombre */}
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label>Categoría:</label>
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Precio */}
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Stock */}
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Imagen */}
          <div className="form-group">
            <label>URL de Imagen:</label>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="URL externa o /assets/imagen.webp"
            />

            {/* 🔍 Previsualización */}
            <div className="imagen-preview">
              <p>Vista previa:</p>
              <div className="preview-box">
                <img
                  src={preview}
                  alt="Previsualización del producto"
                  onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150?text=Sin+imagen")
                  }
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label>Descripción general:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describe brevemente el producto..."
            />
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button type="submit" className="btn-primario">
              💾 Guardar producto
            </button>
            <button
              type="button"
              className="btn-secundario"
              onClick={() => navigate("/panelProductos")}
            >
              ← Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}