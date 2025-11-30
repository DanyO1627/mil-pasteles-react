import axios from "axios";

const BASE = "http://localhost:9090";

export async function fetchProductos() {
  const resp = await axios.get(`${BASE}/productos`);

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
    categoriaNombre: p.categoria?.nombre ?? null,
  }));
}

// 🔥 Nuevo: crear producto
export async function crearProducto(productoFront) {
  // Mapear del frontend → backend
  const productoBack = {
    nombreProducto: productoFront.nombre,
    precio: productoFront.precio,
    imagenUrl: productoFront.imagen,
    descripcionProducto: productoFront.descripcion,
    descripcionLarga: productoFront.descripcion,   // o si tienes otro campo, ajústalo
    stock: productoFront.stock,
    activo: true,
    categoria: productoFront.categoriaId
      ? { id: productoFront.categoriaId }
      : null,
  };

  const resp = await axios.post(`${BASE}/productos`, productoBack);
  return resp.data;
}
