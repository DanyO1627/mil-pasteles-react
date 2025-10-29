// src/utils/Buscador.logic.js
// Lógica pura del componente Buscador extraída para test unitario.
// Todas las funciones se alojan en window.BuscadorLogic para evitar conflictos globales.

(function () {
  if (typeof window === "undefined") global.window = {};
  window.BuscadorLogic = window.BuscadorLogic || {};

  // -------------------------------------------------------------
  // Función: handleChange
  // Descripción:
  //   Actualiza el término de búsqueda en base al valor ingresado en el input.
  //   Devuelve el nuevo término sin modificar el estado directamente.
  // Parámetros:
  //   - event: objeto con la propiedad target.value
  // Retorno:
  //   - string: valor del término actualizado
  // -------------------------------------------------------------
  if (!window.BuscadorLogic.handleChange) {
    window.BuscadorLogic.handleChange = function (event) {
      if (!event || !event.target) return "";
      var value = event.target.value;
      return typeof value === "string" ? value : "";
    };
  }

  // -------------------------------------------------------------
  // Función: clear
  // Descripción:
  //   Simula la acción de limpiar el buscador.
  //   Si debounceMs === 0, ejecuta onSearch inmediatamente con cadena vacía.
  // Parámetros:
  //   - onSearch: función de callback (opcional)
  //   - debounceMs: número de milisegundos para el debounce
  // Retorno:
  //   - string: nuevo término vacío ""
  // -------------------------------------------------------------
  if (!window.BuscadorLogic.clear) {
    window.BuscadorLogic.clear = function (onSearch, debounceMs) {
      var ms = Number(debounceMs) || 0;
      if (ms === 0 && typeof onSearch === "function") {
        onSearch("");
      }
      return "";
    };
  }

  // -------------------------------------------------------------
  // Función: debounceUpdate
  // Descripción:
  //   Representa la lógica de actualización del término con debounce.
  //   Si debounceMs > 0, espera antes de actualizar; si no, actualiza inmediatamente.
  //   (Simulada para test unitario, sin temporizadores reales)
  // Parámetros:
  //   - term: string
  //   - debounceMs: número (milisegundos)
  // Retorno:
  //   - string: valor final a aplicar como debouncedTerm
  // -------------------------------------------------------------
  if (!window.BuscadorLogic.debounceUpdate) {
    window.BuscadorLogic.debounceUpdate = function (term, debounceMs) {
      var t = typeof term === "string" ? term : "";
      var ms = Number(debounceMs);
      if (!isFinite(ms) || ms < 0) ms = 0;
      // En un entorno real, se usaría setTimeout; aquí devolvemos directamente el valor.
      return t.trim();
    };
  }

  // -------------------------------------------------------------
  // Función: triggerSearch
  // Descripción:
  //   Emula la llamada a onSearch cuando cambia debouncedTerm.
  //   Si onSearch es función válida, se ejecuta con el término limpio.
  // Parámetros:
  //   - onSearch: función de callback
  //   - term: string del término ya filtrado
  // Retorno:
  //   - string: término enviado al callback
  // -------------------------------------------------------------
  if (!window.BuscadorLogic.triggerSearch) {
    window.BuscadorLogic.triggerSearch = function (onSearch, term) {
      var finalTerm = (term || "").trim();
      if (typeof onSearch === "function") {
        onSearch(finalTerm);
      }
      return finalTerm;
    };
  }
})();
