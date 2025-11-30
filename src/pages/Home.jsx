import { useState } from "react";
import "../styles/home.css";
import "../styles/navbar.css";
import "../styles/footer.css";
import "../styles/variables.css";
import "../styles/buscador.css"
import '../styles/cardProducto.css';

import { useNavigate } from "react-router-dom";
import '../styles/cardProducto.css'; // usa mismo css

import { useEffect } from "react";
import CardHomeProducto from "../components/CardHomeProducto";
import { useProductos } from "../context/InventarioContext"; // esto hace que usemos los productos globales

import chefImg from "../assets/chef.png";

export default function Home() {
  const navigate = useNavigate();

  // usar los productos
  const { productos } = useProductos();

  const productosHome = productos.filter(p => p.id >= 33 && p.id <= 37);

  const [query, setQuery] = useState("");

  const productosFiltrados = productosHome.filter((p) =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    console.log("Productos cargados en Home:", productos);
  }, [productos]);


  return (
    <main className="home">
      <section className="hero">
        <div className="hero-container">
          {/* izquierda el titulo*/}
          <div className="hero-text">
            <h1>Pastelería Mil Sabores</h1>
            <p className="lead">Endulza tu día con nuestras tortas artesanales.</p>


          </div>

          {/* a la derecha*/}
          <div className="hero-img">
            <img src={chefImg} alt="Chef pastelero" />
          </div>
        </div>
      </section>



      {/* PRODUCTOS */}
      <section id="productos" className="container">
        <h2 className="container2" > Nuestros productos </h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />

          <button
            className="btn btn-outline-primary mt-auto"
            onClick={() => navigate(`/ofertas`)}
          >
            Ver productos con ofertas
          </button>
        </div>

        {productosFiltrados.length > 0 ? (
          <div className="grid">
            {productosFiltrados.map((p) => (
              <CardHomeProducto key={p.id} producto={p} />
            ))}
          </div>
        ) : (
          <p className="no-results">No se encontraron productos con ese nombre...</p>
        )}
      </section>
    </main>
  );
}

