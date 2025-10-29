// src/utils/EditarProducto.logic.js
// ------------------------------------------------------------
// Lógica pura extraída del componente EditarProducto.jsx
// Todas las funciones están dentro de window.EditarProductoLogic
// para evitar conflictos de ámbito y facilitar el testeo con Karma/Jasmine
// ------------------------------------------------------------

window.EditarProductoLogic = {
  /**
   * Maneja cambios en los campos del formulario.
   * @param {Object} e - Evento del input.
   * @param {Object} formData - Estado actual del formulario.
   * @returns {Object} Nuevo estado actualizado.
   */
  handleChange: function (e, formData) {
    if (!e || !e.target) return formData;

    const { name, value } = e.target;
    const nuevo = { ...formData, [name]: value };

    // Previsualización de imagen
    if (name === "imagen") {
      if (!value.trim()) {
        nuevo.preview = "/assets/sin_imagen.webp";
      } else if (value.startsWith("/assets/")) {
        nuevo.preview = "../../.." + value;
      } else {
        nuevo.preview = value;
      }
    }
    return nuevo;
  },

  /**
   * Procesa los datos del formulario antes de guardar.
   * @param {Object} formData - Datos del producto a guardar.
   * @returns {Object} Datos finales validados.
   */
  prepararProducto: function (formData) {
    if (!formData) return {};

    let imagenFinal = formData.imagen || "";
    if (!imagenFinal.trim()) {
      imagenFinal = "/assets/sin_imagen.webp";
    } else if (imagenFinal.startsWith("/assets/")) {
      imagenFinal = "../../.." + imagenFinal;
    }

    return {
      nombre: formData.nombre || "",
      precio: Number(formData.precio) || 0,
      stock: Number(formData.stock) || 0,
      categoria: formData.categoria || "",
      imagen: imagenFinal,
      descripcion: formData.descripcion || "",
    };
  },

  /**
   * Genera un mensaje de confirmación después de actualizar un producto.
   * @param {String} nombre - Nombre del producto actualizado.
   * @returns {String} Mensaje final.
   */
  generarMensajeExito: function (nombre) {
    if (!nombre || typeof nombre !== "string") return "✅ Producto actualizado";
    return `✅ Producto actualizado: ${nombre}`;
  },
};