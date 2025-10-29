import "../../styles/style.css";
import logo from "../../assets/logo.png";

export default function OrdenCompra() {
  const productos = [
    { id: 1, articulo: "Torta Tres Leches", cantidad: 2, precio: 18990, observaciones: "Entrega el 20/10/2025" },
    { id: 2, articulo: "Tarta de Berries", cantidad: 1, precio: 17990, observaciones: "Decoración especial" },
    { id: 3, articulo: "Cheesecake Frutilla", cantidad: 3, precio: 16990, observaciones: "Caja individual" },
  ];

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return (
    <div className="orden-compra">
      {/* ENCABEZADO */}
      <header className="orden-header">
        <div>
          <h1>ORDEN DE COMPRA</h1>
          <p><strong>N° ORDEN:</strong> 456</p>
          <p><strong>FECHA:</strong> 17/10/2025</p>
        </div>

        <div className="orden-logo">
          <img src={logo} alt="Logo Pastelería Mil Sabores" />
          <h2>Pastelería Mil Sabores</h2>
        </div>
      </header>

      {/* INFORMACIÓN */}
      <section className="orden-info">
        <div>
          <h3>ENVIAR A:</h3>
          <p><strong>Proveedor:</strong> Proveedor Dulce Sabor</p>
          <p><strong>Domicilio:</strong> Av. Azúcar 1234, Santiago</p>
          <p><strong>Contacto:</strong> Ana Gutiérrez</p>
          <p><strong>Teléfono:</strong> +56 9 8765 4321</p>
        </div>

        <div>
          <h3>ENTREGA</h3>
          <p><strong>Lugar:</strong> Sucursal Central</p>
          <p><strong>Plazo:</strong> Antes del 25/10/2025</p>
          <p><strong>Pago:</strong> Transferencia bancaria</p>
        </div>
      </section>

      {/* TABLA DE PRODUCTOS */}
      <table className="orden-tabla">
        <thead>
          <tr>
            <th>#</th>
            <th>Artículo</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.articulo}</td>
              <td>{p.cantidad}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
              <td>{p.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALES */}
      <div className="orden-totales">
        <p><strong>SUBTOTAL:</strong> ${subtotal.toLocaleString("es-CL")}</p>
        <p><strong>IVA (19%):</strong> ${iva.toLocaleString("es-CL")}</p>
        <p className="orden-total"><strong>TOTAL:</strong> ${total.toLocaleString("es-CL")}</p>
      </div>

      {/* PIE */}
      <footer className="orden-footer">
        <p><strong>Autorizó:</strong> Lorena Alvarado</p>
        <p><strong>Para:</strong> Proveedor Dulce Sabor</p>
        <p>💖 ¡Gracias por preferirnos!</p>
      </footer>
    </div>
  );
}
