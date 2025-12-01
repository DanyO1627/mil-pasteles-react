import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import { useUsuarios } from "../../context/UsuariosContext";
import "../../styles/stylesAdmin/admin.css";

export default function AdminHome() {
  const navigate = useNavigate();
  const { productos } = useProductos();
  const { usuarios } = useUsuarios();



  // LOS DATOS QUE SE MUESTRAN EN EL DASHBOARD
  // TOTAL DE USUARIOS DEL BACKEND
  const totalUsuarios = usuarios.length;

  // USUARIOS DEL DÍA
  const hoy = new Date().toISOString().slice(0, 10);
  const nuevosUsuarios = usuarios.filter(u => u.fecha === hoy).length;

  // PRODUCTOS TOTALES DEL BACKEND
  const totalProductos = productos.length;

  // STOCK TOTAL
  const totalStock = useMemo(
    () => productos.reduce((sum, p) => sum + (p.stock || 0), 0),
    [productos]
  );

  // NO UNIDO AÚN CON EL BACKEND
  const totalCompras = 1234;

  const handleEnConstruccion = () => {
    alert("🚧 Esta sección está en construcción.");
  };

  return (
    <div className="admin-dashboard">
      
      {/* SIDEBAR*/}
      <aside className="sidebar">
        <h2>🧁 Mil Sabores</h2>
        <ul>
          <li className="active" onClick={() => navigate("/adminHome")}>📊 Panel de control</li>
          <li onClick={() => navigate("/historialCompras")}>🧾 Historial Compras</li>
          <li onClick={() => navigate("/panelProductos")}>📦 Inventario</li>
          <li onClick={() => navigate("/reportes")}>📈 Reportes</li>
          <li onClick={() => navigate("/empleados")}>👩‍🍳 Empleados</li>
          <li onClick={() => navigate("/UsuariosRegistrados")}>🧍 Clientes</li>
          <li onClick={() => navigate("/ofertas")}>💬 Ofertas</li>
          <li onClick={() => navigate("/perfilAdmin")}>🔒 Perfil</li>
        </ul>

        
      </aside>

      {/* HOLA ADMIN */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>¡Hola Administrador!</h1>
          <p className="dashboard-subtitle">
            Bienvenido/a al panel general de Mil Sabores
          </p>
        </header>

        {/* TARJETAS SUPERIORES */}
        <div className="stats-grid">

          {/* COMPRAS */}
          <div className="stat-card compras">
            <h3>🛒 Compras</h3>
            <p className="stat-number">{totalCompras.toLocaleString()}</p>
            <p className="stat-info">
              Probabilidad de aumento: <strong>20%</strong>
            </p>
          </div>

          {/* PRODUCTOS */}
          <div
            className="stat-card productos"
            onClick={() => navigate("/panelProductos")}
          >
            <h3>📦 Productos</h3>
            <p className="stat-number">{totalProductos}</p>
            <p className="stat-info">
              Stock total: <strong>{totalStock}</strong> unidades
            </p>
          </div>

          {/* USUARIOS */}
          <div className="stat-card usuarios">
            <h3>👥 Usuarios</h3>
            <p className="stat-number">{totalUsuarios}</p>
            <p className="stat-info">
              Nuevos hoy: <strong>+{nuevosUsuarios}</strong>
            </p>
          </div>
        </div>

        {/* ACCESOS RÁPIDOS */}
        <div className="quick-access">
          <div className="qa-card" onClick={() => navigate("/adminHome")}>
            <h4>📊 Dashboard</h4>
            <p>Visión general del sistema.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/historialCompra")}>
            <h4>🧾 Historial Compra</h4>
            <p>Revisa tus ventas.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/panelProductos")}>
            <h4>📦 Productos</h4>
            <p>Inventario y gestión.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/gestionarCategorias")}>
            <h4>🏷 Categorías</h4>
            <p>Organización por secciones.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/usuariosRegistrados")}>
            <h4>👥 Usuarios</h4>
            <p>Administración de clientes.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/reportes")}>
            <h4>📈 Reportes</h4>
            <p>Análisis detallado.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/perfilAdmin")}>
            <h4>⚙ Perfil</h4>
            <p>Ajustes personales.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/")}>
            <h4>🏬 Tienda</h4>
            <p>Ir a la tienda.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
