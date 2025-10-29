import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import { useUsuarios } from "../../context/UsuariosContext";
import "../../styles/stylesAdmin/admin.css";

export default function AdminHome() {
  const navigate = useNavigate();
  const { productos, resetearInventario } = useProductos();
  const { usuarios, resetearUsuarios } = useUsuarios();


  // RESTAURAR USUARIOS
  const handleResetCompleto = () => {
    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de que deseas restaurar los datos del sistema?\nEsto eliminará todos los productos y usuarios actuales."
    );
    if (confirmar) {
      resetearInventario();
      resetearUsuarios();
      localStorage.clear();
      alert("✅ Sistema restaurado correctamente.");
      window.location.reload();
    }
  };


  // USUARIOS REGISTRADOS DEL CONTEXT
  //const { usuarios } = useUsuarios();
  const totalUsuarios = usuarios.length;

  // DATOS DINAMICOS
  const totalProductos = productos.length;
  const totalStock = useMemo(
    () => productos.reduce((sum, p) => sum + (p.stock || 0), 0),
    [productos]
  );


  const nuevosUsuarios = useMemo(() => {
    return usuarios.filter(u => u.origen === "nuevo").length;
  }, [usuarios]);

  // Compras (dato temporal)
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

      {/* HOLA ADMINISTRADOR */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>¡Hola Administrador!</h1>
          <p className="dashboard-subtitle">
            Bienvenido/a al panel general de Mil Sabores
          </p>
        </header>

        {/* TARJETAS SUPERIORES */}
        <div className="stats-grid">
          <div className="stat-card compras">
            <h3>🛒 Compras</h3>
            <p className="stat-number">{totalCompras.toLocaleString()}</p>
            <p className="stat-info">
              Probabilidad de aumento: <strong>20%</strong>
            </p>
          </div>

          <div className="stat-card productos" onClick={() => navigate("/panelProductos")}>
            <h3>📦 Productos</h3>
            <p className="stat-number">{totalProductos}</p>
            <p className="stat-info">
              Stock total: <strong>{totalStock}</strong> unidades
            </p>
          </div>

          <div className="stat-card usuarios">
            <h3>👥 Usuarios</h3>
            <p className="stat-number">{totalUsuarios}</p>
            <p className="stat-info">
              Nuevos usuarios del día de hoy: <strong>+{nuevosUsuarios}</strong>
            </p>
          </div>
        </div>

        {/* === ACCESOS RÁPIDOS === */}
        <div className="quick-access">
          <div className="qa-card" onClick={() => navigate("/adminHome")}>
            <h4>📊 Dashboard</h4>
            <p>Visión general de métricas y estadísticas.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/historialCompra")}>
            <h4>🧾 Historial Compra</h4>
            <p>Gestión y seguimiento de pedidos en curso.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/panelProductos")}>
            <h4>📦 Productos</h4>
            <p>Administración del inventario y detalles.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/gestionarCategorias")}>
            <h4>🏷 Categorías</h4>
            <p>Organización de productos en secciones.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/usuariosRegistrados")}>
            <h4>👥 Usuarios</h4>
            <p>Gestión de usuarios y roles en el sistema.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/reportes")}>
            <h4>📈 Reportes</h4>
            <p>Generación de reportes detallados.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/perfilAdmin")}>
            <h4>⚙ Perfil</h4>
            <p>Configuración de datos personales y cuenta.</p>
          </div>
          <div className="qa-card" onClick={() => navigate("/reportes")}>
            <h4>🏬 Tienda</h4>
            <p>Regresar a la tienda.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
