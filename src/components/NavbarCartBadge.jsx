
import { useEffect, useState } from "react";
import carrito from "../assets/carrito.png";

export default function NavbarCartBadge() {
  return (
    <>
      <img src={carrito} alt="Carrito" className="icon-cart" />
    </>
  );
}
