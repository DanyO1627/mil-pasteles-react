/* ============================================================
   Pruebas unitarias Jasmine para IniciarSesion.logic.js
   Todas las funciones son llamadas desde window.IniciarSesionLogic
   ============================================================ */
describe("IniciarSesionLogic", function () {
  var storageMock, navigateMock, alertMock, reloadMock;

  beforeEach(function () {
    storageMock = {
      data: {},
      getItem: function (k) {
        return this.data[k];
      },
      setItem: function (k, v) {
        this.data[k] = v;
      },
      removeItem: function (k) {
        delete this.data[k];
      },
    };
    navigateMock = jasmine.createSpy("navigateMock");
    alertMock = jasmine.createSpy("alertMock");
    reloadMock = jasmine.createSpy("reloadMock");
  });

  // ---------------- onChange ----------------
  describe("onChange", function () {
    it("actualiza el campo correctamente", function () {
      var form = { correo: "" };
      var e = { target: { name: "correo", value: "a@a.com" } };
      var res = window.IniciarSesionLogic.onChange(form, e);
      expect(res.correo).toBe("a@a.com");
    });

    it("maneja evento nulo devolviendo el form original", function () {
      var form = { correo: "x" };
      var res = window.IniciarSesionLogic.onChange(form, null);
      expect(res.correo).toBe("x");
    });

    it("maneja form nulo devolviendo objeto vacío", function () {
      var res = window.IniciarSesionLogic.onChange(null, { target: { name: "x", value: "1" } });
      expect(typeof res).toBe("object");
    });
  });

  // ---------------- onSubmit ----------------
  describe("onSubmit", function () {
    it("retorna error si faltan campos", function () {
      var res = window.IniciarSesionLogic.onSubmit({}, storageMock, navigateMock);
      expect(res.tipo).toBe("alerta");
    });

    it("valida login de administrador correcto", function () {
      storageMock.setItem(
        "dataAdministradores",
        JSON.stringify([{ email: "admin@milsabores.cl", clave: "1234", nombre: "Ana" }])
      );
      var form = { correo: "admin@milsabores.cl", clave: "1234" };
      var res = window.IniciarSesionLogic.onSubmit(form, storageMock, navigateMock);
      expect(res.tipo).toBe("exito");
      expect(navigateMock).toHaveBeenCalledWith("/adminHome");
    });

    it("valida login de cliente correcto", function () {
      storageMock.setItem(
        "pasteleria_usuarios",
        JSON.stringify([{ email: "user@mail.com", clave: "111", nombre: "Pedro" }])
      );
      var form = { correo: "user@mail.com", clave: "111" };
      var res = window.IniciarSesionLogic.onSubmit(form, storageMock, navigateMock);
      expect(res.tipo).toBe("exito");
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  });

  // ---------------- handleResetCompleto ----------------
  describe("handleResetCompleto", function () {
    it("elimina datos y muestra alerta si confirma", function () {
      var confirmar = function () {
        return true;
      };
      var res = window.IniciarSesionLogic.handleResetCompleto(
        storageMock,
        confirmar,
        alertMock,
        reloadMock
      );
      expect(res.tipo).toBe("exito");
      expect(alertMock).toHaveBeenCalled();
      expect(reloadMock).toHaveBeenCalled();
    });

    it("no hace nada si el usuario cancela", function () {
      var confirmar = function () {
        return false;
      };
      var res = window.IniciarSesionLogic.handleResetCompleto(
        storageMock,
        confirmar,
        alertMock,
        reloadMock
      );
      expect(res.tipo).toBe("cancelado");
    });
  });
});