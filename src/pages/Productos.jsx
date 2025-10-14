import React, { useState, useEffect } from 'react';
import CardProductos from '../components/CardProductos';
import dataProductos from "../data/dataProductos";
import '../styles/base.css'; 
import '../styles/cardProducto.css'; 

export default function Productos() {
  const [productos, setProductos] = useState([]);

  // cargar los productos por el archivo local
  useEffect (() => {
    setProductos(dataProductos);
  }, []);
  
  return (
    <div className='container my-5'>
      <h1 className="text-center mb-4" style={{ color: "var(--text)" }} >Nuestros productos:</h1>
      
      <div className='row'>
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <CardProductos producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}