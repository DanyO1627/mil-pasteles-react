import React from 'react';
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import { CarritoProvider } from './context/CarritoContext'; 
import Blogs from "./pages/Blogs";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import "bootstrap/dist/css/bootstrap.min.css";
import '../src/styles/base.css'
import '../src/styles/cardProducto.css'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';



export default function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </CarritoProvider>
  );
}