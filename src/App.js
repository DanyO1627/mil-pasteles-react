import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { CarritoProvider } from "./context/CarritoContext";
import { ProductosProvider } from "./context/InventarioContext.jsx";
import { CategoriasProvider } from "./context/CategoriasContext.jsx";
import { UsuariosProvider } from "./context/UsuariosContext.jsx";
import { AuthProvider } from "./context/AuthContext";

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
import NuevoProducto from "./pages/admin/NuevoProducto.jsx";
import Empleados from "./pages/admin/Empleados";
import HistorialCompras from "./pages/admin/HistorialCompras.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import PerfilCliente from "./pages/PerfilCliente.jsx";


function App() {
  return (

    <AuthProvider>
      <CategoriasProvider>
        <ProductosProvider>
          <CarritoProvider>
            <UsuariosProvider>
              <NavBar />
              <Routes>

                {/* RUTAS PÚBLICAS */}
                <Route path="/" element={<Home />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/ordenCompra" element={<OrdenCompra />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/iniciar-sesion" element={<IniciarSesion />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/detalleProductos/:id" element={<DetalleProductos />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog1" element={<Blog1 />} />
                <Route path="/blog2" element={<Blog2 />} />
                <Route path="/blog3" element={<Blog3 />} />
                <Route path="/blog4" element={<Blog4 />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/compra" element={<Compra />} />
                <Route path="/compraExitosa" element={<CompraExitosa />} />
                <Route path="/boleta" element={<Boleta />} />
                <Route path="/perfil" element={<PerfilCliente />} />


                {/* RUTAS RESTRINGIDAS PARA ADMINS */}
                <Route
                  path="/adminHome"
                  element={
                    <AdminRoute>
                      <AdminHome />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/panelProductos"
                  element={
                    <AdminRoute>
                      <PanelProductos />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/empleados"
                  element={
                    <AdminRoute>
                      <Empleados />
                    </AdminRoute>
                  }
                />



                <Route
                  path="/usuariosRegistrados"
                  element={
                    <AdminRoute>
                      <UsuariosRegistrados />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/nuevaCategoria"
                  element={
                    <AdminRoute>
                      <NuevaCategoria />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/perfilAdmin"
                  element={
                    <AdminRoute>
                      <PerfilAdmin />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/editarUsuario"
                  element={
                    <AdminRoute>
                      <EditarUsuario />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/usuarios"
                  element={
                    <AdminRoute>
                      <Usuarios />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/historialCompras"
                  element={
                    <AdminRoute>
                      <HistorialCompras />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/reportes"
                  element={
                    <AdminRoute>
                      <Reportes />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/editarCategoria/:id"
                  element={
                    <AdminRoute>
                      <EditarCategoria />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/gestionarCategorias"
                  element={
                    <AdminRoute>
                      <GestionarCategorias />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/editar/:id"
                  element={
                    <AdminRoute>
                      <EditarProducto />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/criticos"
                  element={
                    <AdminRoute>
                      <ProductosCriticos />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/nuevoProducto"
                  element={
                    <AdminRoute>
                      <NuevoProducto />
                    </AdminRoute>
                  }
                />

              </Routes>
              <Footer />
              <Chat />
            </UsuariosProvider>
          </CarritoProvider>
        </ProductosProvider>
      </CategoriasProvider>
    </AuthProvider>

  );
}

export default App;