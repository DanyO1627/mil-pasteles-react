import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

export default function EditarUsuario() {
  const [usuario, setUsuario] = useState({
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

  const [mensaje, setMensaje] = useState("");
  const [comunas, setComunas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // Cargar datos del usuario a editar desde localStorage
  useEffect(() => {
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(listaUsuarios);

   
    const params = new URLSearchParams(window.location.search);
    const index = params.get("index");

    if (index !== null && listaUsuarios[index]) {
      setUsuario({ ...listaUsuarios[index], index: Number(index) });
      cambiarComunas(listaUsuarios[index].region);
    }
  }, []);

 
  const cambiarComunas = (region) => {
    const regiones = {
      rm: ["Santiago", "Puente Alto", "Maipú", "La Florida"],
      v: ["Valparaíso", "Viña del Mar", "Quilpué"],
      biobio: ["Concepción", "Talcahuano", "Los Ángeles"],
    };
    setComunas(regiones[region] || []);
  };

 
  const badgeClass = {
    Activo: "bg-success",
    Pendiente: "bg-warning text-dark",
    Suspendido: "bg-danger",
  }[usuario.estado] || "bg-secondary";

  //  Guardar cambios del usuario en localStorage
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

    const actualizados = [...usuarios];
    const idx = usuario.index;

    if (idx !== null && idx >= 0) {
      actualizados[idx] = {
        ...usuario,
        clave1: usuario.clave1 || usuarios[idx].clave1, 
        clave2: usuario.clave2 || usuarios[idx].clave2,
      };

      localStorage.setItem("usuarios", JSON.stringify(actualizados));
      setUsuarios(actualizados);
      setMensaje(" Cambios guardados correctamente.");

      //  Redirigir después de guardar
      setTimeout(() => {
        navigate("/usuariosRegistrados");
      }, 1000);
    } else {
      setMensaje(" No se pudo identificar el usuario a actualizar.");
    }
  };

  // Restaurar los datos originales
  const resetFormulario = () => {
    const lista = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = lista[usuario.index];
    if (user) {
      setUsuario({ ...user, index: usuario.index });
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
      </main>

      <footer className="text-center text-muted mt-5 py-3">
        <small>© 2025 Pastelería Mil Sabores - Sistema de Administración</small>
      </footer>
    </div>
  );
}