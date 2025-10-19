import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

//  LAS IMÁGENES
import chefImg from "../assets/chef.png";
import imgPrincipal from "../assets/torta para 8p.jpg";
import imgCheesecake from "../assets/cheesecake.jpg";
import imgManzana from "../assets/Tarta-de-manzana-ajustada-web-570x458.jpg";
import imgTresLeches from "../assets/torta_tres_leches_8910_orig.jpg";
import imgSanFelipe from "../assets/torta_san felipe.jpeg";
import imgBerries from "../assets/3.png";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const productos = [
    { id: 1, nombre: "Tarta Berries", precio: "18.990", img: imgBerries },
    { id: 2, nombre: "Cheesecake Frutos Rojos", precio: "17.990", img: imgCheesecake },
    { id: 3, nombre: "Tarta de Manzana", precio: "14.990", img: imgManzana },
    { id: 4, nombre: "Torta Tres Leches", precio: "16.990", img: imgTresLeches },
    { id: 5, nombre: "Torta San Felipe", precio: "19.990", img: imgSanFelipe },
    { id: 6, nombre: "Torta Chocolate", precio: "22.990", img: imgPrincipal },
  ];

  
  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

   
    if (query.toLowerCase().includes("oferta") || query.toLowerCase().includes("descuento")) {
      navigate(`/ofertas?query=${encodeURIComponent(query)}`);
    } else {
    
      navigate(`/productos?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <main className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-cta">
          <h1>Pastelería Mil Sabores</h1>
          <p className="lead">Endulza tu día con nuestras tortas artesanales.</p>

          {/* CAJA DE BÚSQUEDA CON BOTÓN */}
          <form onSubmit={handleSearch} className="search-box">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn primary">
              Buscar
            </button>
          </form>

          <div className="hero-img">
            <img src={chefImg} alt="Mini chefs pastelería" />
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section id="productos" className="container">
        <h2>Nuestros productos destacados</h2>
        <div className="grid">
          {productos.map((p) => (
            <article key={p.id} className="card-producto">
              <img src={p.img} alt={p.nombre} loading="lazy" />
              <div className="info">
                <h3>{p.nombre}</h3>
                <span className="precio">${p.precio}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
