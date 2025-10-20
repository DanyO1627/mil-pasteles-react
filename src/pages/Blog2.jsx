import React from "react";
import { Link, Navigate } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

import "../styles/blogs.css"; 
import perroTorta from "../assets/foto_perro_torta.jpg";

export default function Blog2() {
    const navigate = useNavigate();
  return (

   
      <div className="container-blog">
        <div className="blog-content">
        <div className="blog-info">
          <h2>
            ¡El cumpleaños de Toby! Celebra a tu mejor amigo con un pastel para perros
          </h2>
          <p>
            ¡Hoy celebramos un año más de aventuras con nuestro Toby! 
            Este pequeño gran amigo cumplió años y no podíamos dejar 
            pasar la oportunidad de celebrarlo como se merece: 
            con un pastel hecho especialmente para él.

            En nuestra pastelería, sabemos que las mascotas son parte de la familia. 
            Por eso, hemos creado una línea de pasteles pet friendly, 
            hechos con ingredientes seguros y deliciosos para ellos. Olvídate de los 
            pasteles para humanos que pueden ser perjudiciales 
            para su salud; nuestros pasteles están diseñados 
            para que tus compañeros peludos disfruten de un momento dulce sin riesgos.

            Si quieres que tu perro también tenga un 
            cumpleaños memorable, o simplemente quieres 
            darle un gusto especial, ¡no dudes en visitarnos! 
            Tenemos pasteles de diferentes sabores y tamaños, perfectos para 
            celebrar cualquier ocasión. ¿Qué esperas para darle a tu mejor 
            amigo un pastel que se adapte a él?
          </p>
         
        </div>
        <div className="blog-detail-img">
          <img src={perroTorta} alt="Imagen Blog 2" className="blog-detail-img" />
        </div>
        </div>
        <button className="btn-primary" onClick={() => navigate(`/blogs`)}>Volver a Blogs</button>


      </div>

    );

}
