import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { CarritoProvider } from "./context/CarritoContext";
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
import Boleta from "./pages/Boleta.jsx"
import OrdenCompra from "./pages/admin/OrdenCompra.jsx";
import Blogs from "./pages/Blogs";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Blog3 from "./pages/Blog3";
import Blog4 from "./pages/Blog4";
import Categorias from "./pages/Categorias.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProductos from "./pages/DetalleProducto.jsx";
import PanelProductos from "./pages/admin/PanelProductos.jsx";
import EditarProducto from "./pages/admin/EditarProducto.jsx";
import ProductosCriticos from "./pages/admin/ProductosCriticos.jsx";
import Reportes from "./pages/admin/Reportes.jsx";
import EditarCategoria from "./pages/admin/EditarCategoria.jsx";
import GestionarCategorias from "./pages/admin/GestionarCategorias.jsx";
import NuevaCategoria from "./pages/admin/NuevaCategoria.jsx";
import Compra from "./pages/Compra.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import PerfilAdmin from "./pages/admin/PerfilAdmin.jsx";
import EditarUsuario from "./pages/admin/EditarUsuario.jsx";
import UsuariosRegistrados from "./pages/admin/UsuariosRegistrados.jsx";
import Usuarios from "./pages/admin/Usuarios.jsx";
function App() {
  return (
    <CategoriasProvider>
    <ProductosProvider>
    <CarritoProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ordenCompra" element={<OrdenCompra />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/panelProductos" element={<PanelProductos />} />
        <Route path="/detalleProductos/:id" element={<DetalleProductos />} />
        <Route path="/editar/:id" element={<EditarProducto />} />
        <Route path="/criticos" element={<ProductosCriticos />} />
        <Route path="/editarCategoria/:id" element={<EditarCategoria />} />
        <Route path="/gestionarCategorias" element={<GestionarCategorias />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog3" element={<Blog3 />} />
        <Route path="/blog4" element={<Blog4 />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/adminHome" element ={<AdminHome/>}/>
        <Route path="/nuevaCategoria" element ={<NuevaCategoria/>}/>
        <Route path="/compra" element ={<Compra/>}/>
        <Route path="/compraExitosa" element ={<CompraExitosa/>}/>
        <Route path="/boleta" element ={<Boleta/>}/>
        <Route path="/perfilAdmin" element ={<PerfilAdmin/>}/>
        <Route path="/editarUsuario" element ={<EditarUsuario/>}/>
        <Route path="/usuariosRegistrados" element ={<UsuariosRegistrados/>}/>
        <Route path="/usuarios" element ={<Usuarios/>}/>


      </Routes>
      <Footer />
      <Chat />
    </CarritoProvider>
    </ProductosProvider>
    </CategoriasProvider>
  );
}

export default App;