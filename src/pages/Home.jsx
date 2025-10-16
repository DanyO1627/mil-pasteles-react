import React from "react";
import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenidos a Pastelería Mil Sabores</h1>
          <p className="hero-subtitle">Endulzando tus momentos especiales desde 2010</p>
          <Link to="/productos" className="btn btn-danger btn-lg">
            Ver nuestros productos
          </Link>
        </div>
      </section>

      <section id="nosotros" className="info-section">
        <div className="container">
          <h2>Sobre Nosotros</h2>
          <p>Somos una pastelería artesanal con más de 10 años de experiencia.</p>
        </div>
      </section>

      <section id="blog" className="info-section">
        <div className="container">
          <h2>Blog</h2>
          <p>Próximamente: recetas, tips y novedades.</p>
        </div>
      </section>

      <section id="contacto" className="info-section">
        <div className="container">
          <h2>Contacto</h2>
          <p>📞 Tel: +56 986739543</p>
          <p>📧 Email: contacto@mil-sabores.cl</p>
          <p>📍 Av. Providencia 1900, Santiago, Chile</p>
        </div>
      </section>
    </div>
  );
}