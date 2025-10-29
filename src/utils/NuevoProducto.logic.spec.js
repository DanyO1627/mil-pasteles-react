/*
  src/utils/NuevoProducto.logic.spec.js
  Pruebas unitarias Jasmine para la lógica del componente NuevoProducto.
  Se accede a las funciones mediante window.NuevoProductoLogic.
*/

describe("NuevoProductoLogic", function () {
  it("debe exponer window.NuevoProductoLogic", function () {
    expect(typeof window.NuevoProductoLogic).toBe("object");
  });

  // ---------------- handleChange ----------------
  describe("handleChange", function () {
    it("debe actualizar el valor de un campo correctamente", function () {
      var form = { nombre: "", imagen: "" };
      var res = window.NuevoProductoLogic.handleChange(form, "nombre", "Torta");
      expect(res.nuevoFormData.nombre).toBe("Torta");
    });

    it("debe asignar imagen por defecto si el campo está vacío", function () {
      var form = { imagen: "" };
      var res = window.NuevoProductoLogic.handleChange(form, "imagen", "");
      expect(res.preview).toBe("/assets/sin_imagen.webp");
    });

    it("debe usar la URL externa si comienza con https", function () {
      var form = { imagen: "" };
      var res = window.NuevoProductoLogic.handleChange(form, "imagen", "https://img.png");
      expect(res.preview).toContain("https://img.png");
    });
  });

  // ---------------- handleSubmit ----------------
  describe("handleSubmit", function () {
    it("debe devolver error si faltan nombre o precio", function () {
      var form = { nombre: "", precio: "" };
      var res = window.NuevoProductoLogic.handleSubmit(form);
      expect(res.valido).toBeFalse();
      expect(res.mensaje).toContain("Debes completar al menos nombre");
    });

    it("debe crear producto válido con datos completos", function () {
      var form = { nombre: "Cheesecake", precio: "12000", stock: 3, imagen: "/assets/img.png", descripcion: "Rico" };
      var res = window.NuevoProductoLogic.handleSubmit(form);
      expect(res.valido).toBeTrue();
      expect(res.nuevoProducto.nombre).toBe("Cheesecake");
      expect(res.nuevoProducto.precio).toBe(12000);
    });

    it("debe asignar imagen por defecto si está vacía", function () {
      var form = { nombre: "Brownie", precio: "2000", imagen: "" };
      var res = window.NuevoProductoLogic.handleSubmit(form);
      expect(res.nuevoProducto.imagen).toBe("/assets/sin_imagen.webp");
    });
  });

  // ---------------- getRedirectUrl ----------------
  describe("getRedirectUrl", function () {
    it("debe retornar la ruta del panel de productos", function () {
      var url = window.NuevoProductoLogic.getRedirectUrl();
      expect(url).toBe("/panelProductos");
    });

    it("debe retornar un string", function () {
      var url = window.NuevoProductoLogic.getRedirectUrl();
      expect(typeof url).toBe("string");
    });

    it("debe comenzar con una barra /", function () {
      var url = window.NuevoProductoLogic.getRedirectUrl();
      expect(url.startsWith("/")).toBeTrue();
    });
  });
});
