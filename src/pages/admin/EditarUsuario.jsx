import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import "../../styles/global.css";

export default function EditarUsuario() {
  const { obtenerUsuario, editarUsuario } = useUsuarios();
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    email: "",
    region: "",
    comuna: "",
    estado: "",
    rol: "",
    categoria: "",
    fecha: "",
    clave1: "", // las claves por si quiere cambiarla
    clave2: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [comunas, setComunas] = useState([]);

  // Regiones - usa las tuyas mismas
  const regiones = {
    rm: ["Santiago", "Puente Alto", "Maipú", "La Florida"],
    v: ["Valparaíso", "Viña del Mar", "Quilpué"],
    biobio: ["Concepción", "Talcahuano", "Los Ángeles"],
  };

  const cambiarComunas = (region) => {
    setComunas(regiones[region] || []);
  };

  // carga usuarios según el id en la url
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      const user = obtenerUsuario(Number(id));
      if (user) {
        setUsuario({
          ...user,
          clave1: "",
          clave2: "",
        });
        cambiarComunas(user.region);
      }
    }
  }, [location.search]);

  // valida y envía las actualizaciones
  const guardarCambios = async () => {
    if (!usuario.nombre.trim() || !usuario.email.trim()) {
      return setMensaje("⚠️ Completa los campos obligatorios.");
    }

    if (usuario.clave1 && usuario.clave1.length < 6) {
      return setMensaje("⚠️ La contraseña debe tener 6 caracteres mínimo.");
    }

    if (usuario.clave1 !== usuario.clave2) {
      return setMensaje("⚠️ Las contraseñas no coinciden.");
    }

    // objetos para el backend
    const payload = {
      nombre: usuario.nombre,
      email: usuario.email,
      clave: usuario.clave1 ? usuario.clave1 : usuario.clave, // conserva la anterior
      region: usuario.region,
      comuna: usuario.comuna,
      estado: usuario.estado,
      rol: usuario.rol,
      categoria: usuario.categoria,
      fecha: usuario.fecha,
    };

    try {
      await editarUsuario(usuario.id, payload);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      setMensaje("✅ Cambios guardados exitosamente");

      setTimeout(() => navigate("/usuariosRegistrados"), 1000);
    } catch (err) {
      setMensaje("❌ Error al actualizar usuario.");
    }
  };

  const resetFormulario = () => {
    const original = obtenerUsuario(usuario.id);
    if (original) {
      setUsuario({ ...original, clave1: "", clave2: "" });
      cambiarComunas(original.region);
      setMensaje("Campos restaurados.");
    }
  };

  const badgeClass = {
    Activo: "bg-success",
    Pendiente: "bg-warning text-dark",
    Suspendido: "bg-danger",
  }[usuario.estado] || "bg-secondary";

  return (
    <div className="editar-usuario-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand" href="/usuariosRegistrados">
            ← Volver
          </a>
          <span className="navbar-text">Editar Usuario</span>
        </div>
      </nav>

      <main>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card shadow">
                <div className="card-header bg-primary text-white">
                  <h2 className="card-title mb-0">Editar Usuario</h2>
                </div>

                <div className="card-body">
                  {mensaje && (
                    <div className={`alert ${mensaje.includes("✅") ? "alert-success" : "alert-warning"}`}>
                      {mensaje}
                    </div>
                  )}

                  <form>
                    <h5 className="text-muted border-bottom pb-2 mb-3 mt-3">
                      Información Personal
                    </h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Nombre *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={usuario.nombre}
                          onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          value={usuario.email}
                          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      Estado:
                      <span className={`badge ${badgeClass} ms-2`}>{usuario.estado}</span>
                    </div>

                    <h5 className="text-muted border-bottom pb-2 mb-3 mt-4">
                      Cambiar Contraseña (opcional)
                    </h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Nueva contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          value={usuario.clave1}
                          onChange={(e) => setUsuario({ ...usuario, clave1: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Confirmar contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          value={usuario.clave2}
                          onChange={(e) => setUsuario({ ...usuario, clave2: e.target.value })}
                        />
                      </div>
                    </div>

                    <h5 className="text-muted border-bottom pb-2 mb-3 mt-4">
                      Ubicación
                    </h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Región</label>
                        <select
                          className="form-select"
                          value={usuario.region}
                          onChange={(e) => {
                            setUsuario({ ...usuario, region: e.target.value, comuna: "" });
                            cambiarComunas(e.target.value);
                          }}
                        >
                          <option value="">Seleccione</option>
                          <option value="rm">Región Metropolitana</option>
                          <option value="v">Valparaíso</option>
                          <option value="biobio">Biobío</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>Comuna</label>
                        <select
                          className="form-select"
                          value={usuario.comuna}
                          onChange={(e) => setUsuario({ ...usuario, comuna: e.target.value })}
                        >
                          <option value="">Seleccione</option>
                          {comunas.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <a href="/usuariosRegistrados" className="btn btn-secondary">Cancelar</a>

                      <div>
                        <button type="button" className="btn btn-outline-primary me-2" onClick={resetFormulario}>
                          Restaurar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={guardarCambios}>
                          Guardar Cambios
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {showToast && (
            <div className="toast-noti toast-exito">
              Cambios guardados correctamente
            </div>
          )}
        </div>
      </main>

      <footer className="text-center text-muted mt-5 py-3">
        <small>© 2025 Pastelería Mil Sabores - Sistema de Administración</small>
      </footer>
    </div>
  );
}