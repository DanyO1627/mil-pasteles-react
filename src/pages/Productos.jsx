import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CardProductos from '../components/CardProductos';
import lista_productos from '../data/dataProductos';
import Buscador from '../components/Buscador';
import '../styles/base.css'; 
import '../styles/cardProducto.css'; 
import '../styles/detalle.css';

export default function Productos(){
  const [filtro, setFiltro] = useState(""); // estado para lo qeu viene desntro del buscador

  const productosFiltrados = useMemo(() => { // memo es paara que no recalcule cada cosa 
    if (!filtro) return lista_productos;
    const q = filtro.toLowerCase();
    return lista_productos.filter(
      (p) =>
        (p.nombre && p.nombre.toLowerCase().includes(q)) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(q)) ||
        (p.descripcion_larga && p.descripcion_larga.toLowerCase().includes(q))
    );
  }, [filtro]);

  return (

    // nuestros productos
    <div className="--accent-strong">
      <h1 className="text-center text-accent mb-4">Nuestros productos</h1>

    {/* buscador */}
    <Buscador
        onSearch={setFiltro}
        placeholder="Filtrar por nombre o descripción..."
        debounceMs={250}
      />


<div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <div key={producto.id}>
            <CardProductos producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}







  // const [productos, setProductos] = useState([]);

  // cargar los productos por el archivo local
  // useEffect (() => {
  //   setProductos(dataProductos);
  // }, []);
  
//   return (
//     <div className='container my-5'>
//       <h1 className="text-center mb-4" style={{ color: "var(--text)" }} >Nuestros productos:</h1>
      
//       <div className='row'>
//         {productos.map((producto) => (
//           <div key={producto.id} className="col-12 col-sm-6 col-md-4 mb-4">
//             <CardProductos producto={producto} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// 