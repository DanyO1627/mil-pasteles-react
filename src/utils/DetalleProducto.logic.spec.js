// ✅ Pruebas unitarias para DetalleProducto.logic.js
// Se ejecutan con Jasmine + Karma

describe("DetalleProductoLogic", function () {
  // --- Tests para esSinStock() ---
  it("debe retornar true si el producto no tiene stock", function () {
    const result = window.DetalleProductoLogic.esSinStock({ stock: 0 });
    expect(result).toBeTrue();
  });

  it("debe retornar false si el producto tiene stock", function () {
    const result = window.DetalleProductoLogic.esSinStock({ stock: 5 });
    expect(result).toBeFalse();
  });

  it("debe manejar productos nulos o indefinidos", function () {
    const result = window.DetalleProductoLogic.esSinStock(null);
    expect(result).toBeTrue();
  });

  // --- Tests para esStockBajo() ---
  it("debe retornar true si el producto tiene stock bajo (1-3)", function () {
    const result = window.DetalleProductoLogic.esStockBajo({ stock: 2 });
    expect(result).toBeTrue();
  });

  it("debe retornar false si el stock es mayor a 3", function () {
    const result = window.DetalleProductoLogic.esStockBajo({ stock: 6 });
    expect(result).toBeFalse();
  });

  it("debe manejar productos inválidos sin error", function () {
    const result = window.DetalleProductoLogic.esStockBajo(undefined);
    expect(result).toBeFalse();
  });

  // --- Tests para handleAgregar() ---
  it("debe retornar true si el producto se agregó correctamente", function () {
    const mockAgregar = jasmine.createSpy("agregar").and.returnValue(true);
    const mockToast = jasmine.createSpy("toast");
    const result = window.DetalleProductoLogic.handleAgregar(
      { id: 1 },
      mockAgregar,
      mockToast
    );
    expect(result).toBeTrue();
    expect(mockToast).toHaveBeenCalledWith(true);
  });

  it("debe retornar false si no hay producto", function () {
    const result = window.DetalleProductoLogic.handleAgregar(
      null,
      () => true,
      () => {}
    );
    expect(result).toBeFalse();
  });

  it("debe retornar false si agregarAlCarrito no es función", function () {
    const result = window.DetalleProductoLogic.handleAgregar(
      { id: 1 },
      null,
      () => {}
    );
    expect(result).toBeFalse();
  });
});
