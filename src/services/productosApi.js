const BASE_URL = "http://localhost:9090"; // backend

// con esto estoy centralizando todo el acceso al BACKEND

// Mapea del formato backend → al formato que usa tu frontend
function mapProductoApiToFront(p) {
  return {
    id: p.id,
    nombre: p.nombreProducto,
    descripcion: p.descripcionProducto,
    descripcion_larga: p.descripcionLarga,
    precio: p.precio,
    stock: p.stock,
    imagen: p.imagenUrl, // OJO: esto debe apuntar a /public/assets
    categoriaId: p.categoria ? p.categoria.id : null,
  };
}

export async function getProductos() {
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  const data = await res.json();
  return data.map(mapProductoApiToFront);
}

export async function getProductoById(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  const p = await res.json();
  return mapProductoApiToFront(p);
}

export async function buscarProductosPorNombre(nombre) {
  const res = await fetch(`${BASE_URL}/productos/buscar?nombre=${encodeURIComponent(nombre)}`);
  if (!res.ok) throw new Error("Error al buscar productos");
  const data = await res.json();
  return data.map(mapProductoApiToFront);
}

export async function buscarProductosPorCategoria(idCategoria) {
  const res = await fetch(`${BASE_URL}/productos/categoria/${idCategoria}`);
  if (!res.ok) throw new Error("Error al buscar por categoría");
  const data = await res.json();
  return data.map(mapProductoApiToFront);
}