// src/utils/EditarProducto.logic.spec.js
// ------------------------------------------------------------
// Pruebas unitarias con Jasmine para EditarProducto.logic.js
// Se testean 3 funciones principales con casos válidos, nulos y borde.
// ------------------------------------------------------------

describe("EditarProductoLogic", function () {
  beforeAll(function () {
    // Asegura que el objeto global esté disponible
    expect(window.EditarProductoLogic).toBeDefined();
  });

  // -------------------------------
  // 🔹 handleChange()
  // -------------------------------
  describe("handleChange()", function () {
    it("debe actualizar el campo indicado", function () {
      const e = { target: { name: "nombre", value: "Torta Fina" } };
      const result = window.EditarProductoLogic.handleChange(e, { nombre: "" });
      expect(result.nombre).toBe("Torta Fina");
    });

    it("debe asignar imagen por defecto si está vacía", function () {
      const e = { target: { name: "imagen", value: "" } };
      const result = window.EditarProductoLogic.handleChange(e, { imagen: "" });
      expect(result.preview).toBe("/assets/sin_imagen.webp");
    });

    it("debe ignorar eventos inválidos", function () {
      const result = window.EditarProductoLogic.handleChange(null, { nombre: "x" });
      expect(result.nombre).toBe("x");
    });
  });

  // -------------------------------
  // 🔹 prepararProducto()
  // -------------------------------
  describe("prepararProducto()", function () {
    it("debe devolver un objeto formateado correctamente", function () {
      const data = {
        nombre: "Cheesecake",
        precio: "4500",
        stock: "10",
        categoria: "Postres",
        imagen: "/assets/cheesecake.png",
        descripcion: "Rico postre",
      };
      const result = window.EditarProductoLogic.prepararProducto(data);
      expect(result.precio).toBe(4500);
      expect(result.imagen.includes("/assets/")).toBeTrue();
    });

    it("debe usar imagen por defecto si está vacía", function () {
      const data = { nombre: "Torta", imagen: "" };
      const result = window.EditarProductoLogic.prepararProducto(data);
      expect(result.imagen).toBe("/assets/sin_imagen.webp");
    });

    it("debe devolver objeto vacío si no recibe datos", function () {
      const result = window.EditarProductoLogic.prepararProducto(null);
      expect(result).toEqual({});
    });
  });

  // -------------------------------
  // 🔹 generarMensajeExito()
  // -------------------------------
  describe("generarMensajeExito()", function () {
    it("debe generar mensaje con el nombre incluido", function () {
      const result = window.EditarProductoLogic.generarMensajeExito("Brownie");
      expect(result).toContain("Brownie");
    });

    it("debe retornar mensaje genérico si el nombre es vacío", function () {
      const result = window.EditarProductoLogic.generarMensajeExito("");
      expect(result).toBe("✅ Producto actualizado");
    });

    it("debe manejar nombres no válidos sin error", function () {
      const result = window.EditarProductoLogic.generarMensajeExito(123);
      expect(result).toBe("✅ Producto actualizado");
    });
  });
});