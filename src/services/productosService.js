import axios from "axios";

export async function fetchProductos() {
  const resp = await axios.get("http://localhost:9090/productos");
  const BASE = "http://localhost:9090";  // como salen del backend

  return resp.data.map((p) => ({
    id: p.id,
    nombre: p.nombreProducto,
    descripcion: p.descripcionProducto,
    descripcion_larga: p.descripcionLarga,
    imagen: p.imagenUrl ? `${BASE}${p.imagenUrl}` : null,
    precio: p.precio,
    stock: p.stock,
    activo: p.activo,
    categoriaId: p.categoria?.id ?? null,
    categoriaNombre: p.categoria?.nombre ?? null
  }));
}
