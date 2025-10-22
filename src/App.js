import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { CarritoProvider } from "./pages/CarritoContext";
import { ProductosProvider } from "./context/InventarioContext.jsx";
import { CategoriasProvider } from "./context/CategoriasContext.jsx";

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
import Blogs from "./pages/Blogs";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Blog3 from "./pages/Blog3";
import Blog4 from "./pages/Blog4";
import Categorias from "./pages/Categorias.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";

function App() {
  return (
    <CategoriasProvider>
    <ProductosProvider>
    <CarritoProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/boleta" element={<Boleta />} />
        <Route path="/ordenCompra" element={<OrdenCompra />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog3" element={<Blog3 />} />
        <Route path="/blog4" element={<Blog4 />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminHome" element ={<AdminHome/>}/>
      </Routes>

      <Footer />
      <Chat />
    </CarritoProvider>
    </ProductosProvider>
    </CategoriasProvider>
  );
}

export default App;