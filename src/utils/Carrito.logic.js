// src/utils/Carrito.logic.js
// Lógica pura y reusable para el componente Carrito.
// Se adjunta en el objeto global window.CarritoLogic evitando redeclaraciones.

(function () {
  if (typeof window === "undefined") {
    // En entornos de test con Node, asegurar que exista window
    // (Karma corre en browser, pero esto hace el archivo más portable)
    global.window = {};
  }

  // Evitar sobreescribir si ya existe
  window.CarritoLogic = window.CarritoLogic || {};

  // Utilidad privada: convertir a número seguro
  function toNumberSafe(n) {
    var x = Number(n);
    return isFinite(x) ? x : 0;
  }

  // ---------------------------------------------------------------------------
  // Función: handleComprar
  // Descripción:
  //   Replica la lógica de compra del componente:
  //   - Si el carrito está vacío => devolver { type: 'alert', message: '...' }
  //   - Si tiene productos => devolver { type: 'navigate', to: '/compra' }
  // Parámetros:
  //   - carritoLength: número de ítems en el carrito (puede venir indefinido)
  // Retorno:
  //   - Objeto con la acción a ejecutar por la UI
  // ---------------------------------------------------------------------------
  if (!window.CarritoLogic.handleComprar) {
    window.CarritoLogic.handleComprar = function (carritoLength) {
      var len = toNumberSafe(carritoLength);
      if (!(len > 0)) {
        return { type: "alert", message: "Tu carrito está vacío" };
      }
      return { type: "navigate", to: "/compra" };
    };
  }

  // ---------------------------------------------------------------------------
  // Función: shouldDisableAddButton
  // Descripción:
  //   Determina si el botón "Añadir" debe estar deshabilitado en base al stock.
  //   Sigue la misma regla del JSX original: (stock ?? 0) === 0
  // Parámetros:
  //   - stock: número (puede ser null/undefined/string)
  // Retorno:
  //   - boolean
  // ---------------------------------------------------------------------------
  if (!window.CarritoLogic.shouldDisableAddButton) {
    window.CarritoLogic.shouldDisableAddButton = function (stock) {
      var s = stock == null ? 0 : toNumberSafe(stock);
      return s === 0;
    };
  }

  // ---------------------------------------------------------------------------
  // Función: calcItemSubtotal
  // Descripción:
  //   Calcula el subtotal por ítem (precio * cantidad).
  //   Valores inválidos se tratan como 0. Valores negativos se recortan a 0.
  // Parámetros:
  //   - precio: number|string
  //   - cantidad: number|string
  // Retorno:
  //   - number
  // ---------------------------------------------------------------------------
  if (!window.CarritoLogic.calcItemSubtotal) {
    window.CarritoLogic.calcItemSubtotal = function (precio, cantidad) {
      var p = toNumberSafe(precio);
      var c = toNumberSafe(cantidad);
      if (p < 0) p = 0;
      if (c < 0) c = 0;
      return p * c;
    };
  }

  // ---------------------------------------------------------------------------
  // Función: hasInventarioEnLocalStorage
  // Descripción:
  //   Indica si existe un valor truthy para la clave de inventario en LS.
  //   Se diseña para usarse dentro del useEffect del componente.
  // Parámetros:
  //   - storedValue: string|null (resultado de localStorage.getItem(...))
  // Retorno:
  //   - boolean
  // ---------------------------------------------------------------------------
  if (!window.CarritoLogic.hasInventarioEnLocalStorage) {
    window.CarritoLogic.hasInventarioEnLocalStorage = function (storedValue) {
      return !!storedValue;
    };
  }

  // ---------------------------------------------------------------------------
  // Función: getVerProductosRoute
  // Descripción:
  //   Devuelve la ruta que utiliza el botón "Ver productos".
  //   Extraída para permitir testear y centralizar rutas de navegación.
  // Parámetros:
  //   - (ninguno)
  // Retorno:
  //   - string '/productos'
  // ---------------------------------------------------------------------------
  if (!window.CarritoLogic.getVerProductosRoute) {
    window.CarritoLogic.getVerProductosRoute = function () {
      return "/productos";
    };
  }
})();
