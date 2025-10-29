/* src/utils/Registro.logic.spec.js
   Pruebas unitarias Jasmine para la lógica de Registro.
   Importante: usar window.RegistroLogic sin destructurar para evitar conflictos.
*/

describe("RegistroLogic", function () {
  // Asegura que el namespace exista
  it("debe exponer window.RegistroLogic", function () {
    expect(typeof window.RegistroLogic).toBe("object");
  });

  // ---------------- normalizeEmail ----------------
  describe("normalizeEmail", function () {
    it("convierte a minúsculas y recorta espacios (válido)", function () {
      var out = window.RegistroLogic.normalizeEmail("  USER@MAIL.COM  ");
      expect(out).toBe("user@mail.com");
    });

    it("maneja entrada nula/incorrecta devolviendo string vacío", function () {
      var out = window.RegistroLogic.normalizeEmail(null);
      expect(out).toBe("");
    });

    it("caso borde: string vacío", function () {
      var out = window.RegistroLogic.normalizeEmail("");
      expect(out).toBe("");
    });
  });

  // ---------------- validateForm ----------------
  describe("validateForm", function () {
    it("retorna [] cuando el formulario es válido (entrada válida)", function () {
      var form = { nombre: "Ana", email: "ana@mail.com", clave1: "secret1", clave2: "secret1", region: "X", comuna: "Y" };
      var errores = window.RegistroLogic.validateForm(form);
      expect(errores.length).toBe(0);
    });

    it("retorna error cuando el form es nulo/incorrecto", function () {
      var errores = window.RegistroLogic.validateForm(null);
      expect(errores).toContain("Formulario inválido.");
    });

    it("caso borde: contraseñas distintas", function () {
      var form = { nombre: "Ana", email: "ana@mail.com", clave1: "secret1", clave2: "otro", region: "X", comuna: "Y" };
      var errores = window.RegistroLogic.validateForm(form);
      expect(errores).toContain("Las contraseñas no coinciden.");
    });
  });

  // ---------------- computeComunas ----------------
  describe("computeComunas", function () {
    var mapa = { R1: ["C1", "C2"], R2: ["C3"] };

    it("retorna comunas correctas para la región (entrada válida)", function () {
      var out = window.RegistroLogic.computeComunas("R1", mapa);
      expect(out).toEqual(["C1", "C2"]);
    });

    it("maneja mapa nulo/incorrecto devolviendo []", function () {
      var out = window.RegistroLogic.computeComunas("R1", null);
      expect(Array.isArray(out)).toBe(true);
      expect(out.length).toBe(0);
    });

    it("caso borde: región inexistente", function () {
      var out = window.RegistroLogic.computeComunas("R3", mapa);
      expect(out).toEqual([]);
    });
  });

  // ---------------- isDuplicateEmail ----------------
  describe("isDuplicateEmail", function () {
    var usuarios = [{ email: "uno@mail.com" }, { email: "dos@mail.com" }];

    it("detecta duplicado (entrada válida)", function () {
      var dup = window.RegistroLogic.isDuplicateEmail(usuarios, "  UNO@mail.com ");
      expect(dup).toBe(true);
    });

    it("maneja lista nula/incorrecta devolviendo false", function () {
      var dup = window.RegistroLogic.isDuplicateEmail(null, "x@y.com");
      expect(dup).toBe(false);
    });

    it("caso borde: email vacío", function () {
      var dup = window.RegistroLogic.isDuplicateEmail(usuarios, "");
      expect(dup).toBe(false);
    });
  });

  // ---------------- generarEstadoAleatorio ----------------
  describe("generarEstadoAleatorio", function () {
    it("retorna uno de los estados disponibles (entrada válida)", function () {
      var estados = ["A", "B", "C"];
      var out = window.RegistroLogic.generarEstadoAleatorio(estados);
      expect(estados.indexOf(out) >= 0).toBe(true);
    });

    it("maneja arreglo nulo/incorrecto devolviendo 'Pendiente'", function () {
      var out = window.RegistroLogic.generarEstadoAleatorio(null);
      expect(out).toBe("Pendiente");
    });

    it("caso borde: arreglo vacío", function () {
      var out = window.RegistroLogic.generarEstadoAleatorio([]);
      expect(out).toBe("Pendiente");
    });
  });

  // ---------------- buildNuevoUsuario ----------------
  describe("buildNuevoUsuario", function () {
    it("construye el usuario correctamente (entrada válida)", function () {
      var fakeNow = function () { return 1234567890; };
      var fakeIso = function () { return "2025-10-29"; };
      var form = { nombre: "Ana", email: "ana@mail.com", clave1: "secret1", region: "R", comuna: "C" };
      var u = window.RegistroLogic.buildNuevoUsuario(form, "Completado", fakeNow, fakeIso);
      expect(u.id).toBe("USR1234567890");
      expect(u.fecha).toBe("2025-10-29");
      expect(u.estado).toBe("Completado");
      expect(u.rol).toBe("cliente");
    });

    it("maneja proveedores de fecha nulos usando Date por defecto", function () {
      var form = { nombre: "Ana", email: "ana@mail.com", clave1: "secret1", region: "R", comuna: "C" };
      var u = window.RegistroLogic.buildNuevoUsuario(form, "Pendiente");
      expect(u.id.indexOf("USR")).toBe(0);
      expect(typeof u.fecha).toBe("string");
    });

    it("caso borde: estado vacío", function () {
      var form = { nombre: "Ana", email: "ana@mail.com", clave1: "secret1", region: "R", comuna: "C" };
      var u = window.RegistroLogic.buildNuevoUsuario(form, "", function(){return 1;}, function(){return "2000-01-01";});
      expect(u.estado).toBe("");
    });
  });

  // ---------------- changeHandler ----------------
  describe("changeHandler", function () {
    it("actualiza el campo indicado (entrada válida)", function () {
      var form = { nombre: "A", email: "a@a.com" };
      var next = window.RegistroLogic.changeHandler(form, "nombre", "B");
      expect(next.nombre).toBe("B");
      expect(form.nombre).toBe("A"); // inmutable
    });

    it("maneja nombre de campo inexistente sin error", function () {
      var form = { nombre: "A" };
      var next = window.RegistroLogic.changeHandler(form, "xyz", "1");
      expect(next.xyz).toBe("1");
    });

    it("caso borde: form vacío", function () {
      var next = window.RegistroLogic.changeHandler({}, "email", "x@y.com");
      expect(next.email).toBe("x@y.com");
    });
  });

  // ---------------- submitRegistro ----------------
  describe("submitRegistro", function () {
    var estados = ["Completado", "Pendiente", "Cancelado"];
    var mapa = { R: ["C"] };

    it("retorna ok=true y nuevoUsuario cuando todo es válido (entrada válida)", function () {
      var form = { nombre: "Ana", email: "ana@mail.com", clave1: "secret1", clave2: "secret1", region: "R", comuna: "C" };
      var res = window.RegistroLogic.submitRegistro(form, [], mapa, estados, function(){return 42;}, function(){return "2025-10-29";});
      expect(res.ok).toBe(true);
      expect(res.nuevoUsuario).toBeTruthy();
      expect(res.navigateTo).toBe("/");
      expect(res.showToast).toBe(true);
      expect(res.messageType).toBe("success");
    });

    it("retorna errores si el formulario es inválido (nulo/incorrecto)", function () {
      var res = window.RegistroLogic.submitRegistro(null, [], mapa, estados);
      expect(res.ok).toBe(false);
      expect(res.messageType).toBe("danger");
      expect(Array.isArray(res.errores)).toBe(true);
      expect(res.nuevoUsuario).toBeNull();
    });

    it("caso borde: correo duplicado", function () {
      var form = { nombre: "Ana", email: "ana@mail.com", clave1: "secret1", clave2: "secret1", region: "R", comuna: "C" };
      var usuarios = [{ email: "ANA@mail.com" }];
      var res = window.RegistroLogic.submitRegistro(form, usuarios, mapa, estados);
      expect(res.ok).toBe(false);
      expect(res.messageType).toBe("warning");
      expect(res.messageHtml.indexOf("ya está registrado") >= 0).toBe(true);
    });
  });
});
