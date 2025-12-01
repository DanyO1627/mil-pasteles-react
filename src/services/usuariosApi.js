// src/services/usuariosApi.js
const BASE_URL = "http://localhost:9090/api/usuarios";

export async function getUsuarios() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}

export async function loginUsuario(payload) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Credenciales incorrectas");

  return await res.json();
}

export async function updateUsuario(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al actualizar usuario");

  return await res.json();
}

export async function deleteUsuario(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar usuario");
}
