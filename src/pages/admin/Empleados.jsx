import React from "react";
import { dataAdministradores } from "../../data/dataAdministradores";
import {useNavigate } from "react-router-dom";
import "../../styles/stylesAdmin/empleados.css";

export default function Empleados() {
    const navigate = useNavigate();
  return (
    <div className="empleados-wrapper">
      <div className="empleados-container">
        <h2 className="empleados-titulo">👩‍💼 Equipo Administrativo</h2>
        <p className="empleados-subtitulo">
          Lista de administradores registrados en el sistema Mil Sabores
        </p>

        <div className="empleados-grid">
          {dataAdministradores.map((admin) => (
            <div className="empleado-card" key={admin.id}>
              <div className="empleado-avatar-container">
                <img
                  src={admin.avatar || "/avatares/sin_foto_perfil.webp"}
                  alt={`Foto de ${admin.nombre}`}
                  className="empleado-avatar"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/120?text=👤";
                  }}
                />
              </div>

              <div className="empleado-info">
                <h3 className="empleado-nombre">{admin.nombre}</h3>
                <span className="empleado-rol">{admin.rol}</span>

                <div className="empleado-detalles">
                  <p><strong>📧</strong> {admin.email}</p>
                  <p><strong>🏢</strong> {admin.sucursal}</p>
                  <p><strong>🆔</strong> {admin.id}</p>
                  <p>
                    <strong>🕐</strong>{" "}
                    {admin.ultimoAcceso || "Sin registro"}
                  </p>
                </div>
              </div>

              <div className="empleado-acciones">
                <button
                  className="btn-ver"
                  onClick={() => navigate(`/perfilAdmin/${admin.id}`)}
                >
                  👁️ Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
