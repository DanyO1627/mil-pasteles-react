import React from "react";
import { Link } from "react-router-dom";
import "../styles/blogs.css"; 
import matthei from "../assets/matthei1.jpeg";
import perroTorta from "../assets/foto_perro_torta.jpg";

export default function Blogs() {
  return (
    <main className="container">
      <h1 className="my-4">📰 Noticias Importantes</h1>

      {/* Blog 1 */}
      <div className="blog-card">
        <div className="blog-info">
          <h2>
            ¿Un pastel para una alcaldesa? El detrás de cámaras de una creación muy especial
          </h2>
          <p>
            Averigua cómo un simple pastel se convirtió en el centro de atención.
            ¿Qué lo hacía tan especial? Te contamos todo sobre el pastel que le hicimos
            a la mismísima Evelyn Matthei, con una figura de azúcar modelada a mano.
            ¡Te aseguramos que no es un pastel cualquiera!
          </p>
          <Link to="/blog1" className="btn btn-primary">Ver más</Link>
        </div>
        <div className="blog-img">
          <img src={matthei} alt="Imagen Blog 1" />
        </div>
      </div>

      {/* Blog 2 */}
      <div className="blog-card">
        <div className="blog-info">
          <h2>¡El cumpleaños de Toby!</h2>
          <p>
            Toby, el perro más tierno de la pastelería, celebró su cumpleaños
            por todo lo alto. Y lo hizo con una torta que, créenos, no vas a creer
            lo que es. Te contamos cómo nuestras tortas "pet friendly" han conquistado
            el corazón de los amantes de los perros. ¡Y de sus perros!
          </p>
          <Link to="/blog2" className="btn btn-primary">Ver más</Link>
        </div>
        <div className="blog-img">
          <img src={perroTorta} alt="Imagen Blog 2" />
        </div>
      </div>
    </main>
  );
}
