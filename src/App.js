import React from 'react';
import Productos from "./pages/Productos";
import "bootstrap/dist/css/bootstrap.min.css";
import '../src/styles/base.css'
import '../src/styles/cardProducto.css'
import NavBar from './components/NavBar';
import Footer from './components/Footer';


function App() { // cuando arranque la app, va a mostrar la pag de productos
  return (
  <div>
      <NavBar />
      <Productos />
      <Footer />
  </div>
    );
}

export default App;