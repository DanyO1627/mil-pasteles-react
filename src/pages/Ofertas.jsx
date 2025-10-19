import "../styles/global.css";
import pastel1 from "../assets/torta para 8p.jpg";
import pastel2 from "../assets/torta_san felipe.jpeg";
import pastel3 from "../assets/torta_tres_leches_8910_orig.jpg";

export default function Ofertas() {
  const ofertas = [
    {
      id: 1,
      descuento: "15% OFF",
      nombre: "Torta de Chocolate",
      descripcion: "Bizcocho suave de chocolate y trufas.",
      precio: 18990,
      oferta: 16140,
      imagen: pastel1,
    },
    {
      id: 2,
      descuento: "20% OFF",
      nombre: "Torta San Felipe",
      descripcion: "torta con crema y bizcocho suave.",
      precio: 17990,
      oferta: 14390,
      imagen: pastel2,
    },
    {
      id: 3,
      descuento: "25% OFF",
      nombre: "Torta tres Lecches",
      descripcion: "Rellena de ganache intenso y bizcocho suave.",
      precio: 19990,
      oferta: 14990,
      imagen: pastel3,
    },
  ];

  return (
    <div className="ofertas-container">
      <h1 className="ofertas-titulo"> Ofertas y Promociones</h1>

      <div className="ofertas-lista">
        {ofertas.map((item) => (
          <div key={item.id} className="oferta-card">
            <div className="oferta-descuento">{item.descuento}</div>
            <div className="oferta-contenido">
              <img src={item.imagen} alt={item.nombre} className="oferta-imagen" />
              <div className="oferta-info">
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
                <div className="oferta-precios">
                  <span className="precio-anterior">${item.precio.toLocaleString("es-CL")}</span>
                  <span className="precio-oferta">${item.oferta.toLocaleString("es-CL")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
