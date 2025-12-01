import axios from "axios";

const BASE_URL = "http://localhost:9090";

const withHost = (url) => {
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
};

const mapCategoria = (c) => ({
  id: c.id,
  nombre: c.nombreCategoria,
  descripcion: c.descripcionCategoria,
  imagen: withHost(c.imagenUrl),
  activo: c.activo
});

/* ============================
   GET → obtener todas
============================ */
export async function fetchCategorias() {
  const res = await axios.get(`${BASE_URL}/categorias`);
  return res.data.map(mapCategoria);
}

/* ============================
   POST → crear
============================ */
export async function crearCategoria(front) {
  const back = {
    nombreCategoria: front.nombreCategoria.trim(),
    descripcionCategoria: front.descripcionCategoria?.trim() || "",
    imagenUrl: front.imagenUrl?.trim() || null,
    activo: front.activo ?? true
  };

  const res = await axios.post(`${BASE_URL}/categorias`, back);
  return mapCategoria(res.data);
}

/* ============================
   PUT → actualizar
============================ */
export async function actualizarCategoria(id, front) {
  const back = {
    nombreCategoria: front.nombreCategoria.trim(),
    descripcionCategoria: front.descripcionCategoria?.trim() || "",
    imagenUrl: front.imagenUrl?.trim() || null,
    activo: front.activo ?? true
  };

  const res = await axios.put(`${BASE_URL}/categorias/${id}`, back);
  return mapCategoria(res.data);
}

/* ============================
   DELETE → eliminar
============================ */
export async function eliminarCategoria(id) {
  await axios.delete(`${BASE_URL}/categorias/${id}`);
  return true;
}
