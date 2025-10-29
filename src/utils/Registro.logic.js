/* src/utils/Registro.logic.js
   Lógica pura y testable del componente Registro.
   Todas las funciones viven bajo window.RegistroLogic para uso global en tests (Jasmine/Karma) y en el componente.
*/
(function (global) {
  // Evitar redeclaraciones si el archivo se importa más de una vez
  if (global.RegistroLogic) return;

  const RegistroLogic = {};

  // --- Utilidades internas (puras) ---

  /**
   * normaliza el email a minúsculas y sin espacios alrededor.
   * @param {string} email
   * @returns {string}
   */
  RegistroLogic.normalizeEmail = function (email) {
    if (typeof email !== "string") return "";
    return email.trim().toLowerCase();
  };

  /**
   * Valida los campos básicos del formulario.
   * Devuelve un array de strings con mensajes de error (vacío si no hay errores).
   * @param {object} form {nombre, email, clave1, clave2, region, comuna}
   * @returns {string[]}
   */
  RegistroLogic.validateForm = function (form) {
    var errores = [];
    if (!form || typeof form !== "object") {
      return ["Formulario inválido."];
    }
    var nombre = (form.nombre || "").trim();
    var email = form.email || "";
    var clave1 = form.clave1 || "";
    var clave2 = form.clave2 || "";
    var region = form.region || "";
    var comuna = form.comuna || "";

    if (nombre === "") errores.push("El nombre no puede estar vacío.");
    if (RegistroLogic.normalizeEmail(email).indexOf("@") === -1) {
      errores.push("El correo electrónico no es válido.");
    }
    if (clave1.length < 6) {
      errores.push("La contraseña debe tener al menos 6 caracteres.");
    }
    if (clave1 !== clave2) {
      errores.push("Las contraseñas no coinciden.");
    }
    if (!region) errores.push("Debes seleccionar una región.");
    if (!comuna) errores.push("Debes seleccionar una comuna.");
    return errores;
  };

  /**
   * Dado el nombre de región y el mapa comunasPorRegion, retorna el arreglo de comunas.
   * Si no existe la región, retorna [].
   * @param {string} region
   * @param {object} comunasPorRegion
   * @returns {string[]}
   */
  RegistroLogic.computeComunas = function (region, comunasPorRegion) {
    if (!region || !comunasPorRegion || typeof comunasPorRegion !== "object") {
      return [];
    }
    var lista = comunasPorRegion[region];
    return Array.isArray(lista) ? lista.slice() : [];
  };

  /**
   * Indica si un email ya existe dentro de la lista de usuarios.
   * @param {Array<{email:string}>} usuarios
   * @param {string} email
   * @returns {boolean}
   */
  RegistroLogic.isDuplicateEmail = function (usuarios, email) {
    var target = RegistroLogic.normalizeEmail(email);
    if (!Array.isArray(usuarios) || target === "") return false;
    for (var i = 0; i < usuarios.length; i++) {
      var uEmail = usuarios[i] && usuarios[i].email ? RegistroLogic.normalizeEmail(usuarios[i].email) : "";
      if (uEmail === target) return true;
    }
    return false;
  };

  /**
   * Retorna al azar un estado desde un arreglo. Si el arreglo es inválido, retorna "Pendiente".
   * @param {string[]} estados
   * @returns {string}
   */
  RegistroLogic.generarEstadoAleatorio = function (estados) {
    if (!Array.isArray(estados) || estados.length === 0) return "Pendiente";
    var idx = Math.floor(Math.random() * estados.length);
    return estados[idx];
  };

  /**
   * Construye el objeto de usuario a partir del form y el estado.
   * Permite inyectar dateNowProvider para pruebas determinísticas.
   * @param {object} form
   * @param {string} estado
   * @param {function} dateNowProvider  (opcional) => número tipo Date.now()
   * @param {function} dateIsoProvider  (opcional) => string fecha AAAA-MM-DD
   * @returns {object}
   */
  RegistroLogic.buildNuevoUsuario = function (form, estado, dateNowProvider, dateIsoProvider) {
    var nowFn = typeof dateNowProvider === "function" ? dateNowProvider : Date.now;
    var isoFn =
      typeof dateIsoProvider === "function"
        ? dateIsoProvider
        : function () {
            var d = new Date();
            return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
          };

    return {
      fecha: isoFn(),
      id: "USR" + nowFn(),
      nombre: form.nombre,
      email: form.email,
      clave: form.clave1,
      region: form.region,
      comuna: form.comuna,
      estado: estado,
      monto: 0,
      rol: "cliente",
    };
  };

  /**
   * Simula el handler de cambio de inputs.
   * Devuelve un nuevo objeto form con el cambio aplicado.
   * @param {object} form
   * @param {string} name
   * @param {string} value
   * @returns {object} nuevo form
   */
  RegistroLogic.changeHandler = function (form, name, value) {
    var next = Object.assign({}, form);
    next[name] = value;
    return next;
  };

  /**
   * Lógica pura del envío de formulario (equivalente a onSubmit).
   * NO realiza efectos secundarios de React: solo devuelve un resultado para que el componente actúe.
   * @param {object} form
   * @param {Array<{email:string}>} usuarios
   * @param {object} comunasPorRegion  (para validaciones que dependan de región/comuna si fuese necesario)
   * @param {string[]} estados
   * @param {function} dateNowProvider (opcional) para pruebas
   * @param {function} dateIsoProvider (opcional) para pruebas
   * @returns {{
   *  ok: boolean,
   *  errores: string[],
   *  nuevoUsuario: object|null,
   *  messageType: 'success' | 'warning' | 'danger',
   *  messageHtml: string,          // HTML listo para inyectar si se desea
   *  navigateTo: string|null,      // ruta a navegar si ok
   *  showToast: boolean
   * }}
   */
  RegistroLogic.submitRegistro = function (
    form,
    usuarios,
    comunasPorRegion,
    estados,
    dateNowProvider,
    dateIsoProvider
  ) {
    // Validación base
    var errores = RegistroLogic.validateForm(form);
    if (errores.length > 0) {
      return {
        ok: false,
        errores: errores,
        nuevoUsuario: null,
        messageType: "danger",
        messageHtml:
          '<div class="alert alert-danger"><ul>' +
          errores.map(function (e) { return "<li>" + e + "</li>"; }).join("") +
          "</ul></div>",
        navigateTo: null,
        showToast: false,
      };
    }

    // Duplicado
    if (RegistroLogic.isDuplicateEmail(usuarios, form.email)) {
      return {
        ok: false,
        errores: ["Correo duplicado"],
        nuevoUsuario: null,
        messageType: "warning",
        messageHtml:
          '<div class="alert alert-warning">⚠️ Este correo ya está registrado. Intenta con otro.</div>',
        navigateTo: null,
        showToast: false,
      };
    }

    // Éxito
    var estado = RegistroLogic.generarEstadoAleatorio(Array.isArray(estados) ? estados : ["Completado","Pendiente","Cancelado"]);
    var nuevoUsuario = RegistroLogic.buildNuevoUsuario(form, estado, dateNowProvider, dateIsoProvider);

    return {
      ok: true,
      errores: [],
      nuevoUsuario: nuevoUsuario,
      messageType: "success",
      messageHtml: '<div class="alert alert-success">✅ Registro exitoso</div>',
      navigateTo: "/",
      showToast: true,
    };
  };

  // Exponer en window
  global.RegistroLogic = RegistroLogic;
})(typeof window !== "undefined" ? window : this);
