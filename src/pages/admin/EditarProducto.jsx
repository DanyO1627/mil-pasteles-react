import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import { useCategorias } from "../../context/CategoriasContext";

import "../../styles/stylesAdmin/nuevoProducto.css"; // ❤️ MISMO CSS DEL FORMULARIO NUEVO

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerProducto, actualizarProducto } = useProductos();
  const { categorias } = useCategorias();

  const producto = obtenerProducto(id);

  const [formData, setFormData] = useState({
    nombre: producto?.nombre || "",
    precio: producto?.precio || "",
    stock: producto?.stock || 0,
    categoriaId: producto?.categoriaId || "",
    imagen: producto?.imagen || "",
    descripcion: producto?.descripcion || "",
  });

  const [preview, setPreview] = useState(
    producto?.imagen || "/assets/sin_imagen.webp"
  );
  const [mensaje, setMensaje] = useState("");

  if (!producto) {
    return (
      <div className="agregar-prod-wrapper">
        <h3>El producto no existe</h3>
        <button onClick={() => navigate("/panelProductos")}>Volver</button>
      </div>
    );
  }

  // ======================
  // 🔧 MANEJO DE INPUTS
  // ======================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "imagen") {
      if (value.trim() === "") {
        setPreview("/assets/sin_imagen.webp");
      } else {
        setPreview(value);
      }
    }
  };

  // ======================
  // 💾 GUARDAR CAMBIOS
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await actualizarProducto(id, formData);

      setMensaje("✅ Producto actualizado correctamente");
      setTimeout(() => navigate("/panelProductos"), 1200);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al actualizar");
    }
  };

  return (
    <div className="agregar-prod-wrapper">
      <div className="agregar-prod-container">
        <h2 className="agregar-prod-titulo">✏️ Editar Producto</h2>

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
              <option value="">Sin categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
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
            <label>Imagen URL:</label>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />

            <div className="imagen-preview">
              <p>Vista previa:</p>
              <div className="preview-box">
                <img
                  src={preview}
                  alt="Vista previa"
                  onError={(e) => {
                    e.target.src = "/assets/sin_imagen.webp";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button type="submit" className="btn-primario">
              💾 Guardar cambios
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
