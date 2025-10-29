// src/components/Buscador.jsx
import React, { useState, useEffect } from "react";
import "../utils/Buscador.logic.js"; // PARA LAS PRUEBAS UNITARIAS
import PropTypes from "prop-types";
import "../styles/buscador.css";
import Productos from "../pages/Productos";

/*
  Props:
   - onSearch(term): función que recibe el texto del buscador cada vez que se "confirma" la búsqueda.
   - placeholder: texto del input (opcional)
   - initialValue: valor inicial del input (opcional)
   - debounceMs: número (ms). Si >0, el componente esperará debounceMs ms después de que el usuario deje de escribir antes de llamar onSearch.
   - showClear: boolean, muestra botón para limpiar (default true)
*/

export default function Buscador({
  onSearch,
  placeholder = "Buscar productos...",
  initialValue = "",
  debounceMs = 300,
  showClear = true,
}) {
  const [term, setTerm] = useState(initialValue);
  const [debouncedTerm, setDebouncedTerm] = useState(initialValue);

  // Si quieres debounce: actualiza debouncedTerm después de debounceMs ms
  useEffect(() => {
    if (debounceMs > 0) {
      const id = setTimeout(() => setDebouncedTerm(term), debounceMs);
      return () => clearTimeout(id);
    } else {
      setDebouncedTerm(term);
    }
  }, [term, debounceMs]);

  // Llamamos a onSearch cuando cambia debouncedTerm
  useEffect(() => {
  window.BuscadorLogic.triggerSearch(onSearch, debouncedTerm);
}, [debouncedTerm, onSearch]);

  const handleChange = (e) => {
  const nuevoValor = window.BuscadorLogic.handleChange(e);
  setTerm(nuevoValor);
};


  const clear = () => {
  const nuevoValor = window.BuscadorLogic.clear(onSearch, debounceMs);
  setTerm(nuevoValor);
};

const valorFinal = window.BuscadorLogic.debounceUpdate(term, debounceMs);


  return (
    <div className="buscador-class d-flex align-items-center">
      <input
        aria-label="Buscador de productos"
        className="form-control buscador-input"
        type="search"
        value={term}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {showClear && (
        <button
          id="clear-search"
          className="btn ms-2"
          onClick={clear}
          aria-label="Limpiar búsqueda"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

Buscador.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  debounceMs: PropTypes.number,
  showClear: PropTypes.bool,
};
