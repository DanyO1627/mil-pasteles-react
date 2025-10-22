// src/pagesAdmin/PerfilAdmin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesAdmin/perfilAdmin.css";

export default function PerfilAdmin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Cargar datos del admin activo desde localStorage
    const adminActivo = localStorage.getItem("adminActivo");
    
    if (!adminActivo) {
      // Si no hay sesión activa, mostrar mensaje y no cargar nada
      return;
    }

    try {
      const adminData = JSON.parse(adminActivo);
      setAdmin(adminData);
    } catch (error) {
      console.error("Error al cargar datos del administrador:", error);
      setAdmin(null);
    }
  }, []);

  const handleCerrarSesion = () => {
    const confirmar = window.confirm("¿Estás seguro de cerrar sesión?");
    
    if (confirmar) {
      localStorage.removeItem("adminActivo");
      navigate("/iniciar-sesion");
    }
  };

  const handleEditarPerfil = () => {
    alert("Función de editar perfil en desarrollo 🚧");
    // Aquí podrías navegar a /admin/perfil/editar en el futuro
  };

  const handleIrAlPanel = () => {
    navigate("/admin");
  };

  // Si no hay sesión activa = no hay perfil activo
  if (!admin) {
    return (
      <div className="perfil-admin-wrapper">
        <div className="perfil-admin-container">
          <div className="perfil-admin-no-sesion">
            <div className="perfil-admin-no-sesion-icono">🔒</div>
            <h2 className="perfil-admin-no-sesion-titulo">
              No se encontró un perfil activo
            </h2>
            <p className="perfil-admin-no-sesion-texto">
              Inicia sesión para continuar
            </p>
            <button
              className="perfil-admin-btn perfil-admin-btn-primary"
              onClick={() => navigate("/iniciar-sesion")}
            >
              Ir a iniciar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
  

  // si la sesion está activa, que muestre el perfil
  return (
    <div className="perfil-admin-wrapper">
      <div className="perfil-admin-container">
        <main className="perfil-admin-main">
          <section className="perfil-admin-card">
            {/* Avatar y nombre */}
            <div className="perfil-admin-header">
              <img
                src={admin.avatar || "/avatars/empleado.png"}
                alt={`Foto de perfil de ${admin.nombre}`}
                className="perfil-admin-avatar"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=👤";
                }}
              />
              <h2 className="perfil-admin-nombre">{admin.nombre}</h2>
              <span className="perfil-admin-rol-badge">{admin.rol}</span>
            </div>

            {/* Info del perfil */}
            <div className="perfil-admin-info">
              <div className="perfil-admin-info-item">
                <span className="perfil-admin-info-label">📧 Correo:</span>
                <span className="perfil-admin-info-value">{admin.email}</span>
              </div>

              <div className="perfil-admin-info-item">
                <span className="perfil-admin-info-label">🏢 Sucursal:</span>
                <span className="perfil-admin-info-value">{admin.sucursal}</span>
              </div>

              <div className="perfil-admin-info-item">
                <span className="perfil-admin-info-label">🆔 ID Empleado:</span>
                <span className="perfil-admin-info-value">{admin.id}</span>
              </div>

              <div className="perfil-admin-info-item">
                <span className="perfil-admin-info-label">🕐 Último acceso:</span>
                <span className="perfil-admin-info-value">
                  {admin.ultimoAcceso || "Primer acceso"}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="perfil-admin-actions">
              <button
                className="perfil-admin-btn perfil-admin-btn-secondary"
                onClick={handleEditarPerfil}
              >
                ✏️ Editar perfil
              </button>

              <button
                className="perfil-admin-btn perfil-admin-btn-dashboard"
                onClick={handleIrAlPanel}
              >
                📊 Ir al panel
              </button>

              <button
                className="perfil-admin-btn perfil-admin-btn-danger"
                onClick={handleCerrarSesion}
              >
                🚪 Cerrar sesión
              </button>
            </div>



{/* YA VERÉ SI DEJO ESTO************** */}

            {/* Sección adicional de estadísticas (opcional) */}
            <div className="perfil-admin-stats">
              <div className="perfil-admin-stat-item">
                <span className="perfil-admin-stat-icon">📅</span>
                <div className="perfil-admin-stat-info">
                  <span className="perfil-admin-stat-label">Miembro desde</span>
                  <span className="perfil-admin-stat-value">2024</span>
                </div>
              </div>

              <div className="perfil-admin-stat-item">
                <span className="perfil-admin-stat-icon">✅</span>
                <div className="perfil-admin-stat-info">
                  <span className="perfil-admin-stat-label">Estado</span>
                  <span className="perfil-admin-stat-value">Activo</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}