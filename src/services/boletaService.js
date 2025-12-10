const API = "http://localhost:9090/api/boletas";


// tuve que hacerlo así de largo porque parece que tomaba u-lo qeu salía de acá como objeto
// y eso no se reconocía en el historial de boletas
// que lo que está preparado para recibir es un array de boletas
export async function getBoletas() {
  const resp = await fetch("http://localhost:9090/api/boletas");

  if (!resp.ok) {
    console.error("🚨 Error HTTP:", resp.status);
    return [];
  }

  const body = await resp.json();
  console.log("📡 Respuesta del backend:", body);

  // 💥 DESANIDADO AUTOMÁTICO
  if (Array.isArray(body)) return body;

  if (Array.isArray(body.content)) return body.content;

  if (Array.isArray(body.boletas)) return body.boletas;

  if (body._embedded?.boletas) return body._embedded.boletas;

  // fallback seguro
  return [];
}

export async function crearBoleta(boleta) {
  const resp = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boleta),
  });

  if (!resp.ok) throw new Error("Error al crear boleta");
  return resp.json();
}

export async function eliminarBoleta(id) {
  const resp = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!resp.ok) throw new Error("Error al eliminar boleta");
}
