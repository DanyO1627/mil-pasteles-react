// src/utils/Carrito.logic.js
// ======================================================
// Archivo de lógica pura para el componente Carrito.jsx
// Contiene funciones independientes para testeo con Jasmine + Karma
// Todas las funciones están bajo window.CarritoLogic para evitar conflictos globales
// ======================================================

window.CarritoLogic = window.CarritoLogic || {};

/**
 * handleComprar
 * ------------------------------------------------------
 * Ejecuta el proceso de compra del carrito, muestra el mensaje
 * devuelto por la función procesarCompra() y controla los temporizadores
 * de redirección o limpieza del mensaje.
 *
 * @param {Function} procesarCompra - función que procesa la compra
 * @param {Function} setMensaje - actualiza el mensaje mostrado al usuario
 * @param {Function} navigate - función para redirigir
 * @param {number} delayMs - tiempo en milisegundos (por defecto 3000)
 * @returns {Object} resultado del proceso ({ success: boolean, message: string })
 */
window.CarritoLogic.handleComprar = function (procesarCompra, setMensaje, navigate, delayMs = 3000) {
  if (typeof procesarCompra !== "function" || typeof setMensaje !== "function") {
    return { success: false, message: "Funciones inválidas" };
  }

  const resultado = procesarCompra();

  // Mostrar mensaje inicial
  setMensaje(resultado.message || "");

  if (resultado.success) {
    // Mensaje por 3 segundos y luego redirección
    setTimeout(() => {
      setMensaje("");
      if (typeof navigate === "function") navigate("/productos");
    }, delayMs);
  } else {
    // Limpiar mensaje de error luego del mismo tiempo
    setTimeout(() => setMensaje(""), delayMs);
  }

  return resultado;
};

/**
 * handleEliminar
 * ------------------------------------------------------
 * Elimina un producto del carrito a través del método eliminarDelCarrito.
 *
 * @param {Function} eliminarDelCarrito - función del contexto Carrito
 * @param {string|number} itemId - identificador del producto a eliminar
 * @returns {boolean} true si la operación fue válida, false en caso contrario
 */
window.CarritoLogic.handleEliminar = function (eliminarDelCarrito, itemId) {
  if (typeof eliminarDelCarrito !== "function" || itemId === undefined || itemId === null) {
    return false;
  }
  eliminarDelCarrito(itemId);
  return true;
};

/**
 * handleVaciar
 * ------------------------------------------------------
 * Vacía completamente el carrito de compras.
 *
 * @param {Function} vaciarCarrito - función del contexto Carrito
 * @returns {boolean} true si la operación fue exitosa
 */
window.CarritoLogic.handleVaciar = function (vaciarCarrito) {
  if (typeof vaciarCarrito !== "function") return false;
  vaciarCarrito();
  return true;
};
