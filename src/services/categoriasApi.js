const BASE_URL = "http://localhost:9090";

export async function getCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");

  const data = await res.json();

  return data.map((c) => ({
    id: c.id_categoria,
    nombre: c.nombre_categoria,          
    descripcion: c.descripcion_categoria,
    imagen: `http://localhost:9090${c.imagen_url}`, // prefijo de url como en productos
    activo: c.activo === 1
  }));
}


export async function createCategoria(payload) {
  const res = await fetch(`${BASE_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return await res.json();
}

export async function updateCategoria(id, payload) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return await res.json();
}

export async function deleteCategoria(id) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
  return true;
}
