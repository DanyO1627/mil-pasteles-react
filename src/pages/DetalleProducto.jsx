import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarrito } from '../context/CarritoContext';
import lista_productos from "../data/dataProductos";
import '../styles/base.css';
import '../styles/cardProducto.css';
import '../styles/carrito.css';
import '../styles/detalle.css';



export default function DetalleProducto() {
  const { id } = useParams(); // viene de la ruta /producto/:id
  const navigate = useNavigate();
  const { agregarAlCarrito, cantidadTotal } = useCarrito();

  const producto = lista_productos.find((parametro) => parametro.id === Number(id));
  if (!producto)
    return <p>Producto no encontrado.</p>;


  const handleAgregar = () => {
    agregarAlCarrito(producto);
    alert("Producto agregado al carrito!");
    setTimeout(() => navigate("/carrito"), 1000);
  };

  return (
    <div className="detalle-card detalle-flex">
      <img className="detalle-imagen" src={producto.imagen} alt={producto.nombre} />
      <div className="detalle-texto">
        <h2 className="card-title">{producto.nombre} </h2>
        <p className="card-text-descrip"> { producto.descripcion_larga} </p>
        <p className="card-text"> <strong> ${producto.precio} </strong> </p>
        <button
          className="btn btn-danger btn-agregar"
          onClick={handleAgregar}
        >
          Agregar al carrito
        </button>
        {/* Mostrar contador de carrito */}
        <div className="detalle-carrito">
          <span className="carrito-icon"> Cantidad del carrito: </span>
          <span className="carrito-contador">{cantidadTotal}</span>
        </div>
      </div>
      {/* <img className="detalle-imagen" src={producto.imagen} alt={producto.nombre} /> */}
    </div>
  );
}