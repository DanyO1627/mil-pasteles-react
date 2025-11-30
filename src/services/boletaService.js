import axios from "axios";
export const crearBoleta = async (boletaData) => {
  const respuesta = await fetch("http://localhost:9090/api/boletas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(boletaData),
  });

  if (!respuesta.ok) {
    throw new Error("Error al crear boleta");
  }

  return respuesta.json();
};

