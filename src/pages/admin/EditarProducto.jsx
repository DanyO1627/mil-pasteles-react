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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Actualizar producto en el context (automatico en localstorage)
    actualizarProducto(producto.id, {
      nombre: formData.nombre,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      categoria: formData.categoria
    });
    
    setMensaje(`✅ Producto actualizado: ${formData.nombre} - Stock: ${formData.stock}`);
    
    // Redirigir dsp de 1.5 seg
    setTimeout(() => navigate("/criticos"), 1500);
  };
  
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>✏️ Editar Producto</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Modifica la información del producto seleccionado
      </p>
      
      {mensaje && (
        <div style={{ 
          padding: "15px", 
          marginBottom: "20px", 
          backgroundColor: "#d4edda", 
          border: "1px solid #c3e6cb",
          borderRadius: "4px",
          color: "#155724"
        }}>
          {mensaje}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Categoría:
          </label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Precio:
          </label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
            min="0"
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Stock:
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          <button 
            type="submit" 
            style={{ 
              flex: 1,
              padding: "12px 20px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            💾 Guardar cambios
          </button>
          <button 
            type="button"
            onClick={() => navigate("/criticos")}
            style={{ 
              flex: 1,
              padding: "12px 20px", 
              backgroundColor: "#6c757d", 
              color: "white", 
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            ← Volver
          </button>
        </div>
      </form>
    </div>
  );
}