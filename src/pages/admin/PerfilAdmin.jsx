import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataAdministradores } from "../../data/dataAdministradores";
import "../../styles/stylesAdmin/perfilAdmin.css";

export default function PerfilAdmin() {
  const { id } = useParams(); // 🔹 Captura el ID desde la URL (si existe)
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (id) {
      // Si la ruta incluye un ID, buscar ese admin en el dataAdministradores
      const encontrado = dataAdministradores.find((a) => a.id === id);
      setAdmin(encontrado || null);
    } else {
      // Si no hay ID, cargar el adminActivo desde localStorage
      const adminActivo = localStorage.getItem("adminActivo");
      if (adminActivo) setAdmin(JSON.parse(adminActivo));
    }
  }, [id]);

  const handleCerrarSesion = () => {
    localStorage.removeItem("adminActivo");
    navigate("/iniciar-sesion");
  };

  if (!admin) {
    return (
      <div className="perfil-admin-wrapper">
        <div className="perfil-admin-container">
          <h2>No se encontró el perfil solicitado</h2>
          <button
            className="perfil-admin-btn perfil-admin-btn-primary"
            onClick={() => navigate("/adminHome")}
          >
            Volver al panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-admin-wrapper">
      <div className="perfil-admin-container">
        <main className="perfil-admin-main">
          <section className="perfil-admin-card">
            <div className="perfil-admin-header">
              <img
                src={admin.avatar || "/avatares/sin_foto_perfil.webp"}
                alt={`Foto de perfil de ${admin.nombre}`}
                className="perfil-admin-avatar"
              />
              <h2 className="perfil-admin-nombre">{admin.nombre}</h2>
              <span className="perfil-admin-rol-badge">{admin.rol}</span>
            </div>

            <div className="perfil-admin-info">
              <p><strong>📧 Correo:</strong> {admin.email}</p>
              <p><strong>🏢 Sucursal:</strong> {admin.sucursal}</p>
              <p><strong>🆔 ID Empleado:</strong> {admin.id}</p>
              <p><strong>🕐 Último acceso:</strong> {admin.ultimoAcceso || "Sin registro"}</p>
            </div>

            <div className="perfil-admin-actions">
              <button
                className="perfil-admin-btn perfil-admin-btn-dashboard"
                onClick={() => navigate("/adminHome")}
              >
                ← Volver
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
