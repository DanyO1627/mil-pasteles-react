/*
  src/utils/Contacto.logic.spec.js
  Pruebas unitarias Jasmine para la lógica del componente Contacto.
  Todas las funciones se acceden mediante window.ContactoLogic.
*/

describe("ContactoLogic", function () {
  // Asegura que el objeto global exista
  it("debe exponer window.ContactoLogic", function () {
    expect(typeof window.ContactoLogic).toBe("object");
  });

  // ---------------- validarFormulario ----------------
  describe("validarFormulario", function () {
    it("retorna éxito si todos los campos son válidos", function () {
      var res = window.ContactoLogic.validarFormulario("Ana", "ana@mail.com", "Hola!");
      expect(res.tipo).toBe("exito");
      expect(res.texto[0]).toContain("✅ Envío exitoso");
    });

    it("retorna error si el nombre está vacío", function () {
      var res = window.ContactoLogic.validarFormulario("", "ana@mail.com", "Hola");
      expect(res.tipo).toBe("error");
      expect(res.texto).toContain("El nombre no puede estar vacío.");
    });

    it("retorna error si el email no contiene '@'", function () {
      var res = window.ContactoLogic.validarFormulario("Ana", "anamail.com", "Hola");
      expect(res.tipo).toBe("error");
      expect(res.texto).toContain("El correo electrónico no es válido.");
    });

    it("retorna error si el contenido está vacío", function () {
      var res = window.ContactoLogic.validarFormulario("Ana", "ana@mail.com", "");
      expect(res.tipo).toBe("error");
      expect(res.texto).toContain("El mensaje no puede estar vacío.");
    });

    it("maneja entradas nulas devolviendo error", function () {
      var res = window.ContactoLogic.validarFormulario(null, null, null);
      expect(res.tipo).toBe("error");
      expect(Array.isArray(res.texto)).toBe(true);
    });
  });

  // ---------------- resetFormulario ----------------
  describe("resetFormulario", function () {
    it("retorna todos los campos vacíos", function () {
      var form = window.ContactoLogic.resetFormulario();
      expect(form.nombre).toBe("");
      expect(form.email).toBe("");
      expect(form.contenido).toBe("");
    });

    it("devuelve un objeto nuevo (inmutable)", function () {
      var f1 = window.ContactoLogic.resetFormulario();
      var f2 = window.ContactoLogic.resetFormulario();
      expect(f1).not.toBe(f2);
    });

    it("maneja llamadas múltiples sin error", function () {
      for (var i = 0; i < 3; i++) {
        var form = window.ContactoLogic.resetFormulario();
        expect(typeof form).toBe("object");
      }
    });
  });

  // ---------------- getRedirectUrl ----------------
  describe("getRedirectUrl", function () {
    it("retorna '/' como URL de redirección", function () {
      var url = window.ContactoLogic.getRedirectUrl();
      expect(url).toBe("/");
    });

    it("debe retornar un string", function () {
      var url = window.ContactoLogic.getRedirectUrl();
      expect(typeof url).toBe("string");
    });

    it("coincide con la ruta raíz esperada", function () {
      var url = window.ContactoLogic.getRedirectUrl();
      expect(url.startsWith("/")).toBe(true);
    });
  });
});
