import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/blogs.css"; 
import tallerPasteleria from "../assets/taller_pasteleria.png";

export default function Blog4() {
    const navigate = useNavigate();
    
    return (
        <div className="container-blog">
            <div className="blog-content">
            <div className="blog-info">
                <h2>
                    De Hobby a Pasión: Así Fue Nuestro Último Taller de Decoración de Cupcakes
                </h2>
                <p>
                    La pastelería es un arte que se disfruta el doble cuando se comparte. Por eso, nuestros talleres 
                    son tan especiales. En la última sesión, nos enfocamos en el arte de la decoración de cupcakes, 
                    desde el batido perfecto del *buttercream* hasta la técnica para lograr la roseta ideal.
                </p>
                <p>
                    Vimos a nuestros alumnos (algunos sin experiencia previa) aprender a manejar la manga pastelera 
                    con confianza, logrando resultados profesionales. La alegría de crear algo hermoso y delicioso con 
                    tus propias manos es incomparable. ¡La energía de la clase fue tan dulce como los cupcakes que 
                    decoramos!
                </p>
                <p>
                    Si te perdiste esta oportunidad, ¡no te preocupes! Siempre estamos planificando nuevos cursos:
                    decoración de tortas con fondant, técnicas de glaseado espejo, y pastelería avanzada. **¡Síguenos 
                    en redes sociales o suscríbete a nuestro newsletter para no perderte las fechas de los próximos talleres!**
                    Te esperamos con los utensilios listos.
                </p>
            </div>
            <div className="blog-detail-img">
                <img src={tallerPasteleria} alt="Foto de alumnos en el taller de pastelería" className="blog-detail-img" />
            </div>
            </div>
            <button className="btn-primary" onClick={() => navigate(`/blogs`)}>Volver a Blogs</button>
        </div>
    );
}