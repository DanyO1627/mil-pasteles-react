import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import AdminProductCard from "../../components/CardProductosAdmin";
import "../../styles/stylesAdmin/productosAdmin.css"

export default function PanelProductos() {
  const navigate = useNavigate();
  const { productos, eliminarProducto } = useProductos();
  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // llevar a pag especifica del id
  const handleEditar = (id) => {
    navigate(`/editar/${id}`);
  };

  // eliminar y confimar
  const handleEliminar = (id) => {
    const producto = productos.find((p) => p.id === id);
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar "${producto?.nombre}"?\n\nEsta acción no se puede deshacer.`
    );
    
    if (confirmar) {
      eliminarProducto(id);
      alert(`Producto "${producto?.nombre}" eliminado correctamente.`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      
      <div style={{ marginBottom: "30px" }}>
        <h2>📦 Panel de Productos</h2>
        <p style={{ color: "#666" }}>
          Gestión de inventario - Pastelería Mil Sabores
        </p>
      </div>

      {/* BOTONES SUPERIORES*/}
      <div style={{ 
        display: "flex", 
        gap: "15px", 
        marginBottom: "25px",
        flexWrap: "wrap"
      }}>
        <button
          onClick={() => navigate("/adminHome")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ← Volver al inicio
        </button>

        <button
          onClick={() => navigate("/criticos")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#a1555cff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          📉 Ver productos críticos
        </button>

        <button
          onClick={() =>navigate("/nuevoProducto")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#897176",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Agregar producto
        </button>

        <button
          onClick={() => navigate("/reportes")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#734a4a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          🧮 Reportes de inventario
        </button>

      </div>

      {/* Buscador */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px"
          }}
        />
      </div>

      {/* Contador*/}
      <div style={{ marginBottom: "20px", color: "#666" }}>
        Mostrando {productosFiltrados.length} de {productos.length} productos
      </div>

      {/* Grid de productos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px"
      }}>
        {productosFiltrados.length === 0 ? (
          <div style={{ 
            gridColumn: "1 / -1", 
            textAlign: "center", 
            padding: "40px",
            color: "#999"
          }}>
            {busqueda ? (
              <>
                <p>No se encontraron productos con "{busqueda}"</p>
                <button
                  onClick={() => setBusqueda("")}
                  style={{
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Limpiar búsqueda
                </button>
              </>
            ) : (
              <p>No hay productos en el inventario</p>
            )}
          </div>
        ) : (
          productosFiltrados.map((producto) => (
            <AdminProductCard
              key={producto.id}
              producto={producto}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          ))
        )}
      </div>
    </div>
  );
}