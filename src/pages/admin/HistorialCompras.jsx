import React, { useState, useEffect } from "react";
import { obtenerBoletas, limpiarBoletas } from "../../data/dataBoletas";
import "../../styles/stylesAdmin/historialCompras.css";

export default function HistorialCompras() {
  const [boletas, setBoletas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const data = obtenerBoletas();
    setBoletas(data);
  }, []);

  const handleBuscar = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const handleLimpiar = () => {
    if (window.confirm("¿Seguro que deseas borrar todo el historial de boletas?")) {
      limpiarBoletas();
      setBoletas([]);
    }
  };

  const boletasFiltradas = boletas.filter(
    (b) =>
      b.cliente.nombre.toLowerCase().includes(busqueda) ||
      b.cliente.apellido.toLowerCase().includes(busqueda) ||
      b.id.toString().includes(busqueda)
  );

  return (
    <div className="boletas-wrapper">
      <div className="boletas-container">
        <h2 className="boletas-titulo">🧾 Historial de Boletas</h2>
        <p className="boletas-subtitulo">
          Aquí puedes revisar todas las ventas registradas en el sistema.
        </p>

        {/* Barra de búsqueda */}
        <div className="boletas-busqueda">
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={busqueda}
            onChange={handleBuscar}
          />
          <button className="btn-limpiar" onClick={handleLimpiar}>
            🗑️ Limpiar Historial
          </button>
        </div>

        {/* Tabla de boletas */}
        <div className="tabla-scroll">
          <table className="tabla-boletas">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Método Pago</th>
                <th>Atendido Por</th>
              </tr>
            </thead>
            <tbody>
              {boletasFiltradas.length > 0 ? (
                boletasFiltradas.map((b) => (
                  <tr key={b.id}>
                    <td>#{b.id}</td>
                    <td>{b.fecha}</td>
                    <td>
                      {b.cliente.nombre} {b.cliente.apellido}
                      <br />
                      <small>{b.cliente.email}</small>
                    </td>
                    <td>
                      {b.carrito.map((p, i) => (
                        <div key={i} className="producto-item">
                          {p.nombre} x{p.cantidad}
                        </div>
                      ))}
                    </td>
                    <td>${b.totalFinal.toLocaleString("es-CL")}</td>
                    <td>{b.metodoPago}</td>
                    <td>{b.atendidoPor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="sin-boletas">
                    No hay boletas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
