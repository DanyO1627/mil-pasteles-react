import "../../styles/style.css";
import logo from "../../assets/logo.png"; // ✅ import correcto

export default function Boleta() {
  const productos = [
    { id: 1, nombre: "Torta Tres Leches", cantidad: 1, precio: 18990 },
    { id: 2, nombre: "Tarta de Berries", cantidad: 2, precio: 17990 },
    { id: 3, nombre: "Cheesecake Frutilla", cantidad: 1, precio: 16990 },
  ];

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return (
    <div className="boleta">
      {/* ENCABEZADO */}
      <header className="boleta-header">
        <div className="boleta-info">
          <h1>BOLETA</h1>
          <p><strong>ID de Factura:</strong> #000123</p>
          <p><strong>Fecha:</strong> 17/10/2025</p>
          <p><strong>Cliente:</strong> Mariana Pérez</p>
          <p><strong>Teléfono:</strong> +56 9 8673 9543</p>
          <p><strong>Dirección:</strong> Av. Providencia 1900, Santiago, Chile</p>
        </div>

        <div className="boleta-logo">
          <img src={logo} alt="Logo Pastelería Mil Sabores" /> {/* ✅ uso correcto */}
          <h2>Pastelería Mil Sabores</h2>
        </div>
      </header>

      {/* TABLA DE PRODUCTOS */}
      <table className="boleta-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.cantidad}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALES */}
      <div className="boleta-totales">
        <p><strong>Sub Total:</strong> ${subtotal.toLocaleString("es-CL")}</p>
        <p><strong>IVA (19%):</strong> ${iva.toLocaleString("es-CL")}</p>
        <p className="boleta-total">
          <strong>Total:</strong> ${total.toLocaleString("es-CL")}
        </p>
      </div>

      {/* PIE DE PÁGINA */}
      <footer className="boleta-footer">
        <div>
          <h4>Método de pago</h4>
          <p><strong>Tarjeta de crédito</strong></p>
          <p>Atendido por: <strong>Evelyn Calderon</strong></p>
        </div>
        <div className="boleta-gracias">
          <p>💖 ¡Gracias por su compra!</p>
        </div>
      </footer>
    </div>
  );
}
