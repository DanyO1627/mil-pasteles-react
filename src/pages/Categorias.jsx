import React, { useState } from "react";
import lista_productos from "../data/dataProductos";
import CardProductos from "../components/CardProductos";
import "../styles/categorias.css";

import tortaImg from "../assets/tarta-selva-negra.jpg";
import cheesecake2 from "../assets/cheesecakeImg.webp";
import macarons2 from "../assets/macarons2.webp";
import tiramisu2 from "../assets/Tiramisu2.webp";

export default function Categorias() {
  // lista de las 4 categorias
  const categoriasUnicas = [
    { nombre:"Tortas & Pasteles", imagen: tortaImg },
    { nombre:"Tartas & Pies", imagen: cheesecake2 },
    { nombre:"Individuales & Repostería Fina", imagen: macarons2 },
    { nombre:"Especialidades & Gourmet", imagen: tiramisu2 },
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // filtro
  const productosFiltrados = categoriaSeleccionada
    ? lista_productos.filter(p => p.categoria === categoriaSeleccionada)
    : [];

  return (
    <div className="categorias-container">
      <h1 className="titulo-categorias">Nuestras Categorías</h1>

      {/* tarjeta de las categorias */}
      <div className="categorias-grid">
        {categoriasUnicas.map((cat, index) => (
          <div
            key={index}
            className={`categoria-card ${categoriaSeleccionada === cat.nombre ? "activa" : ""}`}
            onClick={() => setCategoriaSeleccionada(cat.nombre)}
          >
            <img src={cat.imagen} alt={cat.nombre} className="categoria-imagen" />
            <h3 className="categoria-nombre">{cat.nombre}</h3>
          </div>
        ))}
      </div>

      {/* productos según el filtro de cate */}
      {categoriaSeleccionada && (
        <div className="productos-por-categoria">
          <h2 className="subtitulo-categoria">{categoriaSeleccionada}</h2>
          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <CardProductos key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}