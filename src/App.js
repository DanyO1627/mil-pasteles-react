import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { CarritoProvider } from "./pages/CarritoContext";

//components
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chat from "./components/Chat.jsx";

//pages
import Registro from "./pages/Registro.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Home from "./pages/Home.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import IniciarSesion from "./pages/IniciarSesion.jsx";
import Boleta from "./pages/admin/Boleta.jsx"
import OrdenCompra from "./pages/admin/OrdenCompra.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

function App() {
  return (
    <CarritoProvider>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/boleta" element={<Boleta />} />
        <Route path="/ordenCompra" element={<OrdenCompra/>}/>
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>

      <Footer/>
      <Chat/>
    </CarritoProvider>
  );
}


export default App;