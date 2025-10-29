import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../context/InventarioContext";
import "../utils/Carrito.logic.js"; // PARA PRUEBAS SOBRE  CARRITO
import { useNavigate } from "react-router-dom"; // <- REACT ROUTER DOM
import "../styles/base.css";
import "../styles/carrito.css";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, precioTotal, agregarAlCarrito, disminuirCantidad } = useCarrito();
  const { productos } = useProductos();
  const navigate = useNavigate(); // acá creabamos la const para navigate

  const handleComprar = () => {
    const result = window.CarritoLogic.handleComprar(carrito.length);
    if (result.type === "alert") {
      alert(result.message);
    } else if (result.type === "navigate") {
      navigate(result.to);
    }
  };


  React.useEffect(() => { // cambiado para las pruebas
    const stored = localStorage.getItem("pasteleria_inventario");
    if (window.CarritoLogic.hasInventarioEnLocalStorage(stored)) {
      console.log("📦 Inventario actualizado en localStorage detectado");
    }
  }, [productos]);


  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">🛒 Carrito de Compras</h2>

      <div className="carrito-contenido">
        {/* Columna izquierda - Lista de productos */}
        <div className="carrito-productos">
          <h4 className="seccion-titulo">Agrega más productos</h4>
          <div className="productos-grid">
            {productos.map((producto) => (
              <div key={producto.id} className="producto-card">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
                <div className="producto-info">
                  <h6 className="producto-nombre">{producto.nombre}</h6>
                  <p className="producto-precio">${producto.precio.toLocaleString()}</p>
                  <p className="producto-stock">Stock: {producto.stock ?? 0}</p>

                  <button
                    className="btn-agregar"
                    onClick={() => agregarAlCarrito(producto)}
                    disabled={window.CarritoLogic.shouldDisableAddButton(producto.stock)}
                  >

                    {(producto.stock ?? 0) === 0 ? 'Sin stock' : 'Añadir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha - Carrito */}
        <div className="carrito-resumen">
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <h5>Tu carrito está vacío</h5>
              {/* algo que usamos mucho para navegar entre páginas (react-router-dom) fueron los botones */}
              <button
                className="btn-ver-productos"
                onClick={() => navigate(window.CarritoLogic.getVerProductosRoute())}
              >
                Ver productos
              </button>

            </div>
          ) : (
            <>
              <h4 className="seccion-titulo">Tus productos</h4>

              <div className="carrito-items">
                {carrito.map((item) => (
                  <div key={item.id} className="carrito-item">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="item-imagen"
                    />
                    <div className="item-detalles">
                      <h6 className="item-nombre">{item.nombre}</h6>
                      <p className="item-precio">${item.precio.toLocaleString()}</p>

                      {/* Contador de cantidad */}
                      <div className="item-cantidad">
                        <button
                          className="btn-cantidad"
                          onClick={() => agregarAlCarrito({ ...item, stock: item.stock })}
                        >
                          +
                        </button>

                        <span className="cantidad-numero">{item.cantidad}</span>

                        <button
                          className="btn-cantidad"
                          onClick={() => disminuirCantidad(item.id)}
                        >
                          −
                        </button>
                      </div>

                      <p className="item-subtotal">
                        Subtotal: ${window.CarritoLogic.calcItemSubtotal(item.precio, item.cantidad).toLocaleString()}
                      </p>

                    </div>

                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              {/* Total y acciones */}
              <div className="carrito-total">
                <h5 className="total-precio">Total: ${precioTotal.toLocaleString()}</h5>
                <div className="carrito-acciones">
                  <button
                    className="btn-comprar"
                    onClick={handleComprar}
                  >
                    Comprar ahora
                  </button>

                  <button
                    className="btn-vaciar"
                    onClick={vaciarCarrito}
                  >
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