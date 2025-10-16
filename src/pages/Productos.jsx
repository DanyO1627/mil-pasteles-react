import React from 'react';
import { Link } from "react-router-dom";
import CardProductos from '../components/CardProductos';
import lista_productos from '../data/dataProductos';
import '../styles/base.css'; 
import '../styles/cardProducto.css'; 
import '../styles/detalle.css';

export default function Productos(){
  return (
 <div className="productos-grid">
      {lista_productos.map((p) => (
        <CardProductos key={p.id} producto={p} />
      ))}
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