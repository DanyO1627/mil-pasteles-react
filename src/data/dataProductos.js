// Lista de productos disponibles en la tienda

// en react hay que importarlas una por una f
import tortaTresLeches from "../assets/torta_tres_leches_8910_orig.jpg";
import tartaManzana from "../assets/Tarta-de-manzana-ajustada-web-570x458.jpg";
import cheesecake from "../assets/cheesecake.jpg";
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
import EVE_TortaChocoBlanco from "../assets/EVE_TortaChocoBlanco.jpg";
import EVE_TortaSanFelipe from "../assets/EVE_TortaSanFelipe.jpeg";
import Eve_TortaSanDaniela from "../assets/Eve_TortaSanDaniela.png";
import Eve_TortaChocoyFrutas from "../assets/Eve_TortaChocoyFrutas.png";
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
];

export default lista_productos;