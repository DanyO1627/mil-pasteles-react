import { useEffect, useState } from "react";
import { useCarrito } from '../context/CarritoContext';
import carrito from "../assets/carrito.png";

export default function NavbarCartBadge() {
  const { cantidadTotal } = useCarrito();
  
  return (
      <>
      <img src={carrito} alt="Carrito" className="icon-cart" />
      <span className="cart-count" id="cartCount">{cantidadTotal}</span>
    </>
  );
}
