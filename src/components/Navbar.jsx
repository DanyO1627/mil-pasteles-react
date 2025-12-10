import "../styles/style.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CartBadge from "./NavbarCartBadge.jsx";
import logo from "../assets/logo.png";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarioActivo"));
    setUsuario(data);
    // console.log("Navbar: usuarioActivo ahora es:", data);
  }, [location]);   // se ejecuta cada vez que cambia la URL

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    navigate("/iniciar-sesion");
  };

  return (
    <header>
      <div className="container navbar-site">

        {/* LOGO */}
        <Link className="brand" to="/">
          <img src={logo} alt="Logo Pastelería" className="logo-img" />
          <span>Pastelería Mil Sabores</span>
        </Link>

        {/* MENU PRINCIPAL */}
        <nav className="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/blogs">Blog</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>

        {/* CARRITO */}
        <div className="cta">
          <Link className="cart" to="/carrito">
            <CartBadge />
          </Link>
        </div>

        {/* LOGIN / PERFIL / ADMIN / LOGOUT */}
        <div className="cta">

          {/* CLIENTE */}
          {usuario && usuario.rol === "cliente" && (
            <>
              <Link to="/perfil" className="nav-user-link">
                Mi Perfil
              </Link>
              <button
                type="button"
                className="nav-user-link"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            </>
          )}

          {/* ADMIN */}
          {usuario && usuario.rol === "admin" && (
            <>
              <Link to="/adminHome" className="nav-user-link">
                Panel Admin
              </Link>
              <button
                type="button"
                className="nav-user-link"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            </>
          )}


          {/* SIN SESIÓN */}
          {!usuario && (
            <>
              <Link to="/registro">Registrarse</Link>
              <Link to="/iniciar-sesion">Iniciar sesión</Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
}
