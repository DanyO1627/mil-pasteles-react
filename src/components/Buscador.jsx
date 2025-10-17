// src/components/Buscador.jsx
import React, { useState, useEffect } from "react";
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
    onSearch && onSearch(debouncedTerm.trim());
  }, [debouncedTerm, onSearch]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const clear = () => {
    setTerm("");
    // si no hay debounce, onSearch se llama en el effect anterior
    if (debounceMs === 0) onSearch && onSearch("");
  };

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
