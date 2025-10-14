// Lista de productos disponibles en la tienda

// en react hay que importarlas una por una f
import tortaTresLeches from "../assets/torta_tres_leches_8910_orig.jpg";
import tartaManzana from "../assets/Tarta-de-manzana-ajustada-web-570x458.jpg";
import cheesecake from "../assets/cheesecake.jpg";
import brownie from "../assets/brownie.webp";
import pieLimon from "../assets/pie_limon.webp";
import selvaNegra from "../assets/tarta-selva-negra.jpg";
import tartaFrambuesa from "../assets/tarta_frambuesa.jpg";
import tortaMilHojas from "../assets/torta mil hojas.jpg";
import cupcakes from "../assets/cupcakes de vainilla.jpg";
import galletas from "../assets/Galletas Decoradas.webp";
import tortaZanahoria from "../assets/Torta Zanahoria.jpg";
import tartaMaracuya from "../assets/tarta_maracuya.avif";
import tortaChocolate from "../assets/torta chocolate.png";
import redVelvetCookies from "../assets/RedVelvetCookies.png";
import bananaMuffins from "../assets/Banana Muffins.png";

const lista_productos = [
  {
    id: 1,
    nombre: "Torta Tres Leches",
    precio: 12000,
    imagen: tortaTresLeches,
    descripcion: "Torta tres leches húmeda, con textura suave y sabor casero.",
  },
  {
    id: 2,
    nombre: "Tarta de Manzana",
    precio: 8500,
    imagen: tartaManzana,
    descripcion: "Tarta con manzanas caramelizadas y toque de canela.",
  },
  {
    id: 3,
    nombre: "Cheesecake Frutos Rojos",
    precio: 10000,
    imagen: cheesecake,
    descripcion: "Cheesecake con base de galleta y cobertura de frutos rojos.",
  },
  {
    id: 4,
    nombre: "Brownie XL",
    precio: 7990,
    imagen: brownie,
    descripcion: "Brownie de chocolate intenso con trozos de nuez.",
  },
  {
    id: 5,
    nombre: "Pie de Limón",
    precio: 8500,
    imagen: pieLimon,
    descripcion: "Pie con base crocante, relleno de limón y merengue dorado.",
  },
  {
    id: 6,
    nombre: "Torta Selva Negra",
    precio: 13500,
    imagen: selvaNegra,
    descripcion: "Bizcocho de chocolate con crema batida y cerezas.",
  },
  {
  id: 7,
  nombre: "Tarta de Frambuesa",
  descripcion: "Deliciosa tarta casera con frambuesas frescas",
  precio: 9600, // acá pasa otra cosa
  imagen: tartaFrambuesa
 },
  {
    id: 8,
    nombre: "Torta Milhojas",
    precio: 14000,
    imagen: tortaMilHojas,
    descripcion: "Capas de masa hojaldrada rellenas de manjar casero.",
  },
  {
    id: 9,
    nombre: "Cupcakes Vainilla",
    precio: 4800,
    imagen: cupcakes,
    descripcion: "Pack de 6 cupcakes con buttercream de colores.",
  },
  {
    id: 10,
    nombre: "Galletas Decoradas",
    precio: 5500,
    imagen: galletas,
    descripcion: "Galletas de mantequilla con glaseado decorativo.",
  },
  {
    id: 11,
    nombre: "Torta Zanahoria",
    precio: 11000,
    imagen: tortaZanahoria,
    descripcion: "Bizcocho húmedo con zanahoria, nueces y crema de queso.",
  },
  {
    id: 12,
    nombre: "Tarta de Maracuyá",
    precio: 9000,
    imagen: tartaMaracuya,
    descripcion: "Tarta refrescante con mousse de maracuyá natural.",
  },
  {
    id: 13,
    nombre: "Torta de Chocolate",
    precio: 12500,
    imagen: tortaChocolate,
    descripcion: "Torta de bizcocho de cacao y crema de chocolate artesanal.",
  },
  {
    id: 14,
    nombre: "Red Velvet Cookies",
    precio: 6500,
    imagen: redVelvetCookies,
    descripcion:
      "Galletas suaves sabor red velvet con chips de chocolate blanco.",
  },
  {
    id: 15,
    nombre: "Banana Muffins",
    precio: 7200,
    imagen: bananaMuffins,
    descripcion: "Muffins esponjosos de plátano con trocitos de nuez.",
  },
];

export default lista_productos;

// lista global para que carrito.js la encuentre
// window.lista_productos = lista_productos;
