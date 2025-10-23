import { useState } from "react";
import "../styles/home.css";
import "../styles/navbar.css";
import "../styles/footer.css";
import "../styles/variables.css";
import "../styles/buscador.css"
import '../styles/cardProducto.css';

import { useEffect } from "react";
import CardHomeProducto from "../components/CardHomeProducto";
import { useProductos } from "../context/InventarioContext"; // esto hace que usemos los productos globales
import ChatBot from "../components/Chatbot";

import chefImg from "../assets/chef.png";
import chatBotImg from "../assets/chatbot.png";


export default function Home() {


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


    const handleResetHome = () => {
    const confirmar = window.confirm(
      "⚠️ Esto eliminará los productos y categorías almacenados en el navegador. ¿Deseas continuar?"
    );
    if (confirmar) {
      localStorage.removeItem("categorias");
      localStorage.removeItem("inventario");
      localStorage.removeItem("productos");
      alert("✅ Datos de productos restaurados. Recarga la página.");
      window.location.reload();
    }
  };


  return (
    <> 
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
        <h2 className = "container2" > Nuestros productos </h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
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

      {/* Botón oculto de restauración de datos */}
  <button
    className="btn-reset-oculto"
    onClick={handleResetHome}
    title="Restaurar productos y categorías"
  >
    🔄
  </button>

  <ChatBot />
  </>

  );
}

