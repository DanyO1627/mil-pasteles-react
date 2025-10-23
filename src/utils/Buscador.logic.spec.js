// src/utils/Buscador.logic.spec.js
// ======================================================
// Pruebas unitarias Jasmine para Buscador.logic.js
// Cada función tiene al menos 3 tests:
//  - Caso válido
//  - Caso nulo / incorrecto
//  - Caso borde
// ======================================================

describe("BuscadorLogic", function () {
  // ======================================================
  // Tests para handleChange
  // ======================================================
  it("debe retornar el valor del input cuando el evento es válido", function () {
    var e = { target: { value: "chocolate" } };
    var result = window.BuscadorLogic.handleChange(e);
    expect(result).toBe("chocolate");
  });

  it("debe retornar cadena vacía si el evento es nulo", function () {
    var result = window.BuscadorLogic.handleChange(null);
    expect(result).toBe("");
  });

  it("debe retornar cadena vacía si target.value está indefinido", function () {
    var e = { target: {} };
    var result = window.BuscadorLogic.handleChange(e);
    expect(result).toBe("");
  });

  // ======================================================
  // Tests para clear
  // ======================================================
  it("debe limpiar y ejecutar onSearch si debounceMs es 0", function () {
    var called = false;
    function mockSearch(value) {
      called = value === "";
    }
    var result = window.BuscadorLogic.clear(mockSearch, 0);
    expect(result).toBe("");
    expect(called).toBeTrue();
  });

  it("no debe ejecutar onSearch si debounceMs > 0", function () {
    var called = false;
    function mockSearch() {
      called = true;
    }
    window.BuscadorLogic.clear(mockSearch, 200);
    expect(called).toBeFalse();
  });

  it("debe retornar cadena vacía aunque debounceMs sea inválido", function () {
    var result = window.BuscadorLogic.clear(null, "abc");
    expect(result).toBe("");
  });

  // ======================================================
  // Tests para debounceEffect
  // ======================================================
  it("debe resolver la promesa con el término luego del tiempo indicado", function (done) {
    var start = Date.now();
    window.BuscadorLogic.debounceEffect("vainilla", 100, function (t) {
      expect(t).toBe("vainilla");
    }).then(function (result) {
      var elapsed = Date.now() - start;
      expect(result).toBe("vainilla");
      expect(elapsed).toBeGreaterThanOrEqual(90);
      done();
    });
  });

  it("debe resolver inmediatamente si debounceMs <= 0", function (done) {
    window.BuscadorLogic.debounceEffect("fresa", 0, function (t) {
      expect(t).toBe("fresa");
    }).then(function (result) {
      expect(result).toBe("fresa");
      done();
    });
  });

  it("debe manejar callback nulo sin errores", function (done) {
    window.BuscadorLogic.debounceEffect("nuez", 50, null).then(function (result) {
      expect(result).toBe("nuez");
      done();
    });
  });
});
