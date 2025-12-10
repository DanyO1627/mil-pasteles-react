/* ============================================================
   Lógica pura del componente IniciarSesion.jsx
   Todas las funciones encapsuladas en window.IniciarSesionLogic
   ============================================================ */
window.IniciarSesionLogic = {
  /* -----------------------------------------------
     onChange: actualiza el formulario de login
     Entrada: form actual y evento simulado {target:{name, value}}
     Retorna: nuevo objeto form actualizado
  ----------------------------------------------- */
  onChange: function (form, e) {
    if (!form || !e || !e.target) return form || {};
    var name = e.target.name;
    var value = e.target.value;
    return Object.assign({}, form, { [name]: value });
  },

  /* -----------------------------------------------
     onSubmit: valida credenciales y determina rol
     Entrada: form (correo, clave), mocks de localStorage y navigate
     Retorna: objeto con resultado, tipo y mensaje
  ----------------------------------------------- */
  onSubmit: function (form, localStorageMock, navigateMock) {
    if (!form || !form.correo || !form.clave) {
      return { tipo: "alerta", mensaje: "⚠️ Por favor completa todos los campos." };
    }

    var correo = form.correo;
    var clave = form.clave;

    // 1️⃣ Verificar si es empleado/admin
    if (correo.includes("@milsabores.cl")) {
      var administradores = [];
      try {
        administradores = JSON.parse(localStorageMock.getItem("dataAdministradores") || "[]");
      } catch (e) {}

      var adminEncontrado = administradores.find(function (a) {
        return a.email === correo;
      });

      if (!adminEncontrado) {
        return { tipo: "error", mensaje: "❌ No existe una cuenta de empleado con este correo." };
      }

      if (adminEncontrado.clave !== clave) {
        return { tipo: "error", mensaje: "❌ Contraseña incorrecta." };
      }

      // ✅ Login correcto como admin
      var adminConAcceso = Object.assign({}, adminEncontrado, {
        ultimoAcceso: "mockFecha",
      });

      var adminActualizados = administradores.map(function (a) {
        return a.email === correo ? adminConAcceso : a;
      });
      localStorageMock.setItem("dataAdministradores", JSON.stringify(adminActualizados));
      localStorageMock.setItem("adminActivo", JSON.stringify(adminConAcceso));

      if (navigateMock) navigateMock("/adminHome");
      return { tipo: "exito", mensaje: "✅ Bienvenido/a " + adminEncontrado.nombre + "!" };
    }

    // 2️⃣ Caso cliente normal
    var usuarios = [];
    try {
      usuarios = JSON.parse(localStorageMock.getItem("pasteleria_usuarios") || "[]");
    } catch (e) {}

    var usuarioEncontrado = usuarios.find(function (u) {
      return u.email === correo;
    });

    if (!usuarioEncontrado) {
      return { tipo: "error", mensaje: "❌ No existe una cuenta registrada con este correo." };
    }

    if (usuarioEncontrado.clave !== clave) {
      return { tipo: "error", mensaje: "❌ Contraseña incorrecta." };
    }

    // ✅ Login correcto como cliente
    localStorageMock.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    if (navigateMock) navigateMock("/");
    return {
      tipo: "exito",
      mensaje: "✅ Inicio de sesión exitoso, bienvenido/a " + usuarioEncontrado.nombre + "!",
    };
  },

  /* -----------------------------------------------
     handleResetCompleto: restaura datos de localStorage
     Retorna: objeto con confirmación del reseteo
  ----------------------------------------------- */
  handleResetCompleto: function (localStorageMock, confirmarMock, alertMock, reloadMock) {
    if (!confirmarMock || !confirmarMock()) {
      return { tipo: "cancelado", mensaje: "❌ Cancelado por el usuario." };
    }

    var claves = [
      "dataAdministradores",
      "adminActivo",
      "usuarioActivo",
      "categorias",
      "inventario",
      "pasteleria_usuarios",
    ];
    claves.forEach(function (k) {
      localStorageMock.removeItem(k);
    });

    if (alertMock) alertMock("✅ Sistema restaurado. Recarga la página para aplicar los cambios.");
    if (reloadMock) reloadMock();
    return { tipo: "exito", mensaje: "✅ Sistema restaurado correctamente." };
  },
};