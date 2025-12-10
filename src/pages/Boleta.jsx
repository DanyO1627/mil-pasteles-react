import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/base.css";
import "../styles/boleta.css";
import logo from "../assets/logo.png";

export default function Boleta() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData = {}, carrito = [], precioTotal = 0, costoEnvio = 0 } = location.state || {};

  // Debug (puedes eliminar estos console.log si ya no los necesitas)
  useEffect(() => {
    console.log("🧾 Datos recibidos en Boleta:");
    console.log("FormData:", formData);
    console.log("Carrito:", carrito);
    console.log("Precio Total:", precioTotal);
    console.log("Costo Envío:", costoEnvio);
  }, [formData, carrito, precioTotal, costoEnvio]);

  // Calcular totales
  const subtotal = precioTotal || 0;
  const totalFinal = subtotal + costoEnvio;

  // Datos generales
  const fecha = new Date().toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const numeroFactura = Math.floor(Math.random() * 1000000);

  // ✅ Método de pago aleatorio
  const metodosPago = ["Tarjeta de débito", "Tarjeta de crédito"];
  const metodoPago = metodosPago[Math.floor(Math.random() * metodosPago.length)];

  // ✅ Atendido por aleatorio
  const empleados = [
    "Daniela Oliveros",
    "Constanza Pino",
    "Evelin Calderon",
  ];
  const atendidoPor = empleados[Math.floor(Math.random() * empleados.length)];

  if (!location.state || !formData.nombre) {
    return (
      <div className="compra-exitosa-container">
        <div className="mensaje-exito">
          <h1>⚠️ No hay información de la compra</h1>
          <p>Por favor, realiza una compra primero.</p>
          <button className="btn-volver" onClick={() => navigate("/productos")}>
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="compra-exitosa-container fade-in">
      {/* ENCABEZADO CON LOGO Y DATOS */}
      <div className="boleta-encabezado-principal">
        <div className="boleta-info-izquierda">
          <h1 className="boleta-titulo-principal">BOLETA</h1>
          <div className="boleta-detalles-principales">
            <p><strong>ID de Factura:</strong> #{numeroFactura}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Cliente:</strong> {formData.nombre} {formData.apellido}</p>
            <p><strong>Correo:</strong> {formData.email}</p>
            <p><strong>Teléfono:</strong> {formData.telefono}</p>
            <p><strong>Dirección:</strong> {formData.calle}
              {formData.departamento && `, Depto ${formData.departamento}`}, {formData.comuna}, {formData.region}
            </p>
          </div>
        </div>

        <div className="boleta-logo-principal">
          <img src={logo} alt="Pastelería Mil Sabores" />
        </div>
      </div>

      {/* NOMBRE DE LA EMPRESA */}
      <h2 className="nombre-empresa-boleta">Pastelería Mil Sabores</h2>

      {/* TABLA DE PRODUCTOS */}
      <div className="datos-section">
        <h2>🧁 Detalle del pedido</h2>
        <table className="tabla-pedido">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {carrito && carrito.length > 0 ? (
              carrito.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.nombre || "Producto sin nombre"}</td>
                  <td>{item.cantidad || 0}</td>
                  <td>${(item.precio || 0).toLocaleString("es-CL")}</td>
                  <td>${((item.precio || 0) * (item.cantidad || 0)).toLocaleString("es-CL")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay productos en el carrito</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TOTALES */}
      <div className="boleta-totales-seccion">
        <div className="totales-lista">
          <p className="total-linea">
            <span>Sub Total:</span>
            <span>${subtotal.toLocaleString("es-CL")}</span>
          </p>
          {costoEnvio > 0 && (
            <p className="total-linea">
              <span>Envío:</span>
              <span>${costoEnvio.toLocaleString("es-CL")}</span>
            </p>
          )}
          <p className="total-linea total-final-linea">
            <span><strong>Total final:</strong></span>
            <span><strong>${totalFinal.toLocaleString("es-CL")}</strong></span>
          </p>
        </div>
      </div>

      <hr className="separador-boleta" />

      {/* PIE DE PÁGINA */}
      <div className="boleta-footer-info">
        <div className="metodo-pago-info">
          <h4>Método de pago</h4>
          <p><strong>{metodoPago}</strong></p>
          <p>Atendido por: <strong>{atendidoPor}</strong></p>
        </div>
        <div className="gracias-mensaje">
          <p>💖 <em>¡Gracias por su compra!</em></p>
        </div>
      </div>

      {/* BOTONES */}
      <div className="no-print">
        <button className="btn-volver" onClick={() => navigate("/")}>
          🏪 Volver a la tienda
        </button>
        <button className="btn-imprimir" onClick={handleImprimir}>
          🖨️ Imprimir Boleta
        </button>
      </div>
    </div>
  );
}
