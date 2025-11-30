/* 
  src/utils/Contacto.logic.js
  Lógica pura separada del componente Contacto.jsx
  Todas las funciones quedan dentro del objeto global window.ContactoLogic
  Esto permite que Karma + Jasmine las detecten sin necesidad de importación de módulos.
*/

window.ContactoLogic = {
  /**
   * Valida los campos del formulario de contacto.
   * Retorna un objeto con:
   *  - tipo: "error" o "exito"
   *  - texto: arreglo con mensajes
   */
  validarFormulario: function (nombre, email, contenido) {
    var errores = [];

    if (!nombre || nombre.trim() === "") errores.push("El nombre no puede estar vacío.");
    if (!email || !email.includes("@")) errores.push("El correo electrónico no es válido.");
    if (!contenido || contenido.trim() === "") errores.push("El mensaje no puede estar vacío.");

    if (errores.length > 0) {
      return { tipo: "error", texto: errores };
    } else {
      return { tipo: "exito", texto: ["✅ Envío exitoso"] };
    }
  },

  /**
   * Reinicia los campos del formulario.
   * Devuelve un objeto con todos los campos vacíos.
   */
  resetFormulario: function () {
    return { nombre: "", email: "", contenido: "" };
  },

  /**
   * Simula la redirección después del envío exitoso.
   * Retorna la URL de destino para verificar en pruebas.
   */
  getRedirectUrl: function () {
    return "/";
  },
};
