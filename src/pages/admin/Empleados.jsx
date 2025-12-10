import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../../services/usuariosApi";
import "../../styles/stylesAdmin/empleados.css";

export default function Empleados() {
  const navigate = useNavigate();
  const [administradores, setAdministradores] = useState([]);
  const [loading, setLoading] = useState(true);

  // CARGAR ADMINISTRADORES DESDE EL BACKEND
  useEffect(() => {
    async function fetchAdmins() {
      try {
        const data = await getUsuarios();

        // Filtrar por rol === "admin"
        const admins = data.filter(
          (u) => u.rol?.trim().toLowerCase() === "admin"
        );

        setAdministradores(admins);
      } catch (error) {
        console.error("Error al cargar administradores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdmins();
  }, []);

  if (loading) {
    return <p className="cargando">Cargando administradores...</p>;
  }

  return (
    <div className="empleados-wrapper">
      <div className="empleados-container">
        <h2 className="empleados-titulo">👩‍💼 Equipo Administrativo</h2>
        <p className="empleados-subtitulo">
          Administradores registrados en el sistema Mil Sabores
        </p>

        <div className="empleados-grid">
          {administradores.length === 0 && (
            <p className="sin-admin">No hay administradores registrados.</p>
          )}

          {administradores.map((admin) => (
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
                  <p><strong>📍</strong> {admin.region || "Sin región"}</p>
                  <p><strong>🆔</strong> {admin.id}</p>
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
