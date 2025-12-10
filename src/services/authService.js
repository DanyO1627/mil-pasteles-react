export async function login(email, clave) {
  const response = await fetch("http://localhost:9090/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, clave })
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return response.json(); // aquí viene id, nombre, rol y el TOKEN
}
