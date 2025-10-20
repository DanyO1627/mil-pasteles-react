import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/blogs.css"; 
import tortaMinimalista from "../assets/torta_minimalista.jpg";

export default function Blog3() {
    const navigate = useNavigate();
    
    return (
        <div className="container-blog">
            <div className="blog-content">
            <div className="blog-info">
                <h2>
                    La Elegancia de la Sencillez: La Torta Minimalista que Enamora
                </h2>
                <p>
                    En un mundo donde a menudo más es más, la pastelería ha encontrado la belleza en la moderación. 
                    Las tortas minimalistas son la tendencia del momento, demostrando que la elegancia reside en la 
                    simplicidad. Hemos visto cómo novios y anfitriones de eventos formales están optando por diseños 
                    limpios, con coberturas de *buttercream* perfectamente lisas y una paleta de colores neutros.
                </p>
                <p>
                    ¿Qué define a una Torta Minimalista?
                    <ul>
                        <li>Colores Suaves: Predominio del blanco, beige, pasteles pálidos o tonos tierra.</li>
                        <li>Decoración Sutil: Un toque de flores frescas, una línea de oro comestible o un diseño geométrico discreto.</li>
                        <li>Textura: Frecuentemente, una cobertura lisa y mate es la protagonista, dejando que la forma del pastel hable por sí misma.</li>
                    </ul>
                </p>
                <p>
                    Nuestras tortas minimalistas no solo son visualmente impactantes, sino que también nos permiten 
                    centrarnos en la calidad de los sabores interiores. ¡Ven y descubre cómo un pastel sencillo puede 
                    ser el centro de atención de tu próximo evento!
                </p>
            </div>
            <div className="blog-detail-img">
                <img src={tortaMinimalista} alt="Torta Minimalista con detalles sutiles" className="blog-detail-img" />
            </div>
            </div>
            <button className="btn-primary" onClick={() => navigate(`/blogs`)}>Volver a Blogs</button>
        </div>
    );
}