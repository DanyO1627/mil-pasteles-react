import { useEffect, useState } from "react";
import carrito from "../assets/carrito.png";

export default function NavbarCartBadge() {
  const [count, setCount] = useState(0);

/*  useEffect(() => {
    const id = setInterval(() => setCount((x) => (x + 1) % 5), 3000);
    return () => clearInterval(id);
  }, []);*/

  return (
    <div className="cart-container">
      <img src={carrito} alt="Carrito" className="icon-cart" />
      {count > 0 && (
        <span className="cart-count" id="cartCount">
          {count}
        </span>
      )}
    </div>
  );
}
