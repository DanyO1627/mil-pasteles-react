import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import "../../styles/global.css";

export default function EditarUsuario() {
  
  const { usuarios, editarUsuario, obtenerUsuario } = useUsuarios(); // obtiene los usuarios y las funciones desde el contect
  const location = useLocation();
  const navigate = useNavigate();
 

  // estado local del usuario a editar
  const [usuario, setUsuario] = useState({
    id: "", // ahora el context funciona con ids
    nombre: "",
    email: "",
    telefono: "",
    region: "",
    comuna: "",
    estado: "Activo",
    clave1: "",
    clave2: "",
    index: null, 
  });

  const [showToast, setShowToast] = useState(false);
  const [comunas, setComunas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Cargar datos del usuario desde el localstorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      const user = obtenerUsuario(id);
      if (user) {
        setUsuario({ ...user });
        cambiarComunas(user.region);
      }
    }
  }, [usuarios, location.search]);

 
  // cambiar comunas desde la región
  const cambiarComunas = (region) => {
    const regiones = {
      rm: ["Santiago", "Puente Alto", "Maipú", "La Florida"],
      v: ["Valparaíso", "Viña del Mar", "Quilpué"],
      biobio: ["Concepción", "Talcahuano", "Los Ángeles"],
    };
    setComunas(regiones[region] || []);
  };

 // determinar el color del badge según el estado que se le haya asignado
  const badgeClass = {
    Activo: "bg-success",
    Pendiente: "bg-warning text-dark",
    Suspendido: "bg-danger",
  }[usuario.estado] || "bg-secondary";


// CAMBIO: ahora usa usuario.id en vez de un indice
  const guardarCambios = () => {
    if (!usuario.nombre || !usuario.email) {
      setMensaje("Por favor completa los campos obligatorios.");
      return;
    }
    if (usuario.clave1 && usuario.clave1.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (usuario.clave1 !== usuario.clave2) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    editarUsuario(usuario.id, usuario); // id
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setTimeout(() => navigate("/usuariosRegistrados"), 1000);
  };

  // y se restaura con el id
  const resetFormulario = () => {
    const user = obtenerUsuario(usuario.id);
    if (user) {
      setUsuario({ ...user });
      cambiarComunas(user.region);
      setMensaje("Campos restaurados a su valor original.");
    }
  };

  const limpiarCampo = (campo) => {
    setUsuario({ ...usuario, [campo]: "" });
  };





  return (
    <div className="editar-usuario-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand" href="/usuariosRegistrados">
            <i className="fas fa-arrow-left me-2"></i> Volver a Usuarios
          </a>
          <span className="navbar-text">
            <i className="fas fa-user-edit me-1"></i> Editando Usuario
          </span>
        </div>
      </nav>

      <main>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card shadow">
                <div className="card-header bg-primary text-white">
                  <h2 className="card-title mb-0">
                    <i className="fas fa-user-edit me-2"></i> Editar Usuario
                  </h2>
                </div>

                <div className="card-body">
                  {mensaje && (
                    <div
                      id="mensajes"
                      className={`alert ${
                        mensaje.includes("✅") ? "alert-success" : "alert-warning"
                      }`}
                    >
                      {mensaje}
                    </div>
                  )}

                  <form>
                    <h5 className="text-muted border-bottom pb-2 mb-3 mt-3">
                      <i className="fas fa-user me-2"></i> Información Personal
                    </h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-user me-1"></i> Nombre completo *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={usuario.nombre}
                          onFocus={() => limpiarCampo("nombre")}
                          onChange={(e) =>
                            setUsuario({ ...usuario, nombre: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-envelope me-1"></i> Correo
                          electrónico *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={usuario.email}
                          onFocus={() => limpiarCampo("email")}
                          onChange={(e) =>
                            setUsuario({ ...usuario, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-phone me-1"></i> Teléfono
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          value={usuario.telefono}
                          onFocus={() => limpiarCampo("telefono")}
                          onChange={(e) =>
                            setUsuario({
                              ...usuario,
                              telefono: e.target.value,
                            })
                          }
                        />
                        <small className="text-muted">Opcional</small>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-info-circle me-1"></i> Estado
                          actual
                        </label>
                        <div className="form-control-plaintext">
                          <span className={`badge ${badgeClass}`}>
                            {usuario.estado}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-muted border-bottom pb-2 mb-3 mt-4">
                      <i className="fas fa-key me-2"></i> Cambiar Contraseña{" "}
                      <small className="text-muted">(Opcional)</small>
                    </h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-lock me-1"></i> Nueva contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={usuario.clave1}
                          onChange={(e) =>
                            setUsuario({ ...usuario, clave1: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-lock me-1"></i> Confirmar
                          contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={usuario.clave2}
                          onChange={(e) =>
                            setUsuario({ ...usuario, clave2: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <h5 className="text-muted border-bottom pb-2 mb-3 mt-4">
                      <i className="fas fa-map-marker-alt me-2"></i> Ubicación
                    </h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-map me-1"></i> Región
                        </label>
                        <select
                          className="form-select"
                          value={usuario.region}
                          onChange={(e) => {
                            setUsuario({
                              ...usuario,
                              region: e.target.value,
                              comuna: "",
                            });
                            cambiarComunas(e.target.value);
                          }}
                        >
                          <option value="">Seleccione una región</option>
                          <option value="rm">Región Metropolitana</option>
                          <option value="v">Valparaíso</option>
                          <option value="biobio">Biobío</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-building me-1"></i> Comuna
                        </label>
                        <select
                          className="form-select"
                          value={usuario.comuna}
                          onChange={(e) =>
                            setUsuario({ ...usuario, comuna: e.target.value })
                          }
                        >
                          <option value="">Seleccione una comuna</option>
                          {comunas.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <a
                        href="/usuariosRegistrados"
                        className="btn btn-secondary"
                      >
                        <i className="fas fa-times me-1"></i> Cancelar
                      </a>
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-primary me-2"
                          onClick={resetFormulario}
                        >
                          <i className="fas fa-undo me-1"></i> Restaurar
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={guardarCambios}
                        >
                          <i className="fas fa-save me-1"></i> Guardar Cambios
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showToast && (
        <div className="toast-noti toast-exito">
        Cambios guardados correctamente
        </div>
        )}
      </main>

      <footer className="text-center text-muted mt-5 py-3">
        <small>© 2025 Pastelería Mil Sabores - Sistema de Administración</small>
      </footer>
    </div>

  );
}