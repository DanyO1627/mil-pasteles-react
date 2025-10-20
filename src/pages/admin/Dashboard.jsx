import "../../styles/style.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* === SIDEBAR === */}
      <aside className="sidebar">
        <h2>🧁 Compañía</h2>
        <ul>
          <li className="active">📊 Panel de control</li>
          <li>🧾 Órdenes</li>
          <li>📦 Inventario</li>
          <li>📈 Informes</li>
          <li>👩‍🍳 Empleados</li>
          <li>🧍 Clientes</li>
          <li>⚙ Configuración</li>
          <li>💬 Ofertas</li>
          <li>🔍 Buscar</li>
          <li>❓ Ayuda</li>
          <li>🔒 Admin</li>
        </ul>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>¡HOLA Administrador!</h1>
          <p className="dashboard-subtitle">Resumen de las actividades diarias</p>
        </header>

        {/* === TARJETAS SUPERIORES === */}
        <div className="stats-grid">
          <div className="stat-card compras">
            <h3>🛒 Compras</h3>
            <p className="stat-number">1.234</p>
            <p className="stat-info">Probabilidad de aumento: <strong>20%</strong></p>
          </div>

          <div className="stat-card productos">
            <h3>📦 Productos</h3>
            <p className="stat-number">400</p>
            <p className="stat-info">Inventario actual: <strong>500</strong></p>
          </div>

          <div className="stat-card usuarios">
            <h3>👥 Usuarios</h3>
            <p className="stat-number">890</p>
            <p className="stat-info">Nuevos este mes: <strong>120</strong></p>
          </div>
        </div>

        {/* === ACCESOS RÁPIDOS === */}
        <div className="quick-access">
          <div className="qa-card">
            <h4>📊 Dashboard</h4>
            <p>Visión general de métricas y estadísticas.</p>
          </div>
          <div className="qa-card">
            <h4>🧾 Órdenes</h4>
            <p>Gestión y seguimiento de pedidos en curso.</p>
          </div>
          <div className="qa-card">
            <h4>📦 Productos</h4>
            <p>Administración del inventario y detalles.</p>
          </div>
          <div className="qa-card">
            <h4>🏷 Categorías</h4>
            <p>Organización de productos en secciones.</p>
          </div>
          <div className="qa-card">
            <h4>👥 Usuarios</h4>
            <p>Gestión de usuarios y roles en el sistema.</p>
          </div>
          <div className="qa-card">
            <h4>📈 Reportes</h4>
            <p>Generación de informes detallados.</p>
          </div>
          <div className="qa-card">
            <h4>⚙ Perfil</h4>
            <p>Configuración de datos personales y cuenta.</p>
          </div>
          <div className="qa-card">
            <h4>🏬 Tienda</h4>
            <p>Visualiza las ventas y estadísticas de tienda.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
