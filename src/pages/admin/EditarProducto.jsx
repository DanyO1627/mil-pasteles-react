import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerProducto, actualizarProducto } = useProductos();

  const producto = obtenerProducto(id);

  const [formData, setFormData] = useState({
    nombre: producto?.nombre || "",
    precio: producto?.precio || "",
    stock: producto?.stock || 0,
    categoria: producto?.categoria || "",
    imagen: producto?.imagen || "",
    descripcion: producto?.descripcion || "",
  });

  const [mensaje, setMensaje] = useState("");
  const [preview, setPreview] = useState(
    producto?.imagen || "/assets/sin_imagen.webp"
  );

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

  // 🔧 Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Previsualizar imagen si cambia
    if (name === "imagen") {
      if (value.trim() === "") {
        setPreview("/assets/sin_imagen.webp");
      } else if (value.startsWith("/assets/")) {
        try {
          const localPath = new URL(`../../..${value}`, import.meta.url).href;
          setPreview(localPath);
        } catch {
          setPreview("https://via.placeholder.com/150?text=Sin+imagen");
        }
      } else {
        setPreview(value);
      }
    }
  };

  // Guardar cambios
  const handleSubmit = (e) => {
    e.preventDefault();

    // Resolver imagen local al guardar
    let imagenFinal = formData.imagen;
    if (!imagenFinal || imagenFinal.trim() === "") {
      imagenFinal = "/assets/sin_imagen.webp";
    } else if (imagenFinal.startsWith("/assets/")) {
      try {
        imagenFinal = new URL(`../../..${imagenFinal}`, import.meta.url).href;
      } catch {
        imagenFinal = "https://via.placeholder.com/150?text=Sin+imagen";
      }
    }

    actualizarProducto(producto.id, {
      nombre: formData.nombre,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      categoria: formData.categoria,
      imagen: imagenFinal,
      descripcion: formData.descripcion,
    });

    setMensaje(`✅ Producto actualizado: ${formData.nombre}`);

    setTimeout(() => navigate("/panelProductos"), 1500);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>✏️ Editar Producto</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Modifica la información del producto seleccionado
      </p>

      {mensaje && (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            color: "#155724",
          }}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Categoría */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            Categoría:
          </label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Precio */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            Precio:
          </label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
            min="0"
            style={inputStyle}
          />
        </div>

        {/* Stock */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            Stock:
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            style={inputStyle}
          />
        </div>

        {/* Imagen */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            URL de Imagen:
          </label>
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            placeholder="Ej: /assets/torta.png o URL externa"
            style={inputStyle}
          />
          <div
            style={{
              marginTop: "10px",
              width: "160px",
              height: "160px",
              border: "2px dashed #bbb",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <img
              src={preview}
              alt="Vista previa"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/150?text=Sin+imagen")
              }
            />
          </div>
        </div>

        {/* Descripción */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
          >
            Descripción:
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          <button 
            type="submit" 
            onClick={() => navigate("/panelProductos")} 
            style={btnGuardar}>
            💾 Guardar cambios
          </button>
          <button
            type="button"
            onClick={() => navigate("/panelProductos")}
            style={btnVolver}
          >
            ← Volver
          </button>
        </div>
      </form>
    </div>
  );
}

// 🎨 Estilos básicos
const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const btnGuardar = {
  flex: 1,
  padding: "12px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

const btnVolver = {
  flex: 1,
  padding: "12px 20px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};
