import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/base.css";
import "../styles/compra.css";

export default function CompraExitosa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData = {}, carrito = [], precioTotal = 0, costoEnvio = 0 } = location.state || {};
  const totalFinal = precioTotal + costoEnvio;

  // Debug: ver qué datos están llegando
  useEffect(() => {
    console.log("📦 Datos recibidos en CompraExitosa:");
    console.log("FormData:", formData);
    console.log("Carrito:", carrito);
    console.log("Precio Total:", precioTotal);
    console.log("Costo Envío:", costoEnvio);
  }, [formData, carrito, precioTotal, costoEnvio]);

  // 🎉 Confeti con canvas simple
  useEffect(() => {
    const confetti = document.createElement("canvas");
    confetti.id = "confetti-canvas";
    confetti.style.position = "fixed";
    confetti.style.top = 0;
    confetti.style.left = 0;
    confetti.style.width = "100%";
    confetti.style.height = "100%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    document.body.appendChild(confetti);

    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;

    const ctx = confetti.getContext("2d");
    const pieces = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      size: 5 + Math.random() * 5,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      speed: 2 + Math.random() * 4,
    }));

    let animationFrame;
    const draw = () => {
      ctx.clearRect(0, 0, confetti.width, confetti.height);
      pieces.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.rect(p.x, p.y, p.size, p.size);
        ctx.fill();
        p.y += p.speed;
        if (p.y > window.innerHeight) p.y = 0;
      });
      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    // eliminar el confeti después de 5 segundos
    setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      confetti.remove();
    }, 5000);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      const canvas = document.getElementById("confetti-canvas");
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);

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

  const handleVerBoleta = () => {
    console.log("🧾 Navegando a boleta con datos:", {
      formData,
      carrito,
      precioTotal,
      costoEnvio
    });
    
    navigate("/boleta", {
      state: { 
        formData: formData, 
        carrito: carrito, 
        precioTotal: precioTotal, 
        costoEnvio: costoEnvio 
      }
    });
  };

  return (
    <div className="compra-exitosa-container fade-in">
      <div className="check-animado">
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>
      </div>

      <div className="mensaje-exito">
        <h1>🎉 ¡Compra realizada con éxito!</h1>
        <p>Gracias por tu compra, <strong>{formData.nombre}</strong>. Tu pedido será enviado pronto 🍰</p>
      </div>

      {/* Datos personales */}
      <div className="datos-section">
        <h2>👤 Datos del cliente</h2>
        <ul>
          <li><strong>Nombre:</strong> {formData.nombre} {formData.apellido}</li>
          <li><strong>Correo:</strong> {formData.email}</li>
          <li><strong>Teléfono:</strong> {formData.telefono}</li>
        </ul>
      </div>

      {/* Dirección */}
      <div className="datos-section">
        <h2>📦 Dirección de envío</h2>
        <ul>
          <li><strong>Calle:</strong> {formData.calle}</li>
          {formData.departamento && <li><strong>Departamento:</strong> {formData.departamento}</li>}
          <li><strong>Comuna:</strong> {formData.comuna}</li>
          <li><strong>Región:</strong> {formData.region}</li>
        </ul>
      </div>

      {/* Resumen */}
      <div className="datos-section">
        <h2>🧁 Detalle del pedido</h2>
        <table className="tabla-pedido">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito && carrito.length > 0 ? (
              carrito.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${(item.precio || 0).toLocaleString()}</td>
                  <td>${((item.precio || 0) * (item.cantidad || 0)).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay productos</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Envío</td>
              <td>${(costoEnvio || 0).toLocaleString()}</td>
            </tr>
            <tr className="total-row">
              <td colSpan="3"><strong>Total final</strong></td>
              <td><strong>${(totalFinal || 0).toLocaleString()}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="compraExitosa-botones">
        <button className="btn-volver" onClick={() => navigate("/productos")}>
          🏪 Volver a la tienda
        </button>

        <button
          className="compraExitosa-botones"
          onClick={handleVerBoleta}
        >
          🧾 Ver Boleta
        </button>
      </div>
    </div>
  );
}