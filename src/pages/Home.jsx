import { useState } from "react";
import "../styles/style.css";

//  LAS IMÁGENES
import chefImg from "../assets/chef.png";
import imgPrincipal from "../assets/torta para 8p.jpg";
import imgCheesecake from "../assets/cheesecake.png";
import imgManzana from "../assets/Tarta-de-manzana-ajustada-web-570x458.jpg";
import imgTresLeches from "../assets/torta_tres_leches_8910_orig.jpg";
import imgSanFelipe from "../assets/torta_san felipe.jpeg";
import imgBerries from "../assets/3.png";

export default function Home() {
  const productos = [
    { id: 1, nombre: "Tarta Berries", precio: "18.990", img: imgBerries },
    { id: 2, nombre: "Cheesecake Frutos Rojos", precio: "17.990", img: imgCheesecake },
    { id: 3, nombre: "Tarta de Manzana", precio: "14.990", img: imgManzana },
    { id: 4, nombre: "Torta Tres Leches", precio: "16.990", img: imgTresLeches },
    { id: 5, nombre: "Torta San Felipe", precio: "19.990", img: imgSanFelipe },
    { id: 6, nombre: "Torta Chocolate", precio: "22.990", img: imgPrincipal },
  ];

  // Estado para búsqueda
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar productos según el término buscado
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    setSearchTerm(query);
  };

  return (
    <main className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-cta">
          <h1>Pastelería Mil Sabores</h1>
          <p className="lead">Endulza tu día con nuestras tortas artesanales.</p>

          {/* CAJA DE BÚSQUEDA CON BOTÓN */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button className="btn primary" onClick={handleSearch}>
              Buscar
            </button>
          </div>

          <div className="hero-img">
            <img src={chefImg} alt="Mini chefs pastelería" />
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="container">
        <h2>Nuestros productos</h2>

        {productosFiltrados.length > 0 ? (
          <div className="grid">
            {productosFiltrados.map((p) => (
              <article key={p.id} className="card-producto">
                <img src={p.img} alt={p.nombre} loading="lazy" />
                <div className="info">
                  <h3>{p.nombre}</h3>
                  <span className="precio">${p.precio}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="no-results">No se encontraron productos con ese nombre 😔</p>
        )}
      </section>
    </main>
  );
}

