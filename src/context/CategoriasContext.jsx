import React, { createContext, useContext, useState, useEffect } from "react";

const CategoriasContext = createContext();

const STORAGE_KEY = "pasteleria_categorias";

// Categorías iniciales con ID FIJOS
const categoriasIniciales = [
  {
    id: 1,
    nombre: "Tortas & Pasteles",
    descripcion: "Deliciosas tortas y pasteles para toda ocasión",
    imagen: require("../assets/tarta-selva-negra.jpg"),
    activa: true,
    fechaCreacion: "2025-10-19"
  },
  {
    id: 2,
    nombre: "Tartas & Pies",
    descripcion: "Exquisitas tartas y pies artesanales",
    imagen: require("../assets/cheesecakeImg.webp"),
    activa: true,
    fechaCreacion: "2025-10-19"
  },
  {
    id: 3,
    nombre: "Individuales & Repostería Fina",
    descripcion: "Pequeñas delicias para disfrutar en cualquier momento",
    imagen: require("../assets/macarons2.webp"),
    activa: true,
    fechaCreacion: "2025-10-19"
  },
  {
    id: 4,
    nombre: "Especialidades & Gourmet",
    descripcion: "Productos premium y especiales",
    imagen: require("../assets/Tiramisu2.webp"),
    activa: true,
    fechaCreacion: "2025-10-19"
  }
];

export function CategoriasProvider({ children }) {
  // inicia o desde LocalStorage o de los datos iniciales
  const [categorias, setCategorias] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const categoriasGuardadas = JSON.parse(stored);
        
        // veerifica que sean correctos los id
        const tieneCategoriasBase = [1, 2, 3, 4].every(id => 
          categoriasGuardadas.some(cat => cat.id === id)
        );
        
        if (tieneCategoriasBase) {
          return categoriasGuardadas;
        } else {
          // sifaltan categorías base, restaurar
          console.warn("⚠️ Categorías base incompletas, restaurando...");
          localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriasIniciales));
          return categoriasIniciales;
        }
      }
      
      // guardar categorías iniciales la primera vez
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriasIniciales));
      return categoriasIniciales;
    } catch (error) {
      console.error("Error cargando categorías:", error);
      return categoriasIniciales;
    }
  });

  // sincroniza con el localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categorias));
    } catch (error) {
      console.error("Error guardando categorías:", error);
    }
  }, [categorias]);

  // CRUD

  const agregarCategoria = (nueva) => {
   
    const nuevaCategoria = {
      ...nueva,
      id: Date.now(),
      activa: true,
      fechaCreacion: new Date().toISOString().split('T')[0]
    };
    setCategorias((prev) => [...prev, nuevaCategoria]);
    return nuevaCategoria;
  };

  const actualizarCategoria = (id, cambios) => {
    setCategorias((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, ...cambios } : cat
      )
    );
  };

  const eliminarCategoria = (id) => {
    // protege categorías base
    if ([1, 2, 3, 4].includes(id)) {
      alert("⚠️ No puedes eliminar las categorías base del sistema.");
      return false;
    }
    setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    return true;
  };

  // solo desactivar categoría 
  const toggleActivaCategoria = (id) => {
    setCategorias((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, activa: !cat.activa } : cat
      )
    );
  };

  // UTILIDADES

  // obtener categoría por id
  const obtenerCategoria = (id) => {
    return categorias.find((c) => c.id === Number(id));
  };

  // obtener categoría por nombre 
  const obtenerCategoriaPorNombre = (nombre) => {
    return categorias.find((c) => c.nombre === nombre);
  };

  // obtener categorías activas
  const categoriasActivas = () => {
    return categorias.filter((c) => c.activa);
  };

  // contar productos por categoría 
  const contarProductosPorCategoria = (productos, categoriaId) => {
    return productos.filter((p) => p.categoriaId === categoriaId).length;
  };

  // validar si un categoriaId existe
  const existeCategoria = (categoriaId) => {
    return categorias.some((c) => c.id === categoriaId);
  };

  // resetear a categorías iniciales
  const resetearCategorias = () => {
    setCategorias(categoriasIniciales);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriasIniciales));
    alert("✅ Categorías restauradas a valores iniciales");
  };

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        agregarCategoria,
        actualizarCategoria,
        eliminarCategoria,
        toggleActivaCategoria,
        obtenerCategoria,
        obtenerCategoriaPorNombre,
        categoriasActivas,
        contarProductosPorCategoria,
        existeCategoria, // NUEVA
        resetearCategorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}

export function useCategorias() {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error("useCategorias debe usarse dentro de CategoriasProvider");
  }
  return context;
}

