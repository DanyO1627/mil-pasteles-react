// src/services/categoriasApi.js
const BASE_URL = "http://localhost:9090"; // LA BASE DONDE VIVE EL BACKEND
const withHost = (url) => {
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE_URL}${url}`; // si no empeiaza con http, entonces se lo pone
};

const mapCategoria = (c) => ({ // lo que devuelve el backend lo deja legble para el frontend

  // y tiene todas estas opciones para que me deje de fallar y acepte cualquiera
  id: c.id ?? c.idCategoria ?? c.id_categoria,
  nombre: c.nombreCategoria ?? c.nombre_categoria ?? c.nombre,
  descripcion: c.descripcion ?? c.descripcionCategoria ?? c.descripcion_categoria,
  imagen: withHost(c.imagenUrl ?? c.imagen_url),
  activo: c.activo === undefined ? true : Boolean(c.activo), // acepta boolean o 0/1
});


// luego vienen las funciones, es como que se lo pidieran al backend
export async function getCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  const data = await res.json();
  return data.map(mapCategoria);
}

export async function createCategoria(payload) {
  const res = await fetch(`${BASE_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return mapCategoria(await res.json());
}

export async function updateCategoria(id, payload) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return mapCategoria(await res.json());
}

export async function deleteCategoria(id) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar categoría");
  return true;
}
