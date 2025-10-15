import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productos from "../data/dataProductos";
import '../styles/base.css'; 
import '../styles/cardProducto.css'; 


export default function DetalleProducto() {
  const { id } = useParams(); // viene de la ruta /producto/:id
  const navigate = useNavigate();
  const { addItem } = useCart();

  const producto = productos.find(parametro => parametro.id === Number(id));
    if (!producto) {
    return <p>Producto no encontrado.</p>;
    } 

    const handleAgregar = () => {
    addItem(producto.id);
    // opcional: redirigir al carrito después de agregar
    setTimeout(() => navigate("/carrito"), 1000);
  };

    return (
        <div className="card">
        <img 
        src={producto.imagen}
        alt={producto.nombre}
        />
        <h2 className="card-title">{producto.nombre} </h2>
        
        <p className="card-text"> {producto.descripcion} </p>
        <p className="card-text"> ${producto.precio} </p>

        <button className="btn btn-danger mt-auto">
        onClick={handleAgregar}
        Agregar al carrito
        </button>
        
        </div>
    ); 


}