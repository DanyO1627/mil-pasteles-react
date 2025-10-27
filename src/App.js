import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

// Components
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chat from "./components/Chat.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
// Pages
import Home from "./pages/Home.jsx";
import IniciarSesion from "./pages/IniciarSesion.jsx";
import Registrarse from "./pages/Registrarse.jsx";

import UsuariosAdmin from "./pages/Admin/Usuarios.jsx";
import Boleta from "./pages/Boleta.jsx"
import OrdenCompra from "./pages/OrdenCompra.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import EditarUsuario from "./pages/EditarUsuario.jsx";
import UsuariosRegistrados from "./pages/UsuariosRegistrados.jsx";


export default function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boleta" element={<Boleta />} />
        <Route path="/ordenCompra" element={<OrdenCompra />} />
        <Route path="/editarUsuario" element={<EditarUsuario />} />
        <Route path="/usuariosRegistrados" element={<UsuariosRegistrados />} /> 
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
      <Chat />
      </BrowserRouter>
    </>
  );
}
