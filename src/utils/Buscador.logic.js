// PARA TESTING

// src/utils/Buscador.logic.js
// ======================================================
// Lógica pura para el componente Buscador.jsx
// Todas las funciones se encapsulan dentro de window.BuscadorLogic
// para evitar colisiones globales y permitir pruebas unitarias.
// ======================================================

window.BuscadorLogic = window.BuscadorLogic || {};

/**
 * handleChange
 * -------------------------------
 * Maneja el evento de cambio del input del buscador.
 * Retorna el nuevo valor escrito por el usuario.
 *
 * @param {object} e - Evento del input (con target.value)
 * @returns {string} - Valor actualizado del input
 */
window.BuscadorLogic.handleChange = function (e) {
  if (!e || !e.target) return "";
  return e.target.value || "";
};

/**
 * clear
 * -------------------------------
 * Limpia el término de búsqueda y ejecuta onSearch("") si no hay debounce.
 *
 * @param {function} onSearch - Función callback a ejecutar al limpiar
 * @param {number} debounceMs - Milisegundos de espera configurados
 * @returns {string} - Retorna el valor vacío ("")
 */
window.BuscadorLogic.clear = function (onSearch, debounceMs) {
  if (typeof debounceMs !== "number") debounceMs = 0;
  if (debounceMs === 0 && typeof onSearch === "function") {
    onSearch("");
  }
  return "";
};

/**
 * debounceEffect
 * -------------------------------
 * Simula el efecto debounce: espera un tiempo antes de devolver el término final.
 *
 * @param {string} term - Texto actual ingresado
 * @param {number} debounceMs - Tiempo en milisegundos
 * @param {function} callback - Función a ejecutar luego del tiempo de espera
 * @returns {Promise<string>} - Promesa que resuelve el término final
 */
window.BuscadorLogic.debounceEffect = function (term, debounceMs, callback) {
  return new Promise((resolve) => {
    if (typeof debounceMs !== "number" || debounceMs <= 0) {
      if (typeof callback === "function") callback(term);
      resolve(term);
      return;
    }
    setTimeout(() => {
      if (typeof callback === "function") callback(term);
      resolve(term);
    }, debounceMs);
  });
};
