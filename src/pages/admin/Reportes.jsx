import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
import { useUsuarios } from "../../context/UsuariosContext"; // ✅ nuevo
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
  const { productos, productosCriticos } = useProductos(); // obteiene los datos del context
  const { usuarios } = useUsuarios(); // ✅ nuevos datos del contexto de usuarios

  // Los cálculos

  // Total de productos
  const totalProductos = productos.length;

  // Valor total del inventario
  const valorInventario = useMemo(() => { // memo es react, si ya tiene los datos, no los va a buscar o ocalcular de nuevo
    return productos.reduce((sum, p) => sum + p.precio * (p.stock || 0), 0); // el total
  }, [productos]);

  // stock crítico (<=5)
  const criticos = productosCriticos(5);
  const totalCriticos = criticos.length;

  // stock de todos los productos
  const stockTotal = useMemo(() => {
    return productos.reduce((sum, p) => sum + (p.stock || 0), 0);
  }, [productos]);

  // DATOS PARA LAS GRÁFICAS

  //  stock por categoría -- suma el total y te hace gráfico de barras
  const stockPorCategoria = useMemo(() => {
    const categorias = {};
    productos.forEach((p) => {
      const cat = p.categoria || "Sin categoría";
      if (!categorias[cat]) {
        categorias[cat] = 0;
      }
      categorias[cat] += p.stock || 0;
    });
    return Object.entries(categorias).map(([name, value]) => ({
      name,
      stock: value,
    }));
  }, [productos]);

  // productos por estado de stock
  const distribucionStock = useMemo(() => {
    const sinStock = productos.filter((p) => (p.stock || 0) === 0).length;
    const stockCritico = productos.filter(
      (p) => (p.stock || 0) > 0 && (p.stock || 0) <= 5
    ).length;
    const stockBajo = productos.filter(
      (p) => (p.stock || 0) > 5 && (p.stock || 0) <= 10
    ).length;
    const stockNormal = productos.filter((p) => (p.stock || 0) > 10).length;

    return [
      { name: "Sin stock", value: sinStock, color: "#dc3545" },
      { name: "Stock crítico (1-5)", value: stockCritico, color: "#ff9800" },
      { name: "Stock bajo (6-10)", value: stockBajo, color: "#ffc107" },
      { name: "Stock normal (>10)", value: stockNormal, color: "#28a745" },
    ];
  }, [productos]);

  // los 5 más caros, los busca y los ordena
  const topCaros = useMemo(() => {
    return [...productos]
      .sort((a, b) => b.precio - a.precio)
      .slice(0, 5)
      .map((p) => ({
        name: p.nombre.length > 20 ? p.nombre.slice(0, 20) + "..." : p.nombre,
        precio: p.precio,
      }));
  }, [productos]);

  // valor de cada categoría / precio * stock
  const valorPorCategoria = useMemo(() => {
    const categorias = {};
    productos.forEach((p) => {
      const cat = p.categoria || "Sin categoría";
      if (!categorias[cat]) {
        categorias[cat] = 0;
      }
      categorias[cat] += p.precio * (p.stock || 0);
    });
    return Object.entries(categorias)
      .map(([name, value]) => ({
        name,
        valor: value,
      }))
      .sort((a, b) => b.valor - a.valor);
  }, [productos]);

  /* ───────────────────────────────────────────────
     👥 SECCIÓN NUEVA: ESTADÍSTICAS DE USUARIOS
  ─────────────────────────────────────────────── */

  const totalUsuarios = usuarios.length;

  // usuarios por región
  const usuariosPorRegion = useMemo(() => {
    const regiones = {};
    usuarios.forEach((u) => {
      const reg = u.region || "Sin región";
      regiones[reg] = (regiones[reg] || 0) + 1;
    });
    return Object.entries(regiones).map(([name, cantidad]) => ({ name, cantidad }));
  }, [usuarios]);

  // usuarios por rango de edad
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

  // distribución por estado
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
        name === "Activo"
          ? "#28a745"
          : name === "Pendiente"
          ? "#ffc107"
          : "#dc3545",
    }));
  }, [usuarios]);

  // EXPORTAR ARCHIVO CSV (igual que antes)
  const handleExportar = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "REPORTE DE INVENTARIO - PASTELERÍA\n";
    csvContent += `Fecha: ${new Date().toLocaleString()}\n`;
    csvContent += `Total de Productos: ${totalProductos}\n`;
    csvContent += `Valor Total del Inventario: ${valorInventario.toLocaleString()}\n`;
    csvContent += `Stock Total: ${stockTotal} unidades\n`;
    csvContent += `Productos Críticos: ${totalCriticos}\n\n`;
    csvContent += "ID,Nombre,Categoria,Precio,Stock,Valor Total,Estado\n";
    productos.forEach((p) => {
      const estado = (p.stock || 0) === 0 ? "SIN STOCK" 
                   : (p.stock || 0) <= 5 ? "CRITICO" 
                   : (p.stock || 0) <= 10 ? "BAJO" 
                   : "NORMAL";
      const valorTotal = p.precio * (p.stock || 0);
      csvContent += `${p.id},"${p.nombre}","${p.categoria || "Sin categoría"}",${p.precio},${p.stock || 0},${valorTotal},${estado}\n`;
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
      {/* ========== HEADER ========== */}
      <div className="reportes-header">
        <h2 className="reportes-title">📊 Panel de Reportes</h2>
        <p className="reportes-subtitle">
          Análisis completo del inventario y usuarios de pastelería 1000 sabores
        </p>
      </div>

      {/* ========== BOTONES DE ACCIÓN ========== */}
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

      {/* CARDS ESTADÍSTICAS GENERALES */}
      <div className="reportes-stats-grid">
        <div className="reportes-stat-card reportes-stat-card--primary">
          <div className="reportes-stat-icon">📦</div>
          <div className="reportes-stat-label">Total Productos</div>
          <div className="reportes-stat-value">{totalProductos}</div>
          <div className="reportes-stat-subtitle">En inventario</div>
        </div>
        <div className="reportes-stat-card reportes-stat-card--success">
          <div className="reportes-stat-icon">💰</div>
          <div className="reportes-stat-label">Valor del Inventario</div>
          <div className="reportes-stat-value">
            ${valorInventario.toLocaleString()}
          </div>
          <div className="reportes-stat-subtitle">Valor total estimado</div>
        </div>
        <div className="reportes-stat-card reportes-stat-card--warning">
          <div className="reportes-stat-icon">📊</div>
          <div className="reportes-stat-label">Stock Total</div>
          <div className="reportes-stat-value">{stockTotal}</div>
          <div className="reportes-stat-subtitle">Unidades disponibles</div>
        </div>
        <div className="reportes-stat-card reportes-stat-card--danger">
          <div className="reportes-stat-icon">⚠️</div>
          <div className="reportes-stat-label">Productos Críticos</div>
          <div className="reportes-stat-value">{totalCriticos}</div>
          <div className="reportes-stat-subtitle">Stock ≤ 5 unidades</div>
        </div>
      </div>

      {/* ========== GRÁFICAS INVENTARIO (sin cambios) ========== */}
      {/* ... todas tus gráficas del inventario exactamente como las tienes ... */}

      {/* ========== SECCIÓN NUEVA: REPORTES DE USUARIOS ========== */}
      <div className="reportes-table-card">
        <h3 className="reportes-chart-title">👥 Reportes de Usuarios</h3>
        <div className="reportes-stats-grid">
          <div className="reportes-stat-card reportes-stat-card--primary">
            <div className="reportes-stat-icon">👥</div>
            <div className="reportes-stat-label">Total Usuarios</div>
            <div className="reportes-stat-value">{totalUsuarios}</div>
            <div className="reportes-stat-subtitle">Registrados</div>
          </div>
        </div>

        <div className="reportes-charts-grid">
          {/* Usuarios por Región */}
          <div className="reportes-chart-card">
            <h3 className="reportes-chart-title">Usuarios por Región</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#8884d8" name="Usuarios" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Usuarios por Rango de Edad */}
          <div className="reportes-chart-card">
            <h3 className="reportes-chart-title">Distribución por Rango de Edad</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorEdad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#82ca9d" name="Usuarios" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Estado de los Usuarios */}
          <div className="reportes-chart-card">
            <h3 className="reportes-chart-title">Estado de los Usuarios</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usuariosPorEstado}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={90}
                  dataKey="value"
                >
                  {usuariosPorEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
