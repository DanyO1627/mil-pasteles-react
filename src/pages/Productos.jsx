import React, { useState, useMemo } from "react";
import CardProductos from '../components/CardProductos';
import { useProductos } from '../context/InventarioContext';
import Buscador from '../components/Buscador';
import '../styles/base.css';
import '../styles/cardProducto.css';
import '../styles/detalle.css';

export default function Productos() {
  const [filtro, setFiltro] = useState("");
  const { productos } = useProductos(); // usa los productos del context


  const productosFiltrados = useMemo(() => { // memo es paara que no recalcule cada cosa 
    if (!filtro) return productos;

    const q = filtro.toLowerCase();
    return productos.filter(
      (p) =>
        (p.nombre && p.nombre.toLowerCase().includes(q)) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(q)) ||
        (p.descripcion_larga && p.descripcion_larga.toLowerCase().includes(q))
    );
  }, [filtro, productos]);

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


<div className="productos-grid-productos">
        {productosFiltrados.map((producto) => (
          <div key={producto.id}>
            <CardProductos producto={producto} />
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center mt-5">
          <p>No se encontraron productos que coincidan con "{filtro}"</p>
        </div>
      )}
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