/*
  src/utils/NuevoProducto.logic.js
  Lógica pura separada del componente NuevoProducto.jsx
  Todas las funciones se agrupan dentro del objeto global window.NuevoProductoLogic.
  Esto permite su uso directo en el componente y su testeo con Jasmine + Karma.
*/

window.NuevoProductoLogic = {
  /**
   * 📦 handleChange:
   * Maneja los cambios en los campos del formulario.
   * Actualiza el estado del formulario y gestiona la vista previa de imágenes.
   * Retorna un objeto con el nuevo estado del formulario y la vista previa resultante.
   */
  handleChange: function (formData, name, value) {
    var nuevoFormData = Object.assign({}, formData);
    nuevoFormData[name] = value;
    var preview = "/assets/sin_imagen.webp";

    if (name === "imagen") {
      if (!value || value.trim() === "") {
        preview = "/assets/sin_imagen.webp";
      } else if (value.startsWith("/assets/")) {
        try {
          // Simulación de conversión de ruta local
          preview = "../../.." + value;
        } catch (err) {
          console.warn("⚠️ No se pudo cargar la imagen local:", err);
          preview = "https://via.placeholder.com/150?text=Sin+imagen";
        }
      } else {
        preview = value;
      }
    }
    return { nuevoFormData: nuevoFormData, preview: preview };
  },

  /**
   * 💾 handleSubmit:
   * Valida y prepara un nuevo producto.
   * Devuelve un objeto con:
   *  - valido: true/false
   *  - mensaje: texto de feedback
   *  - nuevoProducto: objeto producto si es válido, null si no
   */
  handleSubmit: function (formData) {
    if (!formData || !formData.nombre || !formData.precio) {
      return {
        valido: false,
        mensaje: "⚠️ Debes completar al menos nombre y precio.",
        nuevoProducto: null,
      };
    }

    // Resolver imagen final
    var imagenFinal = formData.imagen;
    if (!imagenFinal || imagenFinal.trim() === "") {
      imagenFinal = "/assets/sin_imagen.webp";
    } else if (imagenFinal.startsWith("/assets/")) {
      try {
        imagenFinal = "../../.." + imagenFinal;
      } catch (e) {
        imagenFinal = "https://via.placeholder.com/150?text=Sin+imagen";
      }
    }

    // Crear objeto producto válido
    var producto = {
      id: 12345, // Simulación (Date.now() en tiempo real)
      nombre: formData.nombre.trim(),
      precio: Number(formData.precio),
      stock: Number(formData.stock) || 0,
      categoriaId: formData.categoriaId ? Number(formData.categoriaId) : null,
      imagen: imagenFinal,
      descripcion: (formData.descripcion ? formData.descripcion.trim() : "Producto sin descripción"),
    };

    return {
      valido: true,
      mensaje: "✅ Producto agregado: " + formData.nombre,
      nuevoProducto: producto,
    };
  },

  /**
   * 🔀 getRedirectUrl:
   * Devuelve la URL de redirección después de guardar un producto.
   */
  getRedirectUrl: function () {
    return "/panelProductos";
  },
};
