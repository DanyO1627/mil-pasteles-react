// src/services/categoriasService.js
import axios from "axios";

const BASE_URL = "http://localhost:9090";

const mapCategoria = (c) => ({
  id: c.id,
  nombre: c.nombreCategoria,
  descripcion: c.descripcionCategoria,
  imagen: c.imagenUrl,
  activo: c.activo
});

export async function getCategorias() {
  const res = await axios.get(`${BASE_URL}/categorias`);
  return res.data.map(mapCategoria);
}

export async function createCategoria(front) {
  const back = {
    nombreCategoria: front.nombreCategoria.trim(),
    descripcionCategoria: front.descripcionCategoria?.trim() || "",
    imagenUrl: front.imagenUrl?.trim() || null,
    activo: front.activo ?? true,
  };

  const res = await axios.post(`${BASE_URL}/categorias`, back);
  return mapCategoria(res.data);
}

export async function updateCategoria(id, front) {
  const back = {
    nombreCategoria: front.nombreCategoria.trim(),
    descripcionCategoria: front.descripcionCategoria?.trim() || "",
    imagenUrl: front.imagenUrl?.trim() || null,
    activo: front.activo ?? true,
  };

  const res = await axios.put(`${BASE_URL}/categorias/${id}`, back);
  return mapCategoria(res.data);
}

export async function deleteCategoria(id) {
  await axios.delete(`${BASE_URL}/categorias/${id}`);
  return true;
}
