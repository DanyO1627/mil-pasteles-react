// Lista de productos disponibles en la tienda

// en react hay que importarlas una por una f
import tortaTresLeches from "../assets/torta_tres_leches_8910_orig.jpg";
import tartaManzana from "../assets/Tarta-de-manzana-ajustada-web-570x458.jpg";
import cheesecake from "../assets/cheesecake.png";
import brownie from "../assets/brownie.webp";
import pieLimon from "../assets/pie_limon.webp";
import selvaNegra from "../assets/tarta-selva-negra.jpg";
import tartaFrambuesa from "../assets/tarta_berries2_home.jpg";
import tortaMilHojas from "../assets/torta mil hojas.jpg";
import cupcakes from "../assets/cupcakes de vainilla.jpg";
import galletas from "../assets/Galletas Decoradas.webp";
import tortaZanahoria from "../assets/Torta Zanahoria.jpg";
import tartaMaracuya from "../assets/tarta_maracuya.avif";
import tortaChocolate from "../assets/torta chocolate.png";
import redVelvetCookies from "../assets/RedVelvetCookies.png";
import bananaMuffins from "../assets/Banana Muffins.png";

// 10 nuevos 
import tiramisu from "../assets/tiramisu.jpg"; 
import macarons from "../assets/maracons.jpg"; 
import mousseChocolate from "../assets/mousse_chocolate.jpg"; 
import volcanChocolate from "../assets/volcan_chocolate.jpg"; 
import tartaPecan from "../assets/tarta_pecan.jpg"; 
import lemonCurdCake from "../assets/lemon_curd_cake.jpg"; 
import eclair from "../assets/eclair.jpg"; 
import rollosCanela from "../assets/rollos_canela.jpg"; 
import PastelImposible from "../assets/pastel_imposible.webp"; 
import chocoChips from "../assets/choco_chips.jpeg"; 

// 7 nuevos
// --- NUEVAS IMPORTACIONES (7 productos, placeholders) ---
import tresChocolates from "../assets/torta_tres_chocolates.jpeg"; 
import flanCasero from "../assets/flan_casero.jpg"; 
import gofresLiege from "../assets/gofres_liege.jpg"; 
import operaCake from "../assets/opera_cake.jpg"; 
import sconeArandanos from "../assets/scone_arandanos.avif"
import palmeraChocolate from "../assets/palmera_chocolate.jpg"; 
import pastelGuayaba from "../assets/pastel_guayaba.jpg";

// 5 nuevos más
import EVE_TortaChocoBlanco from "../assets/torta para 8p.jpg";
import EVE_TortaSanFelipe from "../assets/torta_san felipe.jpeg";
import Eve_TortaSanDaniela from "../assets/tortaSanDaniela.png";
import Eve_TortaChocoyFrutas from "../assets/torta chocolate.png";
// import EVE_TartaFrambuesa from "../assets/EVE_TartaFrambuesa.png";
import tartaBerries2 from "../assets/tarta_berries2_home.jpg";



const lista_productos = [
  {
    id: 1,
    nombre: "Torta Tres Leches",
    precio: 12000,
    imagen: tortaTresLeches,
    descripcion: "Torta tres leches húmeda, con textura suave y sabor casero.",
    descripcion_larga: "Nuestra Torta Tres Leches es un clásico irresistible: bizcocho esponjoso bañado en una mezcla de tres tipos de leche (entera, condensada y evaporada), cubierto con crema merengue y decorado con frutas frescas. Perfecta para celebraciones y amantes de los postres tradicionales que buscan un sabor auténtico y sumamente húmedo.",
    categoriaId: 1, // Antes: "Tortas & Pasteles"
    stock: 10 
  },
  {
    id: 2,
    nombre: "Tarta de Manzana",
    precio: 8500,
    imagen: tartaManzana,
    descripcion: "Tarta con manzanas caramelizadas y toque de canela.",
    descripcion_larga: "Disfruta de nuestra Tarta de Manzana con su base de masa quebrada crujiente, rellena de láminas de manzana fresca, suavemente caramelizadas y sazonadas con un toque cálido de canela. Horneada a la perfección, es ideal para servir tibia, sola o acompañada de helado.",
    categoriaId: 2, // Antes: "Tartas & Pies"
    stock: 14 
  },
  {
    id: 3,
    nombre: "Cheesecake Frutos Rojos",
    precio: 10000,
    imagen: cheesecake,
    descripcion: "Cheesecake con base de galleta y cobertura de frutos rojos.",
    descripcion_larga: "El Cheesecake de Frutos Rojos es una delicia cremosa y refrescante. Presenta una base de galleta de mantequilla, un relleno de queso crema suave y aireado, y una generosa capa superior de mermelada y frutos rojos (fresas, arándanos, frambuesas) que aportan un contraste ácido perfecto.",
    categoriaId: 2, // Antes: "Tartas & Pies"
    stock: 2
  },
  {
    id: 4,
    nombre: "Brownie XL",
    precio: 7990,
    imagen: brownie,
    descripcion: "Brownie de chocolate intenso con trozos de nuez.",
    descripcion_larga: "Nuestro Brownie XL es la máxima expresión del placer chocolatero. Con una textura interior densa y fudgy, y una capa exterior crujiente, está elaborado con chocolate de alta calidad y enriquecido con abundantes trozos de nueces. Una porción extra grande para compartir o disfrutar en solitario.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 3
  },
  {
    id: 5,
    nombre: "Pie de Limón",
    precio: 8500,
    imagen: pieLimon,
    descripcion: "Pie con base crocante, relleno de limón y merengue dorado.",
    descripcion_larga: "El clásico y vibrante Pie de Limón: una base de masa sablée crocante, un relleno suave y ácido de crema de limón natural, coronado con un imponente merengue suizo tostado a la perfección. Un postre ligero y refrescante que equilibra dulzor y acidez.",
    categoriaId: 2, // Antes: "Tartas & Pies"
    stock: 11
  },
  {
    id: 6,
    nombre: "Torta Selva Negra",
    precio: 13500,
    imagen: selvaNegra,
    descripcion: "Bizcocho de chocolate con crema batida y cerezas.",
    descripcion_larga: "La auténtica Torta Selva Negra se compone de capas de bizcocho de chocolate humedecidas con licor de cerezas (Kirsch), intercaladas con crema fresca batida y cerezas ácidas. Una combinación sofisticada de sabores y texturas, ideal para los paladares más exigentes.",
    categoriaId: 1, // Antes: "Tortas & Pasteles"
    stock: 4
  },
  {
    id: 7,
    nombre: "Tarta de Frambuesa",
    descripcion: "Deliciosa tarta casera con frambuesas frescas",
    precio: 9600,
    imagen: tartaFrambuesa,
    descripcion_larga: "Nuestra Tarta de Frambuesa destaca por su frescura y sencillez. Base de masa dulce rellena de crema pastelera casera, y una cobertura generosa de frambuesas frescas que aportan un toque jugoso y ligeramente ácido. Un postre elegante y ligero para cualquier ocasión.",
    categoriaId: 2, // Antes: "Tartas & Pies"
    stock: 13 
  },
  {
    id: 8,
    nombre: "Torta Milhojas",
    precio: 14000,
    imagen: tortaMilHojas,
    descripcion: "Capas de masa hojaldrada rellenas de manjar casero.",
    descripcion_larga: "La icónica Torta Milhojas: una estructura de finas y crujientes capas de masa de hojaldre horneada a la perfección, generosamente rellenas con nuestro manjar (dulce de leche) artesanal. Cubierta con azúcar flor, es la favorita de quienes aman el contraste de texturas.",
    categoriaId: 1, // Antes: "Tortas & Pasteles"
    stock: 7
  },
  {
    id: 9,
    nombre: "Cupcakes Vainilla",
    precio: 4800,
    imagen: cupcakes,
    descripcion: "Pack de 6 cupcakes con buttercream de colores.",
    descripcion_larga: "Este Pack de 6 Cupcakes de Vainilla es perfecto para compartir. Cada cupcake tiene un bizcocho suave y aromático de vainilla, coronado con un delicado buttercream de colores vibrantes y frescos. Ideales para fiestas, regalos o un capricho dulce.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 20 
  },
  {
    id: 10,
    nombre: "Galletas Decoradas",
    precio: 5500,
    imagen: galletas,
    descripcion: "Galletas de mantequilla con glaseado decorativo.",
    descripcion_larga: "Nuestras Galletas Decoradas son pequeñas obras de arte comestibles. Elaboradas con masa de mantequilla de sabor exquisito y cubiertas con un glaseado real detallado, son perfectas para eventos temáticos, regalos personalizados o simplemente para disfrutar de un dulce con un toque especial.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 15 
  },
  {
    id: 11,
    nombre: "Torta Zanahoria",
    precio: 11000,
    imagen: tortaZanahoria,
    descripcion: "Bizcocho húmedo con zanahoria, nueces y crema de queso.",
    descripcion_larga: "La Torta de Zanahoria es un manjar especiado y húmedo. Su bizcocho incorpora zanahoria rallada, nueces y canela, creando un sabor profundo. Está generosamente cubierta y rellena con nuestra suave y ácida crema de queso (cream cheese frosting), contrastando a la perfección.",
    categoriaId: 4, // Antes: "Especialidades & Gourmet"
    stock: 8 
  },
  {
    id: 12,
    nombre: "Tarta de Maracuya",
    precio: 9000,
    imagen: tartaMaracuya,
    descripcion: "Tarta refrescante con mousse de maracuyá natural.",
    descripcion_larga: "Una opción tropical y ligera: la Tarta de Maracuyá. Cuenta con una base crujiente y está rellena de una aireada mousse hecha con pulpa de maracuyá natural, lo que le otorga un sabor intensamente ácido y refrescante. Perfecta para los días cálidos.",
    categoriaId: 4, // Antes: "Especialidades & Gourmet"
    stock: 12 
  },
  {
    id: 13,
    nombre: "Torta de Chocolate",
    precio: 12500,
    imagen: tortaChocolate,
    descripcion: "Torta de bizcocho de cacao y crema de chocolate artesanal.",
    descripcion_larga: "La indulgencia pura en nuestra Torta de Chocolate. Capas de bizcocho de cacao oscuro y húmedo, intercaladas con una rica y sedosa crema de chocolate artesanal. Un postre profundo e intenso, garantizando una experiencia de sabor inolvidable para los verdaderos amantes del cacao.",
    categoriaId: 1, // Antes: "Tortas & Pasteles"
    stock: 11 
  },
  {
    id: 14,
    nombre: "Red Velvet Cookies",
    precio: 6500,
    imagen: redVelvetCookies,
    descripcion:
      "Galletas suaves sabor red velvet con chips de chocolate blanco.",
    descripcion_larga: "Nuestras Red Velvet Cookies son suaves y masticables por dentro, con el distintivo color rojo terciopelo y un toque sutil a cacao. Están cargadas de chips de chocolate blanco, lo que añade un contraste cremoso y dulce a esta galleta tan popular.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 17 
  },
  {
    id: 15,
    nombre: "Banana Muffins",
    precio: 7200,
    imagen: bananaMuffins,
    descripcion: "Muffins esponjosos de plátano con trocitos de nuez.",
    descripcion_larga: "Los Banana Muffins son la opción ideal para un desayuno o merienda reconfortante. Son increíblemente esponjosos, hechos con plátanos maduros para un dulzor natural y salpicados con trocitos de nuez que añaden un crunch delicioso. Un clásico casero y nutritivo.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 16 
  },

  {
    id: 16,
    nombre: "Tiramisú Clásico",
    precio: 9800,
    imagen: tiramisu,
    descripcion: "Postre italiano de mascarpone, café y bizcochos de soletilla.",
    descripcion_larga: "Auténtico Tiramisú italiano, con capas de cremoso queso mascarpone, bizcochos de soletilla bañados en café espresso y un toque de licor, espolvoreado con cacao puro. Un postre elegante y con sabor intenso.",
    categoriaId: 4, // Antes: "Especialidades & Gourmet"
    stock: 9 
  },
  {
    id: 17,
    nombre: "Surtido de Macarons",
    precio: 11000,
    imagen: macarons,
    descripcion: "Caja de 10 macarons franceses de sabores variados.",
    descripcion_larga: "Elegante surtido de 10 Macarons franceses. Con su textura crujiente por fuera y suave por dentro, rellenos de ganache o crema de mantequilla en sabores como frambuesa, pistacho, chocolate y vainilla.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 14 
  },
  {
    id: 18,
    nombre: "Mousse de Chocolate Oscuro",
    precio: 7500,
    imagen: mousseChocolate,
    descripcion: "Mousse aireada de chocolate 70% cacao en copa.",
    descripcion_larga: "Un postre ligero y decadente. Nuestra Mousse de Chocolate Oscuro está hecha con un 70% de cacao, lo que le confiere un sabor profundo y amargo, con una textura increíblemente aireada y sedosa.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 19 
  },
  {
    id: 19,
    nombre: "Volcán de Chocolate",
    precio: 8200,
    imagen: volcanChocolate,
    descripcion: "Bizcocho de chocolate caliente con centro líquido.",
    descripcion_larga: "El icónico Volcán de Chocolate: un pequeño bizcocho con un exterior firme y un interior fundente de chocolate oscuro que se derrama al cortar. Se recomienda servir con helado de vainilla.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 12 
  },
  {
    id: 20,
    nombre: "Tarta de Pecan y Caramelo",
    precio: 10500,
    imagen: tartaPecan,
    descripcion: "Tarta tradicional de nueces pecanas y relleno de caramelo.",
    descripcion_larga: "Clásica Tarta de Pecan, con una masa quebrada y un relleno dulce de caramelo denso, cubierto con una abundante capa de nueces pecanas enteras y tostadas. Ideal para los amantes del sabor a nuez.",
    categoriaId: 2, // Antes: "Tartas & Pies"
    stock: 10 
  },
  {
    id: 21,
    nombre: "Lemon Curd Cake",
    precio: 11500,
    imagen: lemonCurdCake,
    descripcion: "Torta de vainilla y limón, con relleno de crema ácida de limón.",
    descripcion_larga: "Una Torta húmeda y refrescante. Capas de bizcocho de vainilla intercaladas con un vibrante y ácido Lemon Curd (crema de limón) y cubierta con un suave glaseado de limón. Perfecta para días soleados.",
    categoriaId: 1, // Antes: "Tortas & Pasteles"
    stock: 7 
  },
  {
    id: 22,
    nombre: "Éclair de Café",
    precio: 5000,
    imagen: eclair,
    descripcion: "Masa choux rellena de crema de café y glaseado.",
    descripcion_larga: "Delicados Éclairs hechos con masa choux ligera, rellenos de una suave crema pastelera con sabor a café y coronados con un glaseado brillante de moka. Un clásico de la pastelería francesa.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 18 
  },
  {
    id: 23,
    nombre: "Rollitos de Canela (Pack 6)",
    precio: 7800,
    imagen: rollosCanela,
    descripcion: "Roscas de masa tierna con canela y glaseado de queso crema.",
    descripcion_larga: "Pack de 6 Rollitos de canela (Cinnamon Rolls) recién horneadas, suaves y esponjosas, con abundante relleno de azúcar moreno y canela, cubiertas con un cremoso glaseado de queso.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 15 
  },
  {
    id: 24,
    nombre: "Pastel Imposible (Choco Flan)",
    precio: 13000,
    imagen: PastelImposible,
    descripcion: "Bizcocho de chocolate y flan de caramelo, horneados juntos.",
    descripcion_larga: "El fascinante Pastel Imposible o Chocoflan. Combina una base de bizcocho de chocolate húmedo con una capa superior de flan cremoso de vainilla, bañado en abundante caramelo. Al hornearse, el flan y el pastel invierten sus posiciones, creando un postre mágico y delicioso.",
    categoriaId: 4, // Antes: "Especialidades & Gourmet"
    stock: 8 
  },
  {
    id: 25,
    nombre: "Galletas Chocochips XL (Pack 4)",
    precio: 5200,
    imagen: chocoChips,
    descripcion: "Pack de 4 galletas XL de mantequilla con chips de chocolate.",
    descripcion_larga: "El clásico americano llevado a un nivel superior. Cuatro galletas XL de mantequilla, suaves por dentro y ligeramente crujientes por fuera, con una dosis extra de chips de chocolate semi-amargo que se funden en la boca.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 20 
  },
  // 7 nuevos
  {
    id: 26,
    nombre: "Tarta de Tres Chocolates",
    precio: 14500,
    imagen: tresChocolates,
    descripcion: "Tarta con capas de chocolate blanco, con leche y oscuro.",
    descripcion_larga: "Un postre sin horno y con capas bien definidas: la Tarta Tres Chocolates. Combina una base de galleta de chocolate con mousses de chocolate blanco, con leche y oscuro, creando un degradado de sabor y textura inolvidable. Terminada con virutas de chocolate.",
    categoriaId: 4, // Antes: "Especialidades & Gourmet"
    stock: 10 
  },
  {
    id: 27,
    nombre: "Flan de Huevo Casero",
    precio: 6900,
    imagen: flanCasero,
    descripcion: "Flan tradicional cremoso con abundante caramelo líquido.",
    descripcion_larga: "Nuestro Flan de Huevo Casero es una receta de la abuela: suave, sedoso y con un sabor intenso a vainilla y huevo. Se hornea lentamente al baño maría para lograr una textura perfecta, bañado en un caramelo líquido dorado y abundante.",
    categoriaId: 4, // Antes: "Especialidades & Gourmet"
    stock: 13 
  },
  {
    id: 28,
    nombre: "Gofres de Lieja (Pack 4)",
    precio: 8900,
    imagen: gofresLiege,
    descripcion: "Waffles belgas de masa brioche con azúcar perla caramelizada.",
    descripcion_larga: "Auténticos Gofres de Lieja (Waffles): hechos con una masa brioche fermentada, incorporan trozos de azúcar perla que se caramelizan al hornear, dándoles un exterior crujiente y un interior suave. Perfectos para comer solos o con toppings.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 16 
  },
  {
    id: 29,
    nombre: "Torta Ópera",
    precio: 15000,
    imagen: operaCake,
    descripcion: "Clásico pastel francés de almendra, café y ganache de chocolate.",
    descripcion_larga: "La elegante Torta Ópera es un postre de origen francés compuesto por capas de bizcocho Joconde (almendra), jarabe de café, crema de mantequilla de café y una rica ganache de chocolate, todo cubierto con un glaseado de chocolate brillante.",
    categoriaId: 1, // Antes: "Tortas & Pasteles"
    stock: 7 
  },
  {
    id: 30,
    nombre: "Scone de Arándanos",
    precio: 4500,
    imagen: sconeArandanos,
    descripcion: "Panecillo inglés suave con arándanos frescos.",
    descripcion_larga: "Scone de Arándanos tradicionalmente horneado: un panecillo ligeramente dulce, de textura tierna por dentro y dorada por fuera, relleno de arándanos jugosos. Ideal para acompañar el té con crema y mermelada.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 19 
  },
  {
    id: 31,
    nombre: "Palmeritas de Chocolate (Pack 6)",
    precio: 6000,
    imagen: palmeraChocolate,
    descripcion: "Palmeras de hojaldre crujiente cubiertas de chocolate.",
    descripcion_larga: "Un clásico de la panadería, nuestras Palmeritas están hechas con hojaldre ultra crujiente y con una capa generosa de chocolate con leche. Su forma de corazón y su textura aireada las hacen irresistibles.",
    categoriaId: 3, // Antes: "Individuales & Repostería Fina"
    stock: 17 
  },
  {
    id: 32,
    nombre: "Pastel de Queso y Guayaba",
    precio: 10800,
    imagen: pastelGuayaba,
    descripcion: "Cheesecake tropical con mermelada y trozos de guayaba.",
    descripcion_larga: "Una fusión tropical. Este pastel combina la cremosidad de un cheesecake horneado con la dulzura y el ligero toque ácido de la guayaba. Con una base de galleta y una cobertura de mermelada y trozos de fruta.",
    categoriaId: 2, // Antes: "Tartas & Pies"
    stock: 11 
  },

{
      id: 33,
      nombre: "Torta Chocolate Blanco",
      precio: 13900,
      imagen: EVE_TortaChocoBlanco, 
      descripcion: "Esponjosa torta de vainilla con crema de chocolate blanco y frutas.",
      descripcion_larga: "Una torta elegante y suave. Consiste en capas de bizcocho de vainilla, rellenas con una delicada mousse de chocolate blanco y trozos de frutas frescas de temporada. Es la combinación perfecta entre dulzura cremosa y notas frutales.",
      categoriaId: 1, 
      stock: 9 
    },
    {
      id: 34,
      nombre: "Torta San Felipe",
      precio: 11200,
      imagen: EVE_TortaSanFelipe,
      descripcion: "Torta tradicional chilena de panqueque, nueces y manjar.",
      descripcion_larga: "Un clásico de la repostería chilena. Esta Torta San Felipe combina finas láminas de panqueque de nuez, rellenas con abundante manjar casero (dulce de leche) y cubiertas con un glaseado de nueces picadas. Ideal para quienes aman los sabores intensos y tradicionales.",
      categoriaId: 1, 
      stock: 6 
    },
    {
      id: 35,
      nombre: "Torta San Daniela",
      precio: 12500,
      imagen: Eve_TortaSanDaniela,
      descripcion: "Torta de hojarasca con crema pastelera y mermelada de damasco.",
      descripcion_larga: "La Torta San Daniela es una variante deliciosa de la torta de hojarasca. Combina capas crujientes de hojarasca, crema pastelera suave de vainilla y una capa de mermelada ácida de damasco, creando un equilibrio perfecto entre dulzor y textura.",
      categoriaId: 1, 
      stock: 8 
    },
    {
      id: 36,
      nombre: "Torta Chocolate y Frutas",
      precio: 14900,
      imagen: Eve_TortaChocoyFrutas,
      descripcion: "Torta de chocolate húmedo cubierta con ganache y frutas frescas.",
      descripcion_larga: "Nuestra Torta de Chocolate y Frutas es pura indulgencia. Un bizcocho de chocolate extra húmedo, bañado en jarabe de cacao y cubierto con una rica ganache de chocolate, finalizada con una decoración fresca de frutos rojos y kiwis.",
      categoriaId: 1, 
      stock: 10 
    },
    {
      id: 37,
      nombre: "Tarta de Frambuesa (Grande)",
      precio: 10500,
      imagen: tartaBerries2,
      descripcion: "Tarta clásica de masa dulce rellena de crema y frambuesas.",
      descripcion_larga: "Versión grande de nuestra popular tarta, con una base de masa sablée tierna, una capa generosa de crema pastelera de vainilla y cubierta totalmente con frambuesas frescas que aportan un toque ácido y muy refrescante. Ideal para compartir.",
      categoriaId: 2, 
      stock: 12 
    },
    {
    id: "USR1196",
    nombre: "Elisa Tapia",
    email: "elisa.t@mail.cl",
    clave: "TapiaE",
    region: "Metropolitana",
    comuna: "Lo Prado",
    edad: 39,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1197",
    nombre: "Mario Bravo",
    email: "mario.b@mail.cl",
    clave: "BravoM",
    region: "Valparaiso",
    comuna: "La Ligua",
    edad: 52,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1198",
    nombre: "Alejandra Díaz",
    email: "ale.d@mail.cl",
    clave: "DiazA",
    region: "Coquimbo",
    comuna: "Paiguano",
    edad: 27,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1199",
    nombre: "Joaquín Rivas",
    email: "joaquin.r@mail.cl",
    clave: "RivasJ",
    region: "Antofagasta",
    comuna: "Ollagüe",
    edad: 44,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1200",
    nombre: "Florencia Mena",
    email: "flor.m@mail.cl",
    clave: "MenaF",
    region: "Tarapaca",
    comuna: "Camiña",
    edad: 33,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1201",
    nombre: "Héctor Soto",
    email: "hector.s@mail.cl",
    clave: "SotoH",
    region: "Arica",
    comuna: "General Lagos",
    edad: 58,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1202",
    nombre: "Daniela Alarcón",
    email: "dani.a@mail.cl",
    clave: "AlarconD",
    region: "Atacama",
    comuna: "Freirina",
    edad: 25,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1203",
    nombre: "Cristian Núñez",
    email: "cristian.n@mail.cl",
    clave: "NunezC",
    region: "Libertador",
    comuna: "Rengo",
    edad: 47,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1204",
    nombre: "Carolina Morales",
    email: "caro.m@mail.cl",
    clave: "MoralesC",
    region: "Maule",
    comuna: "Retiro",
    edad: 30,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1205",
    nombre: "Gabriel Vera",
    email: "gabriel.v@mail.cl",
    clave: "VeraG",
    region: "Ñuble",
    comuna: "Coihueco",
    edad: 63,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1206",
    nombre: "Isidora Pérez",
    email: "isi.p@mail.cl",
    clave: "PerezI",
    region: "BioBio",
    comuna: "Alto Biobío",
    edad: 29,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1207",
    nombre: "Sebastián Gómez",
    email: "seba.g@mail.cl",
    clave: "GomezS",
    region: "Araucania",
    comuna: "Saavedra",
    edad: 41,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1208",
    nombre: "Valentina Henríquez",
    email: "vale.h@mail.cl",
    clave: "HenriquezV",
    region: "Rios",
    comuna: "Máfil",
    edad: 22,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1209",
    nombre: "Patricio Díaz",
    email: "pato.d@mail.cl",
    clave: "DiazP",
    region: "Lagos",
    comuna: "Los Muermos",
    edad: 50,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1210",
    nombre: "Loreto Rojas",
    email: "loreto.r@mail.cl",
    clave: "RojasL",
    region: "Aysen",
    comuna: "Guaitecas",
    edad: 35,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1211",
    nombre: "Andrés Figueroa",
    email: "andres.f@mail.cl",
    clave: "FigueroaA",
    region: "Magallanes",
    comuna: "Primavera",
    edad: 48,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1212",
    nombre: "Paula Vásquez",
    email: "paula.v@mail.cl",
    clave: "VasquezP",
    region: "Metropolitana",
    comuna: "Huechuraba",
    edad: 26,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1213",
    nombre: "Benjamín Castro",
    email: "benja.c@mail.cl",
    clave: "CastroB",
    region: "Valparaiso",
    comuna: "El Quisco",
    edad: 43,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1214",
    nombre: "Catalina Soto",
    email: "cata.s@mail.cl",
    clave: "SotoC",
    region: "Coquimbo",
    comuna: "Punitaqui",
    edad: 30,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1215",
    nombre: "Ricardo Miranda",
    email: "ricardo.m@mail.cl",
    clave: "MirandaR",
    region: "Antofagasta",
    comuna: "María Elena",
    edad: 55,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1216",
    nombre: "Andrea Rojas",
    email: "andrea.r@mail.cl",
    clave: "RojasA",
    region: "Tarapaca",
    comuna: "Colchane",
    edad: 24,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1217",
    nombre: "Felipe Guzmán",
    email: "felipe.g@mail.cl",
    clave: "GuzmanF",
    region: "Arica",
    comuna: "Arica",
    edad: 60,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1218",
    nombre: "Javiera Flores",
    email: "javi.f@mail.cl",
    clave: "FloresJ",
    region: "Atacama",
    comuna: "Chañaral",
    edad: 37,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1219",
    nombre: "Manuel Henríquez",
    email: "manu.h@mail.cl",
    clave: "HenriquezM",
    region: "Libertador",
    comuna: "Mostazal",
    edad: 49,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1220",
    nombre: "Sofía Díaz",
    email: "sofia.d@mail.cl",
    clave: "DiazS",
    region: "Maule",
    comuna: "Villa Alegre",
    edad: 32,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1221",
    nombre: "Ignacio Soto",
    email: "ignacio.s@mail.cl",
    clave: "SotoI",
    region: "Ñuble",
    comuna: "Ninhue",
    edad: 54,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1222",
    nombre: "Daniela Pérez",
    email: "dani.p@mail.cl",
    clave: "PerezD",
    region: "BioBio",
    comuna: "Laja",
    edad: 28,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1223",
    nombre: "Cristóbal Vargas",
    email: "cris.v@mail.cl",
    clave: "VargasC",
    region: "Araucania",
    comuna: "Curacautín",
    edad: 46,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1224",
    nombre: "Lorena Guzmán",
    email: "lorena.g@mail.cl",
    clave: "GuzmanL",
    region: "Rios",
    comuna: "Lago Ranco",
    edad: 39,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1225",
    nombre: "Álvaro Muñoz",
    email: "alvaro.m@mail.cl",
    clave: "MunozA",
    region: "Lagos",
    comuna: "Palena",
    edad: 58,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1226",
    nombre: "Francisca Soto",
    email: "fran.s@mail.cl",
    clave: "SotoF",
    region: "Aysen",
    comuna: "Río Ibáñez",
    edad: 23,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1227",
    nombre: "Marcelo Bravo",
    email: "marcelo.b@mail.cl",
    clave: "BravoM",
    region: "Magallanes",
    comuna: "Natales",
    edad: 36,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1228",
    nombre: "Javiera Leiva",
    email: "javi.l@mail.cl",
    clave: "LeivaJ",
    region: "Metropolitana",
    comuna: "Renca",
    edad: 31,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1229",
    nombre: "Pablo Flores",
    email: "pablo.f@mail.cl",
    clave: "FloresP",
    region: "Valparaiso",
    comuna: "Algarrobo",
    edad: 45,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1230",
    nombre: "Catalina Miranda",
    email: "cata.m@mail.cl",
    clave: "MirandaC",
    region: "Coquimbo",
    comuna: "Illapel",
    edad: 27,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1231",
    nombre: "Gabriel Vera",
    email: "gabriel.v@mail.cl",
    clave: "VeraG",
    region: "Antofagasta",
    comuna: "Taltal",
    edad: 52,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1232",
    nombre: "Francisca Pérez",
    email: "fran.p@mail.cl",
    clave: "PerezF",
    region: "Tarapaca",
    comuna: "Pozo Almonte",
    edad: 34,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1233",
    nombre: "Sebastián Gómez",
    email: "seba.g@mail.cl",
    clave: "GomezS",
    region: "Arica",
    comuna: "Putre",
    edad: 56,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1234",
    nombre: "Valeria Henríquez",
    email: "vale.h@mail.cl",
    clave: "HenriquezV",
    region: "Atacama",
    comuna: "Copiapó",
    edad: 29,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1235",
    nombre: "Ricardo Soto",
    email: "ricardo.s@mail.cl",
    clave: "SotoR",
    region: "Libertador",
    comuna: "Rancagua",
    edad: 40,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1236",
    nombre: "Andrea Leiva",
    email: "andrea.l@mail.cl",
    clave: "LeivaA",
    region: "Maule",
    comuna: "Longaví",
    edad: 33,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1237",
    nombre: "Felipe Tapia",
    email: "felipe.t@mail.cl",
    clave: "TapiaF",
    region: "Ñuble",
    comuna: "Ránquil",
    edad: 58,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1238",
    nombre: "Laura Rojas",
    email: "laura.r@mail.cl",
    clave: "RojasL",
    region: "BioBio",
    comuna: "Santa Juana",
    edad: 25,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1239",
    nombre: "Manuel Díaz",
    email: "manu.d@mail.cl",
    clave: "DiazM",
    region: "Araucania",
    comuna: "Pucón",
    edad: 47,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1240",
    nombre: "Paula Miranda",
    email: "paula.m@mail.cl",
    clave: "MirandaP",
    region: "Rios",
    comuna: "Panguipulli",
    edad: 30,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1241",
    nombre: "Cristóbal Soto",
    email: "cris.s@mail.cl",
    clave: "SotoC",
    region: "Lagos",
    comuna: "Puerto Varas",
    edad: 42,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1242",
    nombre: "Javiera Flores",
    email: "javi.f@mail.cl",
    clave: "FloresJ",
    region: "Aysen",
    comuna: "Aysén",
    edad: 28,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1243",
    nombre: "Andrés Bravo",
    email: "andres.b@mail.cl",
    clave: "BravoA",
    region: "Magallanes",
    comuna: "Cabo de Hornos",
    edad: 61,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1244",
    nombre: "Valentina Núñez",
    email: "vale.n@mail.cl",
    clave: "NunezV",
    region: "Metropolitana",
    comuna: "Lo Espejo",
    edad: 22,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1245",
    nombre: "José Pérez",
    email: "jose.p@mail.cl",
    clave: "PerezJ",
    region: "Valparaiso",
    comuna: "Santo Domingo",
    edad: 50,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1246",
    nombre: "Catalina Ríos",
    email: "cata.r@mail.cl",
    clave: "RiosC",
    region: "Coquimbo",
    comuna: "La Serena",
    edad: 36,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1247",
    nombre: "Gabriel Leiva",
    email: "gabriel.l@mail.cl",
    clave: "LeivaG",
    region: "Antofagasta",
    comuna: "Antofagasta",
    edad: 45,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1248",
    nombre: "Sofía Vargas",
    email: "sofia.v@mail.cl",
    clave: "VargasS",
    region: "Tarapaca",
    comuna: "Iquique",
    edad: 24,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1249",
    nombre: "Tomás Herrera",
    email: "tomas.h@mail.cl",
    clave: "HerreraT",
    region: "Arica",
    comuna: "Arica",
    edad: 57,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1250",
    nombre: "Andrea Díaz",
    email: "andrea.d@mail.cl",
    clave: "DiazA",
    region: "Atacama",
    comuna: "Caldera",
    edad: 31,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1251",
    nombre: "Cristóbal Flores",
    email: "cris.f@mail.cl",
    clave: "FloresC",
    region: "Libertador",
    comuna: "Requínoa",
    edad: 48,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1252",
    nombre: "Javiera Muñoz",
    email: "javi.m@mail.cl",
    clave: "MunozJ",
    region: "Maule",
    comuna: "San Rafael",
    edad: 26,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1253",
    nombre: "Manuel Orellana",
    email: "manu.o@mail.cl",
    clave: "OrellanaM",
    region: "Ñuble",
    comuna: "San Fabián",
    edad: 53,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1254",
    nombre: "Paula Soto",
    email: "paula.s@mail.cl",
    clave: "SotoP",
    region: "BioBio",
    comuna: "Coronel",
    edad: 37,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1255",
    nombre: "Ricardo Henríquez",
    email: "ricardo.h@mail.cl",
    clave: "HenriquezR",
    region: "Araucania",
    comuna: "Freire",
    edad: 44,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1256",
    nombre: "María Jesús Bravo",
    email: "mj.bravo@mail.cl",
    clave: "BravoMJ",
    region: "Rios",
    comuna: "Río Bueno",
    edad: 29,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1257",
    nombre: "Felipe Vargas",
    email: "felipe.v@mail.cl",
    clave: "VargasF",
    region: "Lagos",
    comuna: "Ancud",
    edad: 62,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1258",
    nombre: "Catalina Pizarro",
    email: "cata.p@mail.cl",
    clave: "PizarroC",
    region: "Aysen",
    comuna: "Guaitecas",
    edad: 23,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1259",
    nombre: "Juan Soto",
    email: "juan.s@mail.cl",
    clave: "SotoJ",
    region: "Magallanes",
    comuna: "Río Verde",
    edad: 35,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1260",
    nombre: "Natalia Leiva",
    email: "naty.l@mail.cl",
    clave: "LeivaN",
    region: "Metropolitana",
    comuna: "La Granja",
    edad: 40,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1261",
    nombre: "Andrés Gómez",
    email: "andres.g@mail.cl",
    clave: "GomezA",
    region: "Valparaiso",
    comuna: "Cartagena",
    edad: 49,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1262",
    nombre: "Javiera Vera",
    email: "javi.v@mail.cl",
    clave: "VeraJ",
    region: "Coquimbo",
    comuna: "Combarbalá",
    edad: 27,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1263",
    nombre: "Sebastián Muñoz",
    email: "seba.m@mail.cl",
    clave: "MunozS",
    region: "Antofagasta",
    comuna: "Calama",
    edad: 54,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1264",
    nombre: "Loreto Díaz",
    email: "loreto.d@mail.cl",
    clave: "DiazL",
    region: "Tarapaca",
    comuna: "Alto Hospicio",
    edad: 38,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1265",
    nombre: "Daniel Pérez",
    email: "daniel.p@mail.cl",
    clave: "PerezD",
    region: "Arica",
    comuna: "Camarones",
    edad: 20,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1266",
    nombre: "Camila Rojas",
    email: "cami.r@mail.cl",
    clave: "RojasC",
    region: "Atacama",
    comuna: "Vallenar",
    edad: 46,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1267",
    nombre: "Martín Flores",
    email: "martin.f@mail.cl",
    clave: "FloresM",
    region: "Libertador",
    comuna: "Las Cabras",
    edad: 32,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1268",
    nombre: "María José Henríquez",
    email: "mj.h@mail.cl",
    clave: "HenriquezMJ",
    region: "Maule",
    comuna: "Empedrado",
    edad: 51,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1269",
    nombre: "Álvaro Soto",
    email: "alvaro.s@mail.cl",
    clave: "SotoA",
    region: "Ñuble",
    comuna: "Pinto",
    edad: 34,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1270",
    nombre: "Constanza Miranda",
    email: "consu.m@mail.cl",
    clave: "MirandaC",
    region: "BioBio",
    comuna: "San Rosendo",
    edad: 28,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1271",
    nombre: "Ignacio Vargas",
    email: "ignacio.v@mail.cl",
    clave: "VargasI",
    region: "Araucania",
    comuna: "Toltén",
    edad: 60,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1272",
    nombre: "Sofía Gómez",
    email: "sofia.g@mail.cl",
    clave: "GomezS",
    region: "Rios",
    comuna: "Paillaco",
    edad: 43,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1273",
    nombre: "Benjamín Pérez",
    email: "benja.p@mail.cl",
    clave: "PerezB",
    region: "Lagos",
    comuna: "Puyehue",
    edad: 48,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1274",
    nombre: "Valeria Bravo",
    email: "vale.b@mail.cl",
    clave: "BravoV",
    region: "Aysen",
    comuna: "Coyhaique",
    edad: 25,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1275",
    nombre: "Jorge Cárdenas",
    email: "jorge.c@mail.cl",
    clave: "CardenasJ",
    region: "Magallanes",
    comuna: "Porvenir",
    edad: 55,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1276",
    nombre: "Daniela Tapia",
    email: "dani.t@mail.cl",
    clave: "TapiaD",
    region: "Metropolitana",
    comuna: "La Pintana",
    edad: 30,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1277",
    nombre: "Pablo Muñoz",
    email: "pablo.m@mail.cl",
    clave: "MunozP",
    region: "Valparaiso",
    comuna: "Petorca",
    edad: 42,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1278",
    nombre: "Florencia Díaz",
    email: "flor.d@mail.cl",
    clave: "DiazF",
    region: "Coquimbo",
    comuna: "Río Hurtado",
    edad: 26,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1279",
    nombre: "Cristian Leiva",
    email: "cris.l@mail.cl",
    clave: "LeivaC",
    region: "Antofagasta",
    comuna: "Ollagüe",
    edad: 61,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1280",
    nombre: "Camila Henríquez",
    email: "cami.h@mail.cl",
    clave: "HenriquezC",
    region: "Tarapaca",
    comuna: "Huara",
    edad: 35,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1281",
    nombre: "Andrés Gutiérrez",
    email: "andres.g@mail.cl",
    clave: "GutierrezA",
    region: "Arica",
    comuna: "Arica",
    edad: 49,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1282",
    nombre: "Javiera Soto",
    email: "javi.s@mail.cl",
    clave: "SotoJ",
    region: "Atacama",
    comuna: "Alto del Carmen",
    edad: 22,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1283",
    nombre: "Ricardo Flores",
    email: "ricardo.f@mail.cl",
    clave: "FloresR",
    region: "Libertador",
    comuna: "Pichidegua",
    edad: 56,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1284",
    nombre: "Valentina Vargas",
    email: "vale.v@mail.cl",
    clave: "VargasV",
    region: "Maule",
    comuna: "Chanco",
    edad: 33,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1285",
    nombre: "Felipe Gómez",
    email: "felipe.g@mail.cl",
    clave: "GomezF",
    region: "Ñuble",
    comuna: "San Nicolás",
    edad: 47,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1286",
    nombre: "Laura Rojas",
    email: "laura.r@mail.cl",
    clave: "RojasL",
    region: "BioBio",
    comuna: "Negrete",
    edad: 28,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1287",
    nombre: "Manuel Miranda",
    email: "manu.m@mail.cl",
    clave: "MirandaM",
    region: "Araucania",
    comuna: "Lautaro",
    edad: 50,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1288",
    nombre: "Daniela Bravo",
    email: "dani.b@mail.cl",
    clave: "BravoD",
    region: "Rios",
    comuna: "Lanco",
    edad: 39,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1289",
    nombre: "Cristóbal Henríquez",
    email: "cris.h@mail.cl",
    clave: "HenriquezC",
    region: "Lagos",
    comuna: "Curaco de Vélez",
    edad: 44,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1290",
    nombre: "Isidora Díaz",
    email: "isi.d@mail.cl",
    clave: "DiazI",
    region: "Aysen",
    comuna: "Lago Verde",
    edad: 27,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1291",
    nombre: "Juan Pablo Soto",
    email: "jp.soto@mail.cl",
    clave: "SotoJP",
    region: "Magallanes",
    comuna: "Laguna Blanca",
    edad: 58,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1292",
    nombre: "Catalina Muñoz",
    email: "cata.m@mail.cl",
    clave: "MunozC",
    region: "Metropolitana",
    comuna: "El Bosque",
    edad: 25,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1293",
    nombre: "Gabriel Pérez",
    email: "gabriel.p@mail.cl",
    clave: "PerezG",
    region: "Valparaiso",
    comuna: "Llaillay",
    edad: 48,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1294",
    nombre: "María Jesús Gómez",
    email: "mj.gomez@mail.cl",
    clave: "GomezMJ",
    region: "Coquimbo",
    comuna: "Canela",
    edad: 30,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1295",
    nombre: "Benjamín Flores",
    email: "benja.f@mail.cl",
    clave: "FloresB",
    region: "Antofagasta",
    comuna: "Mejillones",
    edad: 53,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1296",
    nombre: "Laura Soto",
    email: "laura.s@mail.cl",
    clave: "SotoL",
    region: "Tarapaca",
    comuna: "Pica",
    edad: 36,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1297",
    nombre: "Sebastián Díaz",
    email: "seba.d@mail.cl",
    clave: "DiazS",
    region: "Arica",
    comuna: "Putre",
    edad: 41,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1298",
    nombre: "Andrea Miranda",
    email: "andrea.m@mail.cl",
    clave: "MirandaA",
    region: "Atacama",
    comuna: "Tierra Amarilla",
    edad: 24,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1299",
    nombre: "Felipe Henríquez",
    email: "felipe.h@mail.cl",
    clave: "HenriquezF",
    region: "Libertador",
    comuna: "Codegua",
    edad: 46,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1300",
    nombre: "Javiera Vera",
    email: "javi.v@mail.cl",
    clave: "VeraJ",
    region: "Maule",
    comuna: "Talca",
    edad: 31,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1301",
    nombre: "Manuel Rojas",
    email: "manu.r@mail.cl",
    clave: "RojasM",
    region: "Ñuble",
    comuna: "Quirihue",
    edad: 55,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1302",
    nombre: "Paula Castro",
    email: "paula.c@mail.cl",
    clave: "CastroP",
    region: "BioBio",
    comuna: "Penco",
    edad: 29,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1303",
    nombre: "Ricardo Gómez",
    email: "ricardo.g@mail.cl",
    clave: "GomezR",
    region: "Araucania",
    comuna: "Nueva Imperial",
    edad: 40,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1304",
    nombre: "Valentina Soto",
    email: "vale.s@mail.cl",
    clave: "SotoV",
    region: "Rios",
    comuna: "Valdivia",
    edad: 33,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1305",
    nombre: "Juan Leiva",
    email: "juan.l@mail.cl",
    clave: "LeivaJ",
    region: "Lagos",
    comuna: "Chonchi",
    edad: 50,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1306",
    nombre: "Catalina Bravo",
    email: "cata.b@mail.cl",
    clave: "BravoC",
    region: "Aysen",
    comuna: "Cochrane",
    edad: 26,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1307",
    nombre: "Andrés Muñoz",
    email: "andres.m@mail.cl",
    clave: "MunozA",
    region: "Magallanes",
    comuna: "San Gregorio",
    edad: 64,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1308",
    nombre: "Sofía Pérez",
    email: "sofia.p@mail.cl",
    clave: "PerezS",
    region: "Metropolitana",
    comuna: "Lo Barnechea",
    edad: 21,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1309",
    nombre: "Cristóbal Flores",
    email: "cris.f@mail.cl",
    clave: "FloresC",
    region: "Valparaiso",
    comuna: "Rinconada",
    edad: 57,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1310",
    nombre: "Javiera Miranda",
    email: "javi.m@mail.cl",
    clave: "MirandaJ",
    region: "Coquimbo",
    comuna: "Los Vilos",
    edad: 38,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1311",
    nombre: "Manuel Díaz",
    email: "manu.d@mail.cl",
    clave: "DiazM",
    region: "Antofagasta",
    comuna: "Antofagasta",
    edad: 45,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1312",
    nombre: "Paula Tapia",
    email: "paula.t@mail.cl",
    clave: "TapiaP",
    region: "Tarapaca",
    comuna: "Alto Hospicio",
    edad: 29,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1313",
    nombre: "Ricardo Leiva",
    email: "ricardo.l@mail.cl",
    clave: "LeivaR",
    region: "Arica",
    comuna: "Camarones",
    edad: 50,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1314",
    nombre: "Valentina Guzmán",
    email: "vale.g@mail.cl",
    clave: "GuzmanV",
    region: "Atacama",
    comuna: "Huasco",
    edad: 32,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1315",
    nombre: "Andrés Bravo",
    email: "andres.b@mail.cl",
    clave: "BravoA",
    region: "Libertador",
    comuna: "Graneros",
    edad: 43,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1316",
    nombre: "Camila Rojas",
    email: "cami.r@mail.cl",
    clave: "RojasC",
    region: "Maule",
    comuna: "Curicó",
    edad: 25,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1317",
    nombre: "Felipe Soto",
    email: "felipe.s@mail.cl",
    clave: "SotoF",
    region: "Ñuble",
    comuna: "San Carlos",
    edad: 54,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1318",
    nombre: "Laura Pérez",
    email: "laura.p@mail.cl",
    clave: "PerezL",
    region: "BioBio",
    comuna: "Talcahuano",
    edad: 37,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1319",
    nombre: "Sebastián Miranda",
    email: "seba.m@mail.cl",
    clave: "MirandaS",
    region: "Araucania",
    comuna: "Temuco",
    edad: 49,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1320",
    nombre: "Andrea Henríquez",
    email: "andrea.h@mail.cl",
    clave: "HenriquezA",
    region: "Rios",
    comuna: "La Unión",
    edad: 23,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1321",
    nombre: "Ricardo Tapia",
    email: "ricardo.t@mail.cl",
    clave: "TapiaR",
    region: "Lagos",
    comuna: "Puerto Montt",
    edad: 60,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1322",
    nombre: "Javiera Flores",
    email: "javi.f@mail.cl",
    clave: "FloresJ",
    region: "Aysen",
    comuna: "Coyhaique",
    edad: 28,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1323",
    nombre: "Manuel Díaz",
    email: "manu.d@mail.cl",
    clave: "DiazM",
    region: "Magallanes",
    comuna: "Puerto Natales",
    edad: 36,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1324",
    nombre: "Paula Muñoz",
    email: "paula.m@mail.cl",
    clave: "MunozP",
    region: "Metropolitana",
    comuna: "Vitacura",
    edad: 41,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1325",
    nombre: "Cristian Bravo",
    email: "cris.b@mail.cl",
    clave: "BravoC",
    region: "Valparaiso",
    comuna: "Concón",
    edad: 52,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1326",
    nombre: "Sofía Núñez",
    email: "sofia.n@mail.cl",
    clave: "NunezS",
    region: "Coquimbo",
    comuna: "Ovalle",
    edad: 27,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1327",
    nombre: "Álvaro Soto",
    email: "alvaro.s@mail.cl",
    clave: "SotoA",
    region: "Antofagasta",
    comuna: "Mejillones",
    edad: 48,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1328",
    nombre: "Daniela Guzmán",
    email: "dani.g@mail.cl",
    clave: "GuzmanD",
    region: "Tarapaca",
    comuna: "Iquique",
    edad: 30,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1329",
    nombre: "Javier Vargas",
    email: "javier.v@mail.cl",
    clave: "VargasJ",
    region: "Arica",
    comuna: "General Lagos",
    edad: 63,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1330",
    nombre: "Catalina Flores",
    email: "cata.f@mail.cl",
    clave: "FloresC",
    region: "Atacama",
    comuna: "Diego de Almagro",
    edad: 25,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1331",
    nombre: "Mario Pérez",
    email: "mario.p@mail.cl",
    clave: "PerezM",
    region: "Libertador",
    comuna: "Oliva",
    edad: 47,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1332",
    nombre: "Loreto Miranda",
    email: "loreto.m@mail.cl",
    clave: "MirandaL",
    region: "Maule",
    comuna: "San Clemente",
    edad: 32,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1333",
    nombre: "Esteban Rojas",
    email: "esteban.r@mail.cl",
    clave: "RojasE",
    region: "Ñuble",
    comuna: "Treguaco",
    edad: 54,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1334",
    nombre: "Francisca Soto",
    email: "fran.s@mail.cl",
    clave: "SotoF",
    region: "BioBio",
    comuna: "Florida",
    edad: 28,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1335",
    nombre: "Héctor Díaz",
    email: "hector.d@mail.cl",
    clave: "DiazH",
    region: "Araucania",
    comuna: "Gorbea",
    edad: 46,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1336",
    nombre: "Javiera Muñoz",
    email: "javi.m@mail.cl",
    clave: "MunozJ",
    region: "Rios",
    comuna: "Los Lagos",
    edad: 39,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1337",
    nombre: "Manuel Cárdenas",
    email: "manu.c@mail.cl",
    clave: "CardenasM",
    region: "Lagos",
    comuna: "Dalcahue",
    edad: 58,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1338",
    nombre: "Paula Leiva",
    email: "paula.l@mail.cl",
    clave: "LeivaP",
    region: "Aysen",
    comuna: "O'Higgins",
    edad: 24,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1339",
    nombre: "Cristóbal Henríquez",
    email: "cris.h@mail.cl",
    clave: "HenriquezC",
    region: "Magallanes",
    comuna: "Cabo de Hornos",
    edad: 33,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1340",
    nombre: "Sofía Vera",
    email: "sofia.v@mail.cl",
    clave: "VeraS",
    region: "Metropolitana",
    comuna: "Maipú",
    edad: 45,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1341",
    nombre: "Álvaro Soto",
    email: "alvaro.s@mail.cl",
    clave: "SotoA",
    region: "Valparaiso",
    comuna: "San Esteban",
    edad: 30,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1342",
    nombre: "Daniela Guzmán",
    email: "dani.g@mail.cl",
    clave: "GuzmanD",
    region: "Coquimbo",
    comuna: "Punitaqui",
    edad: 51,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1343",
    nombre: "Felipe Miranda",
    email: "felipe.m@mail.cl",
    clave: "MirandaF",
    region: "Antofagasta",
    comuna: "San Pedro de Atacama",
    edad: 26,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1344",
    nombre: "Javiera Pérez",
    email: "javi.p@mail.cl",
    clave: "PerezJ",
    region: "Tarapaca",
    comuna: "Colchane",
    edad: 57,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1345",
    nombre: "Manuel Flores",
    email: "manu.f@mail.cl",
    clave: "FloresM",
    region: "Arica",
    comuna: "Camarones",
    edad: 34,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1346",
    nombre: "Catalina Bravo",
    email: "cata.b@mail.cl",
    clave: "BravoC",
    region: "Atacama",
    comuna: "Freirina",
    edad: 42,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1347",
    nombre: "Ricardo Gómez",
    email: "ricardo.g@mail.cl",
    clave: "GomezR",
    region: "Libertador",
    comuna: "Peumo",
    edad: 53,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1348",
    nombre: "Valentina Henríquez",
    email: "vale.h@mail.cl",
    clave: "HenriquezV",
    region: "Maule",
    comuna: "Yerbas Buenas",
    edad: 28,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1349",
    nombre: "Andrés Díaz",
    email: "andres.d@mail.cl",
    clave: "DiazA",
    region: "Ñuble",
    comuna: "San Ignacio",
    edad: 40,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1350",
    nombre: "Sofía Leiva",
    email: "sofia.l@mail.cl",
    clave: "LeivaS",
    region: "BioBio",
    comuna: "Yumbel",
    edad: 35,
    estado: "Suspendido",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1351",
    nombre: "Cristóbal Vargas",
    email: "cris.v@mail.cl",
    clave: "VargasC",
    region: "Araucania",
    comuna: "Padre Las Casas",
    edad: 56,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1352",
    nombre: "Paula Miranda",
    email: "paula.m@mail.cl",
    clave: "MirandaP",
    region: "Rios",
    comuna: "Corral",
    edad: 25,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1353",
    nombre: "Javier Soto",
    email: "javier.s@mail.cl",
    clave: "SotoJ",
    region: "Lagos",
    comuna: "Chaitén",
    edad: 49,
    estado: "Pendiente",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1354",
    nombre: "María José Flores",
    email: "mj.f@mail.cl",
    clave: "FloresMJ",
    region: "Aysen",
    comuna: "Chile Chico",
    edad: 30,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  },
  {
    id: "USR1355",
    nombre: "Manuel Cárdenas",
    email: "manu.c@mail.cl",
    clave: "CardenasM",
    region: "Magallanes",
    comuna: "Timaukel",
    edad: 61,
    estado: "Activo",
    rol: "cliente",
    fecha: "2025-10-28"
  }





];

export default lista_productos;