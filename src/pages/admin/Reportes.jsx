import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/InventarioContext";
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

  // EXPORTAR ARCHIVO CSV

  const handleExportar = () => {
    // Crear el contenido CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Encabezado del reporte
    csvContent += "REPORTE DE INVENTARIO - PASTELERÍA\n";
    csvContent += `Fecha: ${new Date().toLocaleString()}\n`;
    csvContent += `Total de Productos: ${totalProductos}\n`;
    csvContent += `Valor Total del Inventario: ${valorInventario.toLocaleString()}\n`;
    csvContent += `Stock Total: ${stockTotal} unidades\n`;
    csvContent += `Productos Críticos: ${totalCriticos}\n\n`;
    
    // Encabezados de la tabla
    csvContent += "ID,Nombre,Categoria,Precio,Stock,Valor Total,Estado\n";
    
    // Datos de cada producto
    productos.forEach((p) => {
      const estado = (p.stock || 0) === 0 ? "SIN STOCK" 
                   : (p.stock || 0) <= 5 ? "CRITICO" 
                   : (p.stock || 0) <= 10 ? "BAJO" 
                   : "NORMAL";
      
      const valorTotal = p.precio * (p.stock || 0);
      
      csvContent += `${p.id},"${p.nombre}","${p.categoria || "Sin categoría"}",${p.precio},${p.stock || 0},${valorTotal},${estado}\n`;
    });
    
    // Crear y descargar el archivo
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
          Análisis completo del inventario de pastelería 1000 sabores
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

      {/* ========== GRÁFICAS ========== */}
      <div className="reportes-charts-grid">
        {/* Gráfica 1: Stock por categoría */}
        <div className="reportes-chart-card">
          <h3 className="reportes-chart-title">Stock por Categoría</h3>
          <div className="reportes-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#8884d8" name="Unidades" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica 2: Distribución de stock */}
        <div className="reportes-chart-card">
          <h3 className="reportes-chart-title">
            Distribución por Estado de Stock
          </h3>
          <div className="reportes-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionStock}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distribucionStock.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica 3: Top 5 productos más caros */}
        <div className="reportes-chart-card">
          <h3 className="reportes-chart-title">Top 5 Productos Más Caros</h3>
          <div className="reportes-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCaros} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="precio" fill="#82ca9d" name="Precio ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica 4: Valor por categoría */}
        <div className="reportes-chart-card">
          <h3 className="reportes-chart-title">
            Valor del Inventario por Categoría
          </h3>
          <div className="reportes-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={valorPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#ffc658" name="Valor ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ========== TABLA DE PRODUCTOS CRÍTICOS ========== */}
      <div className="reportes-table-card">
        <h3 className="reportes-chart-title">Productos que Requieren Atención</h3>
        {criticos.length === 0 ? (
          <p className="reportes-empty">
            🎉 ¡Excelente! Todos los productos tienen stock suficiente.
          </p>
        ) : (
          <table className="reportes-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {criticos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria || "Sin categoría"}</td>
                  <td>${producto.precio.toLocaleString()}</td>
                  <td>
                    <strong>{producto.stock || 0}</strong> unidades
                  </td>
                  <td>
                    <span
                      className={`reportes-stock-badge ${
                        producto.stock === 0
                          ? "reportes-stock-badge--critico"
                          : "reportes-stock-badge--bajo"
                      }`}
                    >
                      {producto.stock === 0 ? "SIN STOCK" : "CRÍTICO"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}