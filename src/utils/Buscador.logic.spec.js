// src/utils/Buscador.logic.spec.js
// Pruebas unitarias para la lógica del componente Buscador.
// Se prueban todos los comportamientos principales de las funciones extraídas.

import "./Buscador.logic.js"; // <-- Importa la lógica antes de usarla

describe("BuscadorLogic.handleChange", function () {
  it("debe devolver el valor del input correctamente", function () {
    var res = window.BuscadorLogic.handleChange({ target: { value: "Pastel" } });
    expect(res).toBe("Pastel");
  });

  it("debe devolver cadena vacía si event es null o inválido", function () {
    var r1 = window.BuscadorLogic.handleChange(null);
    var r2 = window.BuscadorLogic.handleChange({});
    expect(r1).toBe("");
    expect(r2).toBe("");
  });

  it("debe devolver cadena vacía si target.value no es string", function () {
    var res = window.BuscadorLogic.handleChange({ target: { value: 123 } });
    expect(res).toBe("");
  });
});

describe("BuscadorLogic.clear", function () {
  it("debe retornar cadena vacía siempre", function () {
    var res = window.BuscadorLogic.clear(null, 300);
    expect(res).toBe("");
  });

  it("debe ejecutar onSearch inmediatamente si debounceMs es 0", function () {
    var called = false;
    var fakeSearch = function (val) {
      called = val === "";
    };
    window.BuscadorLogic.clear(fakeSearch, 0);
    expect(called).toBeTrue();
  });

  it("no debe ejecutar onSearch si debounceMs > 0", function () {
    var called = false;
    var fakeSearch = function () {
      called = true;
    };
    window.BuscadorLogic.clear(fakeSearch, 500);
    expect(called).toBeFalse();
  });
});

describe("BuscadorLogic.debounceUpdate", function () {
  it("debe retornar el término limpio sin espacios", function () {
    var res = window.BuscadorLogic.debounceUpdate("  torta  ", 300);
    expect(res).toBe("torta");
  });

  it("debe retornar cadena vacía si term es null o no string", function () {
    var r1 = window.BuscadorLogic.debounceUpdate(null, 200);
    var r2 = window.BuscadorLogic.debounceUpdate(999, 100);
    expect(r1).toBe("");
    expect(r2).toBe("");
  });

  it("debe ignorar debounceMs inválido o negativo y retornar string limpio", function () {
    var r1 = window.BuscadorLogic.debounceUpdate("panqueque", -100);
    var r2 = window.BuscadorLogic.debounceUpdate("galleta", "abc");
    expect(r1).toBe("panqueque");
    expect(r2).toBe("galleta");
  });
});

describe("BuscadorLogic.triggerSearch", function () {
  it("debe ejecutar onSearch con término limpio", function () {
    var value = null;
    var fake = function (v) {
      value = v;
    };
    var res = window.BuscadorLogic.triggerSearch(fake, " torta ");
    expect(res).toBe("torta");
    expect(value).toBe("torta");
  });

  it("no debe fallar si onSearch no es función", function () {
    var res = window.BuscadorLogic.triggerSearch(null, "tarta");
    expect(res).toBe("tarta");
  });

  it("debe retornar cadena vacía si el término es null", function () {
    var res = window.BuscadorLogic.triggerSearch(function () {}, null);
    expect(res).toBe("");
  });
});