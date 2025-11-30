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

export async function crearProducto(productoFront) {
  const desc = productoFront.descripcion?.trim() || "Sin descripción";

  const productoBack = {
    nombreProducto: productoFront.nombre?.trim(),
    precio: parseFloat(productoFront.precio),
    imagenUrl: productoFront.imagen?.trim() || "/assets/sin_imagen.webp",
    descripcionProducto: desc,
    descripcionLarga: desc,
    stock: parseInt(productoFront.stock),
    activo: true,
  };

  // Solo agregar categoria si existe
  if (productoFront.categoriaId && productoFront.categoriaId !== "") {
    productoBack.categoria = { 
      id: parseInt(productoFront.categoriaId)
    };
  }

  console.log("📤 ENVIANDO:", JSON.stringify(productoBack, null, 2));

  const resp = await axios.post(`${BASE}/productos`, productoBack);
  return resp.data;
}