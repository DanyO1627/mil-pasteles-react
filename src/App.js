import React from 'react';
import { Routes, Route } from "react-router-dom";

import { ProductosProvider } from './context/InventarioContext';
import { CarritoProvider } from './context/CarritoContext'; 

import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Blogs from "./pages/Blogs";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Blog3 from "./pages/Blog3";
import Blog4 from "./pages/Blog4";

import AdminHome from './pagesAdmin/AdminHome'; 
import PanelProductos from './pagesAdmin/PanelProductos';
import ProductosCriticosAdmin from './pagesAdmin/ProductosCriticos';
import EditarProducto from './pagesAdmin/EditarProducto'; // provisorio mio
// falta  reportes

import "bootstrap/dist/css/bootstrap.min.css";
import '../src/styles/base.css'
import '../src/styles/cardProducto.css'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categorias from './pages/Categorias';


export default function App() {
  return (
    <ProductosProvider>
    <CarritoProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog1" element={<Blog1 />} />
            <Route path="/blog2" element={<Blog2 />} />
            <Route path="/blog3" element={<Blog3 />} />
            <Route path="/blog4" element={<Blog4 />} />
            <Route path="/categorias" element={<Categorias />} />

            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/panel/productos" element={<PanelProductos />} />
            <Route path="/admin/criticos" element={<ProductosCriticosAdmin />} />
            <Route path="/admin/editar/:id" element={<EditarProducto />} />
            
            <Route path="/admin/productos/criticos" element={<div>Críticos - (pendiente)</div>} />
            <Route path="/admin/reportes" element={<div>Reportes - (pendiente)</div>} />


          </Routes>
        </main>
        <Footer />
      </div>
    </CarritoProvider>
    </ProductosProvider>
  );
}