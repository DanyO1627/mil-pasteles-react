
import "../styles/style.css";
import { Link, NavLink } from "react-router-dom";
import CartBadge from "./NavbarCartBadge.jsx";  
import logo from "../assets/logo.png";

export default function NavBar() {
  return (
    <header>
      <div className="container navbar-site">
        <Link className="brand" to="/">
          <img src={logo} alt="Logo Pastelería" className="logo-img" />
          <span>Pastelería Mil Sabores</span>
        </Link>

        <nav className="menu" aria-label="principal">
          <NavLink to="/">Home</NavLink>
          <a href="#productos">Productos</a>
          <a href="#categorias">Categorias</a>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/blogs">Blog</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>

        <div className="cta">
          <Link className="cart" to="/carrito" aria-label="Carrito">
            <CartBadge />  
          </Link>
        </div>

        <div className="cta">
          <NavLink className="btn-login" to="/registro">Registro</NavLink>
          <NavLink className="btn-login" to="/iniciar-sesion">/Iniciar sesión</NavLink>
        </div>
      </div>
    </header>
  );
}

