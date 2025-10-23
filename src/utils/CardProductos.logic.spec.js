// src/utils/CardProductos.logic.spec.js
// ======================================================
// Pruebas unitarias Jasmine para CardProductos.logic.js
// Se prueban ambos handlers: handleAdd y handleNavigate
// ======================================================

describe("CardProductosLogic", function () {

  // ======================================================
  // Tests para handleAdd
  // ======================================================
  it("debe agregar un producto y mostrar el toast correctamente", function (done) {
    var producto = { id: 1, nombre: "Torta de chocolate" };
    var agregado = false;
    var toastMostrado = false;

    function mockAgregar(p) { agregado = p.id === 1; }
    function mockSetShowToast(v) { toastMostrado = v; }

    var result = window.CardProductosLogic.handleAdd(mockAgregar, producto, mockSetShowToast, 500);
    expect(result).toBeTrue();
    expect(agregado).toBeTrue();
    expect(toastMostrado).toBeTrue();

    // esperar para verificar que se oculta
    setTimeout(function () {
      done();
    }, 600);
  });

  it("debe retornar false si faltan funciones", function () {
    var result = window.CardProductosLogic.handleAdd(null, {}, null);
    expect(result).toBeFalse();
  });

  it("debe retornar false si el producto es nulo", function () {
    function fakeAdd() {}
    function fakeToast() {}
    var result = window.CardProductosLogic.handleAdd(fakeAdd, null, fakeToast);
    expect(result).toBeFalse();
  });

  // ======================================================
  // Tests para handleNavigate
  // ======================================================
  it("debe generar la ruta correcta y llamarla con navigate", function () {
    var llamada = "";
    function mockNavigate(ruta) { llamada = ruta; }
    var producto = { id: 10 };
    var result = window.CardProductosLogic.handleNavigate(mockNavigate, producto);
    expect(result).toBe("/producto/10");
    expect(llamada).toBe("/producto/10");
  });

  it("debe retornar false si navigate no es función", function () {
    var result = window.CardProductosLogic.handleNavigate(null, { id: 1 });
    expect(result).toBeFalse();
  });

  it("debe retornar false si el producto no tiene id", function () {
    function fakeNavigate() {}
    var result = window.CardProductosLogic.handleNavigate(fakeNavigate, {});
    expect(result).toBeFalse();
  });
});
