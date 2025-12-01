import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "../../styles/stylesAdmin/reportes.css";

export default function Reportes() {
  const navigate = useNavigate();

  const [reporteInventario, setReporteInventario] = useState(null);
  const [reporteUsuarios, setReporteUsuarios] = useState(null);

  useEffect(() => {
    // INVENTARIO
    fetch("http://localhost:9090/api/reportes/inventario")
      .then((res) => res.json())
      .then((data) => setReporteInventario(data))
      .catch((err) => console.error("Error inventario:", err));

    // USUARIOS
    fetch("http://localhost:9090/api/reportes/usuarios")
      .then((res) => res.json())
      .then((data) => setReporteUsuarios(data))
      .catch((err) => console.error("Error usuarios:", err));
  }, []);

  // cuando cargue que muestre
  if (!reporteInventario || !reporteUsuarios) {
    return <h2 className="cargando-reportes">Cargando reportes...</h2>;
  }

 
  //  DATOS TRAÍDOS DESDE EL BACKEND
  const {
    totalProductos,
    totalCriticos,
    stockTotal,
    valorInventario,
    stockPorCategoria,
    distribucionStock,
    topCaros,
    valorPorCategoria,
  } = reporteInventario;

  const {
    totalUsuarios,
    usuariosPorRegion,
    usuariosPorEdad,
    usuariosPorEstado,
  } = reporteUsuarios;


  // EXPORTAR ARCHIVO CSV DESDE LO QUE ENTREGA EL BACKEND
  const handleExportar = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "REPORTE DE INVENTARIO - PASTELERÍA\n";
    csvContent += `Fecha: ${new Date().toLocaleString()}\n`;
    csvContent += `Total de Productos: ${totalProductos}\n`;
    csvContent += `Valor Total del Inventario: ${valorInventario.toLocaleString()}\n`;
    csvContent += `Stock Total: ${stockTotal} unidades\n`;
    csvContent += `Productos Críticos: ${totalCriticos}\n\n`;

    csvContent += "Categoría,Stock Total,Valor Total\n";
    valorPorCategoria.forEach((c) => {
      csvContent += `${c.name},${c.valor}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reporte_inventario_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("✅ Reporte CSV descargado exitosamente");
  };

  return (
    <div className="reportes-container">
      {/* HEADER */}
      <div className="reportes-header">
        <h2 className="reportes-title">📊 Panel de Reportes</h2>
        <p className="reportes-subtitle">
          Análisis completo del inventario y usuarios de pastelería 1000 sabores
        </p>
      </div>

      {/* BOTONES */}
      <div className="reportes-actions">
        <button
          className="reportes-btn reportes-btn--volver"
          onClick={() => navigate("/adminHome")}
        >
          ← Volver al inicio
        </button>
        <button
          className="reportes-btn reportes-btn--criticos"
          onClick={() => navigate("/criticos")}
        >
          📉 Ver productos críticos
        </button>
        <button
          className="reportes-btn reportes-btn--exportar"
          onClick={handleExportar}
        >
          📥 Exportar reporte
        </button>
      </div>

      {/* STATS INVENTARIO */}
      <div className="reportes-stats-grid">
        <div className="reportes-stat-card reportes-stat-card--primary">
          <div className="reportes-stat-icon">📦</div>
          <div className="reportes-stat-label">Total Productos</div>
          <div className="reportes-stat-value">{totalProductos}</div>
        </div>

        <div className="reportes-stat-card reportes-stat-card--success">
          <div className="reportes-stat-icon">💰</div>
          <div className="reportes-stat-label">Valor del Inventario</div>
          <div className="reportes-stat-value">
            ${valorInventario.toLocaleString()}
          </div>
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

      {/* REPORTES SOBRE EL INVENTARIO */}
      <div className="reportes-charts-grid">
        {/* stock por categoría */}
        <div className="reportes-chart-card">
          <h3 className="reportes-chart-title">Stock por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockPorCategoria}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#8884d8" name="Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* DISTRIBUCIÓN DE STOCK */}
        <div className="reportes-chart-card">
          <h3 className="reportes-chart-title">Distribución de Stock</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribucionStock}
                cx="50%"
                cy="50%"
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                dataKey="value"
              >
                {distribucionStock.map((entry, index) => (
                  <Cell key={index} fill={entry.color || "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TOP 5 MÁS CAROS */}
        <div className="reportes-chart-card">
          <h3 className="reportes-chart-title">Top 5 Productos Más Caros</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCaros}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="precio" fill="#ff9800" name="Precio" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* REPORTE DE LOS USUARIOS */}
      <div className="reportes-table-card">
        <h3 className="reportes-chart-title">👥 Reportes de Usuarios</h3>

        <div className="reportes-stats-grid">
          <div className="reportes-stat-card reportes-stat-card--primary">
            <div className="reportes-stat-icon">👥</div>
            <div className="reportes-stat-label">Total Usuarios</div>
            <div className="reportes-stat-value">{totalUsuarios}</div>
          </div>
        </div>

        

        <div className="reportes-charts-grid">
          {/* región */}
          <div className="reportes-chart-card">
            <h3 className="reportes-chart-title">Usuarios por Región</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* la edad */}
          <div className="reportes-chart-card">
            <h3 className="reportes-chart-title">Rango de Edad</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorEdad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* estado de usuarios */}
          <div className="reportes-chart-card">
            <h3 className="reportes-chart-title">Estado de los Usuarios</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usuariosPorEstado}
                  cx="50%"
                  cy="50%"
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={90}
                  dataKey="value"
                >
                  {usuariosPorEstado.map((e, i) => (
                    <Cell key={i} fill={e.color || "#aaa"} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
