import React from 'react'
import PasteleriaImg from "../assets/Pasteleria Imagen.png";
import FundadoraImg from "../assets/Fundadora y Chef principal.png";
import PasteleroImg from "../assets/Pastelero Principal.png";
import DisenadoraImg from "../assets/Diseñadora de Pasteles.png";
import "../styles/style.css";

export default function Nosotros() {
  return (
    <main className="nosotros-page">
      <h1>Nosotros</h1>

      <div className="about-section">
        <img
          src={PasteleriaImg}
          alt="Imagen de la pastelería"
          className="pasteleria-simg"
        />
        <div className="about-text">
          <p>
            Bienvenidos a <strong>Pastelería Mil Sabores</strong>, un lugar donde
            cada pastel es una obra de arte hecha con amor y los mejores
            ingredientes. Nos especializamos en ofrecer pasteles frescos,
            deliciosos y personalizados para cualquier ocasión. Ya sea para
            alguna celebración o simplemente consentirte, tenemos el pastel
            perfecto para ti.
          </p>
          <p>
            Desde nuestra fundación en 2010, nos hemos comprometido a mantener
            los estándares más altos de calidad y sabor. Nuestro equipo de
            expertos pasteleros trabaja cada día para crear experiencias
            inolvidables a través de nuestros productos.
          </p>
        </div>
      </div>

      <div className="team">
        <div className="team-member">
          <img src={FundadoraImg} alt="María López - Fundadora y Chef Principal" />
          <h3>María López</h3>
          <p>Fundadora y Chef Principal</p>
        </div>

        <div className="team-member">
          <img src={PasteleroImg} alt="Carlos García - Pastelero Principal" />
          <h3>Carlos García</h3>
          <p>Pastelero Principal</p>
        </div>

        <div className="team-member">
          <img src={DisenadoraImg} alt="Ana Ruiz - Diseñadora de Pasteles" />
          <h3>Ana Ruiz</h3>
          <p>Diseñadora de Pasteles</p>
        </div>
      </div>
    </main>
  )
}
