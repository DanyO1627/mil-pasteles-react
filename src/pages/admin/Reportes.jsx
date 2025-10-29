import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import { useUsuarios } from "../../context/UsuariosContext";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "../../styles/stylesAdmin/reportes.css";

export default function Reportes() {
  const navigate = useNavigate();
  const { productos, productosCriticos } = useProductos();
  const { usuarios } = useUsuarios();

  /* ================================
     📦 SECCIÓN INVENTARIO
  ================================ */

  const totalProductos = productos.length;

  const valorInventario = useMemo(() => {
    return productos.reduce((sum, p) => sum + p.precio * (p.stock || 0), 0);
  }, [productos]);

  const criticos = productosCriticos(5);
  const totalCriticos = criticos.length;

  const stockTotal = useMemo(() => {
    return productos.reduce((sum, p) => sum + (p.stock || 0), 0);
  }, [productos]);

  const stockPorCategoria = useMemo(() => {
    const categorias = {};
    productos.forEach((p) => {
      const cat = p.categoria || "Sin categoría";
      categorias[cat] = (categorias[cat] || 0) + (p.stock || 0);
    });
    return Object.entries(categorias).map(([name, stock]) => ({ name, stock }));
  }, [productos]);

  const distribucionStock = useMemo(() => {
    const sinStock = productos.filter((p) => (p.stock || 0) === 0).length;
    const stockCritico = productos.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length;
    const stockBajo = productos.filter((p) => (p.stock || 0) > 5 && (p.stock || 0) <= 10).length;
    const stockNormal = productos.filter((p) => (p.stock || 0) > 10).length;
    return [
      { name: "Sin stock", value: sinStock, color: "#dc3545" },
      { name: "Crítico (1-5)", value: stockCritico, color: "#ff9800" },
      { name: "Bajo (6-10)", value: stockBajo, color: "#ffc107" },
      { name: "Normal (>10)", value: stockNormal, color: "#28a745" },
    ];
  }, [productos]);

  const topCaros = useMemo(() => {
    return [...productos]
      .sort((a, b) => b.precio - a.precio)
      .slice(0, 5)
      .map((p) => ({
        name: p.nombre.length > 20 ? p.nombre.slice(0, 20) + "..." : p.nombre,
        precio: p.precio,
      }));
  }, [productos]);

  const valorPorCategoria = useMemo(() => {
    const categorias = {};
    productos.forEach((p) => {
      const cat = p.categoria || "Sin categoría";
      categorias[cat] = (categorias[cat] || 0) + p.precio * (p.stock || 0);
    });
    return Object.entries(categorias)
      .map(([name, valor]) => ({ name, valor }))
      .sort((a, b) => b.valor - a.valor);
  }, [productos]);

  /* ================================
     👥 SECCIÓN USUARIOS
  ================================ */

  const totalUsuarios = usuarios.length;

  const usuariosPorRegion = useMemo(() => {
    const regiones = {};
    usuarios.forEach((u) => {
      const reg = u.region || "Sin región";
      regiones[reg] = (regiones[reg] || 0) + 1;
    });
    return Object.entries(regiones).map(([name, cantidad]) => ({ name, cantidad }));
  }, [usuarios]);

  const usuariosPorEdad = useMemo(() => {
    const rangos = { "18-25": 0, "26-35": 0, "36-45": 0, "46-60": 0, "+60": 0, Desconocido: 0 };
    usuarios.forEach((u) => {
      const e = u.edad;
      if (!e) rangos.Desconocido++;
      else if (e <= 25) rangos["18-25"]++;
      else if (e <= 35) rangos["26-35"]++;
      else if (e <= 45) rangos["36-45"]++;
      else if (e <= 60) rangos["46-60"]++;
      else rangos["+60"]++;
    });
    return Object.entries(rangos).map(([name, cantidad]) => ({ name, cantidad }));
  }, [usuarios]);

  const usuariosPorEstado = useMemo(() => {
    const estados = {};
    usuarios.forEach((u) => {
      const est = u.estado || "Sin estado";
      estados[est] = (estados[est] || 0) + 1;
    });
    return Object.entries(estados).map(([name, value]) => ({
      name,
      value,
      color:
        name === "Activo" ? "#28a745" :
        name === "Pendiente" ? "#ffc107" : "#dc3545",
    }));
  }, [usuarios]);

  /* ================================
     📤 EXPORTAR CSV
  ================================ */

  const handleExportar = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "REPORTE DE INVENTARIO - 1000 Sabores\n";
    csvContent += `Fecha: ${new Date().toLocaleString()}\n`;
    csvContent += `Total de Productos: ${totalProductos}\n`;
    csvContent += `Valor Total del Inventario: ${valorInventario.toLocaleString()}\n`;
    csvContent += `Stock Total: ${stockTotal} unidades\n`;
    csvContent += `Productos Críticos: ${totalCriticos}\n\n`;
    csvContent += "ID,Nombre,Categoria,Precio,Stock,Valor Total,Estado\n";
    productos.forEach((p) => {
      const estado = (p.stock || 0) === 0 ? "SIN STOCK"
        : (p.stock || 0) <= 5 ? "CRITICO"
        : (p.stock || 0) <= 10 ? "BAJO" : "NORMAL";
      const valorTotal = p.precio * (p.stock || 0);
      csvContent += `${p.id},"${p.nombre}","${p.categoria || "Sin categoría"}",${p.precio},${p.stock || 0},${valorTotal},${estado}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `reporte_inventario_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("✅ Reporte CSV descargado exitosamente");
  };

  /* ================================
     🖼️ RENDERIZADO FINAL
  ================================ */

  return (
    <div className="reportes-container">
      <div className="reportes-header">
        <h2 className="reportes-title">📊 Panel de Reportes</h2>
        <p className="reportes-subtitle">Análisis del inventario y usuarios - 1000 Sabores</p>
      </div>

      <div className="reportes-actions">
        <button className="reportes-btn reportes-btn--volver" onClick={() => navigate("/adminHome")}>
          ← Volver al inicio
        </button>
        <button className="reportes-btn reportes-btn--criticos" onClick={() => navigate("/criticos")}>
          📉 Ver productos críticos
        </button>
        <button className="reportes-btn reportes-btn--exportar" onClick={handleExportar}>
          📥 Exportar reporte
        </button>
      </div>

      {/* Estadísticas generales de productos */}
      <div className="reportes-stats-grid">
        <div className="reportes-stat-card reportes-stat-card--primary">
          <div className="reportes-stat-icon">📦</div>
          <div className="reportes-stat-label">Total Productos</div>
          <div className="reportes-stat-value">{totalProductos}</div>
        </div>
        <div className="reportes-stat-card reportes-stat-card--success">
          <div className="reportes-stat-icon">💰</div>
          <div className="reportes-stat-label">Valor Inventario</div>
          <div className="reportes-stat-value">${valorInventario.toLocaleString()}</div>
        </div>
        <div className="reportes-stat-card reportes-stat-card--warning">
          <div className="reportes-stat-icon">📊</div>
          <div className="reportes-stat-label">Stock Total</div>
          <div className="reportes-stat-value">{stockTotal}</div>
        </div>
        <div className="reportes-stat-card reportes-stat-card--danger">
          <div className="reportes-stat-icon">⚠️</div>
          <div className="reportes-stat-label">Productos Críticos</div>
          <div className="reportes-stat-value">{totalCriticos}</div>
        </div>
      </div>

      {/* Gráficas del inventario */}
      <div className="reportes-charts-grid">
        <div className="reportes-chart-card">
          <h3>Stock por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockPorCategoria}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="reportes-chart-card">
          <h3>Distribución de Stock</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={distribucionStock} cx="50%" cy="50%" label outerRadius={90} dataKey="value">
                {distribucionStock.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sección de usuarios */}
      <div className="reportes-table-card">
        <h3>👥 Reportes de Usuarios</h3>
        <div className="reportes-stats-grid">
          <div className="reportes-stat-card reportes-stat-card--primary">
            <div className="reportes-stat-icon">👥</div>
            <div className="reportes-stat-label">Total Usuarios</div>
            <div className="reportes-stat-value">{totalUsuarios}</div>
          </div>
        </div>

        <div className="reportes-charts-grid">
          <div className="reportes-chart-card">
            <h4>Usuarios por Región</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="reportes-chart-card">
            <h4>Distribución por Edad</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorEdad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="reportes-chart-card">
            <h4>Estado de los Usuarios</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={usuariosPorEstado} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
                  {usuariosPorEstado.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
