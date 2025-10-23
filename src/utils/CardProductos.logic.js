// src/utils/CardProductos.logic.js
// ======================================================
// Lógica pura del componente CardProductos.jsx
// Todas las funciones están encapsuladas en window.CardProductosLogic
// para evitar colisiones globales y permitir pruebas unitarias.
// ======================================================

window.CardProductosLogic = window.CardProductosLogic || {};

/**
 * handleAdd
 * ------------------------------------
 * Agrega un producto al carrito y controla la visibilidad del toast.
 * 
 * @param {function} agregarAlCarrito - Función del contexto para añadir el producto.
 * @param {object} producto - Objeto del producto a agregar.
 * @param {function} setShowToast - Setter para mostrar/ocultar el mensaje.
 * @param {number} [duracion=2000] - Duración en milisegundos que el toast permanece visible.
 * @returns {boolean} - Retorna true si se ejecutó correctamente, false en caso de error.
 */
window.CardProductosLogic.handleAdd = function (agregarAlCarrito, producto, setShowToast, duracion) {
  try {
    if (typeof agregarAlCarrito !== "function" || typeof setShowToast !== "function") {
      return false;
    }
    if (!producto) return false;
    agregarAlCarrito(producto);
    setShowToast(true);
    setTimeout(() => setShowToast(false), duracion || 2000);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * handleNavigate
 * ------------------------------------
 * Redirige al usuario al detalle de un producto usando navigate.
 * 
 * @param {function} navigate - Función de navegación de React Router.
 * @param {object} producto - Objeto producto que contiene el id.
 * @returns {string|boolean} - Retorna la ruta si se generó correctamente o false si hay error.
 */
window.CardProductosLogic.handleNavigate = function (navigate, producto) {
  try {
    if (typeof navigate !== "function" || !producto || !producto.id) return false;
    const ruta = `/producto/${producto.id}`;
    navigate(ruta);
    return ruta;
  } catch (error) {
    return false;
  }
};
