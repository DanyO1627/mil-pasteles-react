// src/data/dataBoleta.js

// 🧾 Boletas iniciales de ejemplo
const boletasIniciales = [
  {
    id: 100001,
    fecha: "01/10/2025",
    cliente: {
      nombre: "María",
      apellido: "González",
      email: "maria.gonzalez@example.com",
      telefono: "+56 9 1234 5678",
      direccion: "Los Pinos 123, Las Condes, RM",
    },
    carrito: [
      { id: 1, nombre: "Torta Tres Leches", cantidad: 1, precio: 12000, total: 12000 },
      { id: 2, nombre: "Pie de Limón", cantidad: 2, precio: 5500, total: 11000 },
    ],
    subtotal: 23000,
    costoEnvio: 3000,
    totalFinal: 26000,
    metodoPago: "Tarjeta de débito",
    atendidoPor: "Constanza Pino",
  },
  {
    id: 100002,
    fecha: "03/10/2025",
    cliente: {
      nombre: "Carlos",
      apellido: "Rojas",
      email: "carlos.rojas@example.com",
      telefono: "+56 9 8765 4321",
      direccion: "Av. Los Álamos 45, Ñuñoa, RM",
    },
    carrito: [
      { id: 3, nombre: "Cheesecake Frambuesa", cantidad: 1, precio: 9500, total: 9500 },
      { id: 4, nombre: "Brownie con Nueces", cantidad: 3, precio: 2500, total: 7500 },
    ],
    subtotal: 17000,
    costoEnvio: 2500,
    totalFinal: 19500,
    metodoPago: "Tarjeta de crédito",
    atendidoPor: "Evelin Calderon",
  },
  {
    id: 100003,
    fecha: "05/10/2025",
    cliente: {
      nombre: "Ana",
      apellido: "López",
      email: "ana.lopez@example.com",
      telefono: "+56 9 6543 2109",
      direccion: "Camino Real 56, San Bernardo, RM",
    },
    carrito: [
      { id: 5, nombre: "Tarta de Manzana", cantidad: 1, precio: 7000, total: 7000 },
    ],
    subtotal: 7000,
    costoEnvio: 2000,
    totalFinal: 9000,
    metodoPago: "Tarjeta de crédito",
    atendidoPor: "Daniela Oliveros",
  },
  {
    id: 100004,
    fecha: "07/10/2025",
    cliente: {
      nombre: "Javiera",
      apellido: "Muñoz",
      email: "javiera.munoz@example.com",
      telefono: "+56 9 9988 7766",
      direccion: "San Carlos 789, Maipú, RM",
    },
    carrito: [
      { id: 6, nombre: "Torta Mil Hojas", cantidad: 1, precio: 11000, total: 11000 },
      { id: 7, nombre: "Cupcakes Vainilla", cantidad: 6, precio: 1500, total: 9000 },
    ],
    subtotal: 20000,
    costoEnvio: 3000,
    totalFinal: 23000,
    metodoPago: "Tarjeta de débito",
    atendidoPor: "Constanza Pino",
  },
  {
    id: 100005,
    fecha: "10/10/2025",
    cliente: {
      nombre: "Ricardo",
      apellido: "Fernández",
      email: "ricardo.fernandez@example.com",
      telefono: "+56 9 4455 6677",
      direccion: "Los Robles 432, Puente Alto, RM",
    },
    carrito: [
      { id: 8, nombre: "Brownie Tradicional", cantidad: 2, precio: 2500, total: 5000 },
      { id: 9, nombre: "Cheesecake Maracuyá", cantidad: 1, precio: 9500, total: 9500 },
    ],
    subtotal: 14500,
    costoEnvio: 2500,
    totalFinal: 17000,
    metodoPago: "Tarjeta de crédito",
    atendidoPor: "Evelin Calderon",
  },
  {
    id: 100006,
    fecha: "12/10/2025",
    cliente: {
      nombre: "Lucía",
      apellido: "Vega",
      email: "lucia.vega@example.com",
      telefono: "+56 9 2233 4455",
      direccion: "El Olivar 321, Providencia, RM",
    },
    carrito: [
      { id: 10, nombre: "Torta Chocolate Avellanas", cantidad: 1, precio: 12500, total: 12500 },
    ],
    subtotal: 12500,
    costoEnvio: 2000,
    totalFinal: 14500,
    metodoPago: "Tarjeta de débito",
    atendidoPor: "Daniela Oliveros",
  },
  {
    id: 100007,
    fecha: "14/10/2025",
    cliente: {
      nombre: "Felipe",
      apellido: "Morales",
      email: "felipe.morales@example.com",
      telefono: "+56 9 1199 3344",
      direccion: "Camino del Alba 78, La Florida, RM",
    },
    carrito: [
      { id: 11, nombre: "Tarta de Frutilla", cantidad: 2, precio: 6500, total: 13000 },
    ],
    subtotal: 13000,
    costoEnvio: 2500,
    totalFinal: 15500,
    metodoPago: "Tarjeta de crédito",
    atendidoPor: "Constanza Pino",
  },
  {
    id: 100008,
    fecha: "17/10/2025",
    cliente: {
      nombre: "Camila",
      apellido: "Soto",
      email: "camila.soto@example.com",
      telefono: "+56 9 9988 1122",
      direccion: "Los Maitenes 90, San Miguel, RM",
    },
    carrito: [
      { id: 12, nombre: "Pie de Maracuyá", cantidad: 1, precio: 8000, total: 8000 },
      { id: 13, nombre: "Cupcakes Chocolate", cantidad: 4, precio: 1600, total: 6400 },
    ],
    subtotal: 14400,
    costoEnvio: 2500,
    totalFinal: 16900,
    metodoPago: "Tarjeta de débito",
    atendidoPor: "Evelin Calderon",
  },
  {
    id: 100009,
    fecha: "20/10/2025",
    cliente: {
      nombre: "Pedro",
      apellido: "Lagos",
      email: "pedro.lagos@example.com",
      telefono: "+56 9 5544 1122",
      direccion: "Av. El Bosque 210, Las Condes, RM",
    },
    carrito: [
      { id: 14, nombre: "Torta Selva Negra", cantidad: 1, precio: 13000, total: 13000 },
    ],
    subtotal: 13000,
    costoEnvio: 3000,
    totalFinal: 16000,
    metodoPago: "Tarjeta de crédito",
    atendidoPor: "Daniela Oliveros",
  },
  {
    id: 100010,
    fecha: "25/10/2025",
    cliente: {
      nombre: "Natalia",
      apellido: "Aravena",
      email: "natalia.aravena@example.com",
      telefono: "+56 9 6677 8899",
      direccion: "Av. Central 500, Peñalolén, RM",
    },
    carrito: [
      { id: 15, nombre: "Torta de Zanahoria", cantidad: 1, precio: 9500, total: 9500 },
      { id: 16, nombre: "Tarta de Limón", cantidad: 1, precio: 7000, total: 7000 },
    ],
    subtotal: 16500,
    costoEnvio: 2500,
    totalFinal: 19000,
    metodoPago: "Tarjeta de débito",
    atendidoPor: "Evelin Calderon",
  },
];

// 🧠 Funciones de manejo de boletas
export const obtenerBoletas = () => {
  const data = localStorage.getItem("boletas");
  if (data) return JSON.parse(data);

  // Si no hay datos, inicializa con las boletas de ejemplo
  localStorage.setItem("boletas", JSON.stringify(boletasIniciales));
  return boletasIniciales;
};

export const guardarBoleta = (nuevaBoleta) => {
  const boletas = obtenerBoletas();
  boletas.push(nuevaBoleta);
  localStorage.setItem("boletas", JSON.stringify(boletas));
};

export const limpiarBoletas = () => {
  localStorage.removeItem("boletas");
};
