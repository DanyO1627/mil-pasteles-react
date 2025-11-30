import React, { useState } from "react";
import { useProductos } from "../context/InventarioContext";
import { useCategorias } from "../context/CategoriasContext";
import CardProductos from "../components/CardProductos";
import "../styles/categorias.css";

export default function Categorias() {
  const { productos } = useProductos();
  const { categoriasActivas } = useCategorias();
  
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // obtiene solo categorías activas
  //  automáticamente se acutaliza cuando el admin crea/edita
  const categoriasDisponibles = categoriasActivas();

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((p) => p.categoriaId === categoriaSeleccionada.id)
    : [];

  return (
    <div className="categorias-container">
      <h1 className="titulo-categorias">Nuestras Categorías</h1>

      {/* Verificar si hay categorías disponibles */}
      {categoriasDisponibles.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          margin: "40px auto",
          maxWidth: "600px"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📂</div>
          <h3 style={{ color: "#666", marginBottom: "10px" }}>
            Aún no hay categorías disponibles
          </h3>
          <p style={{ color: "#999" }}>
            Estamos organizando nuestros productos. ¡Vuelve pronto!
          </p>
        </div>
      ) : (
        <>
          {/* tarjetas de la categoria */}
          <div className="categorias-grid">
            {categoriasDisponibles.map((cat) => (
              <div
                key={cat.id}
                className={`categoria-card ${
                  categoriaSeleccionada?.id === cat.id ? "activa" : ""
                }`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="categoria-imagen"
                />
                <h3 className="categoria-nombre">{cat.nombre}</h3>
                
              </div>
            ))}
          </div>

          {/* productos en el filtro de categoria */}
          {categoriaSeleccionada && (
            <div className="productos-por-categoria">
              <h2 className="subtitulo-categoria">
                {categoriaSeleccionada.nombre}
              </h2>

              {productosFiltrados.length === 0 ? (
                <div style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  margin: "20px 0"
                }}>
                  <p style={{ color: "#999", fontSize: "1.1rem" }}>
                    📦 No hay productos disponibles en esta categoría
                  </p>
                </div>
              ) : (
                <div className="productos-grid-categoria">
                  {productosFiltrados.map((producto) => (
                    <CardProductos key={producto.id} producto={producto} />
                  ))}
                </div>
              )}

              {/* btn para limpiar seleccion*/}
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  onClick={() => setCategoriaSeleccionada(null)}
                  style={{
                    padding: "12px 30px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#5a6268"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#6c757d"}
                >
                  ← Ver todas las categorías
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}