import React from "react";
import {  useNavigate } from "react-router-dom";
import "../styles/blogs.css"; 
import matthei from "../assets/matthei1.jpeg";

export default function Blog1() {
    const navigate = useNavigate();
  return (

   
      <div className="container">
        <div className="blog-info">
          <h2>
            ¿Un pastel para una alcaldesa? El detrás de cámaras de una creación muy especial
          </h2>
          <p>
            ¿Un pastel para una alcaldesa? El detrás de cámaras de una creación muy especial
            En la pastelería, cada encargo es una aventura, pero algunos nos llenan de un orgullo muy particular. 
            ¿Sabían que tuvimos el honor de crear un pastel para la mismísima Evelyn Matthei?

            Este pastel no fue uno cualquiera. Fue una celebración de su espíritu y dedicación, 
            capturando en azúcar y bizcocho su icónica personalidad. Con una figura de azúcar 
            modelada a mano, la alcaldesa se "pasea" sobre un terreno verde, 
            simbolizando su trabajo en la ciudad.

            En nuestra pastelería, creemos que un pastel es más que un 
            simple postre. Es una forma de contar una historia, de celebrar 
            momentos y personas que nos inspiran. Y si puedes imaginarlo, nosotros 
            podemos crearlo. ¡Visita nuestro blog para más historias como esta y 
            descubre las maravillas que podemos crear juntos!
          </p>
         
        </div>
        <div className="blog-detail-img">
          <img src={matthei} alt="Imagen Blog 1" className="blog-detail-img" />
        </div>
        <button className="btn-primary" onClick={() => navigate(`/blogs`)}>Volver a Blogs</button>


      </div>

    );

}