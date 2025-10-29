// ✅ Lógica pura del componente DetalleProducto
// Todas las funciones están aisladas para pruebas unitarias con Jasmine + Karma
// No dependen de React ni del DOM.

window.DetalleProductoLogic = {
  /**
   * Determina si un producto no tiene stock.
   * @param {Object} producto - Objeto del producto.
   * @returns {boolean} Verdadero si el stock es 0 o nulo.
   */
  esSinStock: function (producto) {
    if (!producto || producto.stock == null) return true;
    return producto.stock === 0;
  },

  /**
   * Determina si un producto tiene poco stock (1 a 3 unidades).
   * @param {Object} producto - Objeto del producto.
   * @returns {boolean} Verdadero si el stock es bajo.
   */
  esStockBajo: function (producto) {
    if (!producto || producto.stock == null) return false;
    return producto.stock > 0 && producto.stock <= 3;
  },

  /**
   * Controla la acción de agregar al carrito.
   * @param {Object} producto - Producto que se intenta agregar.
   * @param {Function} agregarAlCarrito - Función externa de contexto.
   * @param {Function} setShowToast - Setter del mensaje flotante.
   * @returns {boolean} Verdadero si se agregó con éxito.
   */
  handleAgregar: function (producto, agregarAlCarrito, setShowToast) {
    if (!producto || typeof agregarAlCarrito !== "function") return false;
    const agregado = agregarAlCarrito(producto);
    if (agregado && typeof setShowToast === "function") {
      setShowToast(true);
      return true;
    }
    return false;
  },
};