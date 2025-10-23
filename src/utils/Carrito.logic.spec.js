// src/utils/Carrito.logic.spec.js
// ======================================================
// Pruebas unitarias con Jasmine + Karma para Carrito.logic.js
// Se evalúan los tres handlers principales: handleComprar, handleEliminar y handleVaciar
// ======================================================

describe("CarritoLogic", function () {

  // ======================================================
  // Pruebas para handleComprar
  // ======================================================
  it("debe ejecutar procesarCompra correctamente y mostrar mensaje", function () {
    let mensaje = "";
    const procesarCompra = function () { return { success: true, message: "Compra exitosa" }; };
    const setMensaje = function (msg) { mensaje = msg; };
    const navigate = jasmine.createSpy("navigate");

    const resultado = window.CarritoLogic.handleComprar(procesarCompra, setMensaje, navigate, 10);

    expect(resultado.success).toBeTrue();
    expect(mensaje).toBe("Compra exitosa");
  });

  it("debe retornar error si las funciones son inválidas", function () {
    const resultado = window.CarritoLogic.handleComprar(null, null);
    expect(resultado.success).toBeFalse();
    expect(resultado.message).toBe("Funciones inválidas");
  });

  it("debe limpiar mensaje aunque la compra falle", function (done) {
    let mensaje = "";
    const procesarCompra = function () { return { success: false, message: "Error al comprar" }; };
    const setMensaje = function (msg) { mensaje = msg; };

    window.CarritoLogic.handleComprar(procesarCompra, setMensaje, null, 10);
    setTimeout(function () {
      expect(mensaje).toBe("");
      done();
    }, 20);
  });

  // ======================================================
  // Pruebas para handleEliminar
  // ======================================================
  it("debe eliminar un producto correctamente", function () {
    let eliminado = null;
    const eliminarDelCarrito = function (id) { eliminado = id; };
    const result = window.CarritoLogic.handleEliminar(eliminarDelCarrito, 123);
    expect(result).toBeTrue();
    expect(eliminado).toBe(123);
  });

  it("debe retornar false si falta la función o el id", function () {
    const result = window.CarritoLogic.handleEliminar(null, null);
    expect(result).toBeFalse();
  });

  it("debe manejar correctamente itemId undefined", function () {
    const eliminar = function () {};
    const result = window.CarritoLogic.handleEliminar(eliminar, undefined);
    expect(result).toBeFalse();
  });

  // ======================================================
  // Pruebas para handleVaciar
  // ======================================================
  it("debe ejecutar vaciarCarrito correctamente", function () {
    let vacio = false;
    const vaciarCarrito = function () { vacio = true; };
    const result = window.CarritoLogic.handleVaciar(vaciarCarrito);
    expect(result).toBeTrue();
    expect(vacio).toBeTrue();
  });

  it("debe retornar false si vaciarCarrito no es función", function () {
    const result = window.CarritoLogic.handleVaciar(null);
    expect(result).toBeFalse();
  });

  it("debe no lanzar errores con función vacía", function () {
    const vaciarCarrito = function () {};
    const result = window.CarritoLogic.handleVaciar(vaciarCarrito);
    expect(result).toBeTrue();
  });

});
