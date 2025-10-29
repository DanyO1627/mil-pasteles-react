// src/utils/Carrito.logic.spec.js
// Pruebas unitarias sobre la lógica extraída del componente Carrito.
// NOTA: no usar destructuring de window.* según requisito.

import "./Carrito.logic.js"; // <-- Importa la lógica antes de usarla

describe("CarritoLogic - existencia básica", function () {
  it("debería exponer window.CarritoLogic", function () {
    expect(typeof window.CarritoLogic).toBe("object");
  });
});

describe("CarritoLogic.handleComprar", function () {
  // Caso válido
  it("cuando carrito tiene elementos, retorna navigate a /compra", function () {
    var res = window.CarritoLogic.handleComprar(2);
    expect(res && res.type).toBe("navigate"); // acción de navegación
    expect(res && res.to).toBe("/compra");
  });

  // Entrada nula/incorrecta
  it("cuando carritoLength es null/undefined/NaN, retorna alert", function () {
    var r1 = window.CarritoLogic.handleComprar(null);
    var r2 = window.CarritoLogic.handleComprar(undefined);
    var r3 = window.CarritoLogic.handleComprar("no-num");
    expect(r1.type).toBe("alert");
    expect(r2.type).toBe("alert");
    expect(r3.type).toBe("alert");
  });

  // Caso borde
  it("cuando carritoLength es 0 o negativo, retorna alert", function () {
    var r0 = window.CarritoLogic.handleComprar(0);
    var rn = window.CarritoLogic.handleComprar(-3);
    expect(r0.type).toBe("alert");
    expect(rn.type).toBe("alert");
  });
});

describe("CarritoLogic.shouldDisableAddButton", function () {
  // Caso válido
  it("con stock positivo, NO deshabilita", function () {
    var res = window.CarritoLogic.shouldDisableAddButton(5);
    expect(res).toBe(false);
  });

  // Entrada nula/incorrecta
  it("con stock null/undefined/'0', deshabilita", function () {
    var r1 = window.CarritoLogic.shouldDisableAddButton(null);
    var r2 = window.CarritoLogic.shouldDisableAddButton(undefined);
    var r3 = window.CarritoLogic.shouldDisableAddButton("0");
    expect(r1).toBe(true);
    expect(r2).toBe(true);
    expect(r3).toBe(true);
  });

  // Caso borde
  it("con stock negativo, se considera distinto de 0 y NO deshabilita", function () {
    var res = window.CarritoLogic.shouldDisableAddButton(-1);
    expect(res).toBe(false);
  });
});

describe("CarritoLogic.calcItemSubtotal", function () {
  // Caso válido
  it("multiplica precio*cantidad correctamente", function () {
    var res = window.CarritoLogic.calcItemSubtotal(1000, 2);
    expect(res).toBe(2000);
  });

  // Entrada nula/incorrecta
  it("con valores no numéricos/nulos, trata como 0", function () {
    var r1 = window.CarritoLogic.calcItemSubtotal(null, 3);
    var r2 = window.CarritoLogic.calcItemSubtotal("a", "b");
    expect(r1).toBe(0);
    expect(r2).toBe(0);
  });

  // Caso borde
  it("si alguno es negativo, se recorta a 0 antes de multiplicar", function () {
    var r1 = window.CarritoLogic.calcItemSubtotal(-5, 2);
    var r2 = window.CarritoLogic.calcItemSubtotal(10, -3);
    expect(r1).toBe(0);
    expect(r2).toBe(0);
  });
});

describe("CarritoLogic.hasInventarioEnLocalStorage", function () {
  // Caso válido
  it("con un string truthy, devuelve true", function () {
    var res = window.CarritoLogic.hasInventarioEnLocalStorage("[]");
    expect(res).toBe(true);
  });

  // Entrada nula/incorrecta
  it("con null o undefined, devuelve false", function () {
    var r1 = window.CarritoLogic.hasInventarioEnLocalStorage(null);
    var r2 = window.CarritoLogic.hasInventarioEnLocalStorage(undefined);
    expect(r1).toBe(false);
    expect(r2).toBe(false);
  });

  // Caso borde
  it("con string vacío, devuelve false", function () {
    var res = window.CarritoLogic.hasInventarioEnLocalStorage("");
    expect(res).toBe(false);
  });
});

describe("CarritoLogic.getVerProductosRoute", function () {
  // Caso válido
  it("siempre retorna '/productos'", function () {
    var res = window.CarritoLogic.getVerProductosRoute();
    expect(res).toBe("/productos");
  });

  // Entrada nula/incorrecta (no aplica, pero verificamos firma)
  it("no requiere argumentos y funciona igual", function () {
    var res = window.CarritoLogic.getVerProductosRoute(undefined);
    expect(res).toBe("/productos");
  });

  // Caso borde
  it("consistentemente devuelve la misma ruta", function () {
    var a = window.CarritoLogic.getVerProductosRoute();
    var b = window.CarritoLogic.getVerProductosRoute();
    expect(a).toBe("/productos");
    expect(b).toBe("/productos");
  });
});
