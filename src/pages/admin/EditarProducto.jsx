import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import { useCategorias } from "../../context/CategoriasContext";

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
    imagen: producto?.imagen,
    descripcion: producto?.descripcion || "",
  });

  const [mensaje, setMensaje] = useState("");

  if (!producto) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>Producto no encontrado</h3>
        <button
          onClick={() => navigate("/criticos")}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Volver a productos críticos
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await actualizarProducto(producto.id, formData);

      setMensaje(`✅ Producto actualizado correctamente`);

      setTimeout(() => navigate("/criticos"), 1500);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al actualizar el producto");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>✏️ Editar Producto</h2>

      {mensaje && (
        <div style={{
          padding: "12px",
          backgroundColor: "#e6ffe6",
          border: "1px solid #adebad",
          marginBottom: "20px"
        }}>
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label>Categoría:</label>
        <select
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
        >
          <option value="">Sin categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
          min="0"
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
        />

        <label>Imagen URL:</label>
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
