import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../context/InventarioContext";
import { useNavigate } from "react-router-dom";
// import lista_productos from "../data/dataProductos";
import "../styles/carrito.css";
import "../styles/base.css"
export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, precioTotal, agregarAlCarrito, procesarCompra, disminuirCantidad } = useCarrito();
  const { productos } = useProductos();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleComprar = () => {
  const resultado = procesarCompra();

  setMensaje(resultado.message);

  if (resultado.success) {
      // mensaje 3 segundos y redirigir a los productos
      setTimeout(() => {
        setMensaje("");
        navigate("/productos");
      }, 3000);
    } else {
      // Limpiar mensaje de error
      setTimeout(() => setMensaje(""), 3000);
    }
  };


  // para que todo se sincronice bien después de que el usuario o el admin manipulen el inventario
  React.useEffect(() => {
  const stored = localStorage.getItem("pasteleria_inventario");
  if (stored) {
    console.log("📦 Inventario actualizado en localStorage detectado");
  }
}, [productos]);




  return (
    <div className="container mt-5 carrito-page">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>

      <div className="row">
        {/* lado izquierod lista de productos */}
        <div className="col-md-6 productos-col">
          <h4 className="mb-3">Agrega más productos</h4>
          <div className="row">
            {productos.map((producto) => (
              <div key={producto.id} className="col-12 col-sm-6 mb-3">
                <div className="card small-card">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="card-img-top small-img"
                  />
                  <div className="card-body p-2 text-center">
                    <h6>{producto.nombre}</h6>
                    <p className="text-muted">${producto.precio.toLocaleString()}</p>
                    <p className="text-muted small">Stock: {producto.stock ?? 0}</p>
                    
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={(producto.stock ?? 0) === 0}> {(producto.stock ?? 0) === 0 ? 'Sin stock' : 'Añadir'}
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*derecha - carrito*/}
        <div className="col-md-6 carrito-col">
          {carrito.length === 0 ? (
            <div className="text-center mt-5">
              <h5>Tu carrito está vacío</h5>
              <button className="btn btn-danger mt-3" onClick={() => navigate('/productos')}>
                Ver productos
              </button>
            </div>
          ) : (
            <>
              <h4 className="mb-3">Tus productos</h4>
              
              {carrito.map((item) => (
  <div key={item.id} className="card mb-3 p-2 d-flex flex-row align-items-center">
    <img 
      src={item.imagen} 
      alt={item.nombre}
      className="img-thumbnail me-3"
      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
    />
    <div className="flex-grow-1">
      <h6 className="mb-1">{item.nombre}</h6>
      <p className="text-muted mb-1">${item.precio.toLocaleString()}</p>

      {/* 👇 contador de cantidad */}
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => agregarAlCarrito({ ...item, stock: item.stock })} // suma uno más
        >
          +
        </button>

        <span>{item.cantidad}</span>

        <button
  className="btn btn-sm btn-outline-secondary"
  onClick={() => disminuirCantidad(item.id)}
>
  −
</button>
      </div>

      <p className="text-muted mb-1 small">
        Subtotal: ${(item.precio * item.cantidad).toLocaleString()}
      </p>
    </div>

    <button
      className="btn btn-outline-danger btn-sm"
      onClick={() => eliminarDelCarrito(item.itemId)}
    >
      🗑️
    </button>
  </div>
))}


              {/*total y acciones*/}
              <div className="card mt-4 p-4 text-center shadow-sm">
                <h5>Total: ${precioTotal.toLocaleString()}</h5>
                <div className="d-flex flex-column gap-2 mt-3">
                  <button 
                    className="btn btn-danger"
                    onClick={handleComprar}
                  > Comprar ahora
                  </button>
                  
                  <button className="btn btn-outline-secondary" onClick={vaciarCarrito}>
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}