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
    descripcion_larga: "Nuestra Torta Tres Leches es un clásico irresistible: bizcocho esponjoso bañado en una mezcla de tres tipos de leche (entera, condensada y evaporada), cubierto con crema merengue y decorado con frutas frescas. Perfecta para celebraciones y amantes de los postres tradicionales que buscan un sabor auténtico y sumamente húmedo."
  },
  {
    id: 2,
    nombre: "Tarta de Manzana",
    precio: 8500,
    imagen: tartaManzana,
    descripcion: "Tarta con manzanas caramelizadas y toque de canela.",
    descripcion_larga: "Disfruta de nuestra Tarta de Manzana con su base de masa quebrada crujiente, rellena de láminas de manzana fresca, suavemente caramelizadas y sazonadas con un toque cálido de canela. Horneada a la perfección, es ideal para servir tibia, sola o acompañada de helado."
  },
  {
    id: 3,
    nombre: "Cheesecake Frutos Rojos",
    precio: 10000,
    imagen: cheesecake,
    descripcion: "Cheesecake con base de galleta y cobertura de frutos rojos.",
    descripcion_larga: "El Cheesecake de Frutos Rojos es una delicia cremosa y refrescante. Presenta una base de galleta de mantequilla, un relleno de queso crema suave y aireado, y una generosa capa superior de mermelada y frutos rojos (fresas, arándanos, frambuesas) que aportan un contraste ácido perfecto."
  },
  {
    id: 4,
    nombre: "Brownie XL",
    precio: 7990,
    imagen: brownie,
    descripcion: "Brownie de chocolate intenso con trozos de nuez.",
    descripcion_larga: "Nuestro Brownie XL es la máxima expresión del placer chocolatero. Con una textura interior densa y fudgy, y una capa exterior crujiente, está elaborado con chocolate de alta calidad y enriquecido con abundantes trozos de nueces. Una porción extra grande para compartir o disfrutar en solitario."
  },
  {
    id: 5,
    nombre: "Pie de Limón",
    precio: 8500,
    imagen: pieLimon,
    descripcion: "Pie con base crocante, relleno de limón y merengue dorado.",
    descripcion_larga: "El clásico y vibrante Pie de Limón: una base de masa sablée crocante, un relleno suave y ácido de crema de limón natural, coronado con un imponente merengue suizo tostado a la perfección. Un postre ligero y refrescante que equilibra dulzor y acidez."
  },
  {
    id: 6,
    nombre: "Torta Selva Negra",
    precio: 13500,
    imagen: selvaNegra,
    descripcion: "Bizcocho de chocolate con crema batida y cerezas.",
    descripcion_larga: "La auténtica Torta Selva Negra se compone de capas de bizcocho de chocolate humedecidas con licor de cerezas (Kirsch), intercaladas con crema fresca batida y cerezas ácidas. Una combinación sofisticada de sabores y texturas, ideal para los paladares más exigentes."
  },
  {
    id: 7,
    nombre: "Tarta de Frambuesa",
    descripcion: "Deliciosa tarta casera con frambuesas frescas",
    precio: 9600,
    imagen: tartaFrambuesa,
    descripcion_larga: "Nuestra Tarta de Frambuesa destaca por su frescura y sencillez. Base de masa dulce rellena de crema pastelera casera, y una cobertura generosa de frambuesas frescas que aportan un toque jugoso y ligeramente ácido. Un postre elegante y ligero para cualquier ocasión."
  },
  {
    id: 8,
    nombre: "Torta Milhojas",
    precio: 14000,
    imagen: tortaMilHojas,
    descripcion: "Capas de masa hojaldrada rellenas de manjar casero.",
    descripcion_larga: "La icónica Torta Milhojas: una estructura de finas y crujientes capas de masa de hojaldre horneada a la perfección, generosamente rellenas con nuestro manjar (dulce de leche) artesanal. Cubierta con azúcar flor, es la favorita de quienes aman el contraste de texturas."
  },
  {
    id: 9,
    nombre: "Cupcakes Vainilla",
    precio: 4800,
    imagen: cupcakes,
    descripcion: "Pack de 6 cupcakes con buttercream de colores.",
    descripcion_larga: "Este Pack de 6 Cupcakes de Vainilla es perfecto para compartir. Cada cupcake tiene un bizcocho suave y aromático de vainilla, coronado con un delicado buttercream de colores vibrantes y frescos. Ideales para fiestas, regalos o un capricho dulce."
  },
  {
    id: 10,
    nombre: "Galletas Decoradas",
    precio: 5500,
    imagen: galletas,
    descripcion: "Galletas de mantequilla con glaseado decorativo.",
    descripcion_larga: "Nuestras Galletas Decoradas son pequeñas obras de arte comestibles. Elaboradas con masa de mantequilla de sabor exquisito y cubiertas con un glaseado real detallado, son perfectas para eventos temáticos, regalos personalizados o simplemente para disfrutar de un dulce con un toque especial."
  },
  {
    id: 11,
    nombre: "Torta Zanahoria",
    precio: 11000,
    imagen: tortaZanahoria,
    descripcion: "Bizcocho húmedo con zanahoria, nueces y crema de queso.",
    descripcion_larga: "La Torta de Zanahoria es un manjar especiado y húmedo. Su bizcocho incorpora zanahoria rallada, nueces y canela, creando un sabor profundo. Está generosamente cubierta y rellena con nuestra suave y ácida crema de queso (cream cheese frosting), contrastando a la perfección."
  },
  {
    id: 12,
    nombre: "Tarta de Maracuyá",
    precio: 9000,
    imagen: tartaMaracuya,
    descripcion: "Tarta refrescante con mousse de maracuyá natural.",
    descripcion_larga: "Una opción tropical y ligera: la Tarta de Maracuyá. Cuenta con una base crujiente y está rellena de una aireada mousse hecha con pulpa de maracuyá natural, lo que le otorga un sabor intensamente ácido y refrescante. Perfecta para los días cálidos."
  },
  {
    id: 13,
    nombre: "Torta de Chocolate",
    precio: 12500,
    imagen: tortaChocolate,
    descripcion: "Torta de bizcocho de cacao y crema de chocolate artesanal.",
    descripcion_larga: "La indulgencia pura en nuestra Torta de Chocolate. Capas de bizcocho de cacao oscuro y húmedo, intercaladas con una rica y sedosa crema de chocolate artesanal. Un postre profundo e intenso, garantizando una experiencia de sabor inolvidable para los verdaderos amantes del cacao."
  },
  {
    id: 14,
    nombre: "Red Velvet Cookies",
    precio: 6500,
    imagen: redVelvetCookies,
    descripcion:
      "Galletas suaves sabor red velvet con chips de chocolate blanco.",
    descripcion_larga: "Nuestras Red Velvet Cookies son suaves y masticables por dentro, con el distintivo color rojo terciopelo y un toque sutil a cacao. Están cargadas de chips de chocolate blanco, lo que añade un contraste cremoso y dulce a esta galleta tan popular."
  },
  {
    id: 15,
    nombre: "Banana Muffins",
    precio: 7200,
    imagen: bananaMuffins,
    descripcion: "Muffins esponjosos de plátano con trocitos de nuez.",
    descripcion_larga: "Los Banana Muffins son la opción ideal para un desayuno o merienda reconfortante. Son increíblemente esponjosos, hechos con plátanos maduros para un dulzor natural y salpicados con trocitos de nuez que añaden un crunch delicioso. Un clásico casero y nutritivo."
  },
];

export default lista_productos;