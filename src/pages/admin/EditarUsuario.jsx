import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import "../../styles/stylesAdmin/editarUsuario.css";

export default function EditarUsuario() {
  const { usuarios, editarUsuario, obtenerUsuario } = useUsuarios();
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
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

  // === Listado de regiones y comunas ===
  const comunasPorRegion = {
    Arica: ["Arica", "Camarones", "Putre", "General Lagos"],
    Tarapaca: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    Antofagasta: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    Atacama: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    Coquimbo: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    Valparaiso: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    Metropolitana: ["Santiago", "Puente Alto", "Maipú", "Las Condes", "La Florida", "Vitacura", "Ñuñoa", "Recoleta", "Providencia", "Pudahuel", "San Bernardo", "Renca", "Cerro Navia", "Estación Central", "Peñalolén", "Quilicura", "La Reina", "Macul", "San Joaquín", "Lo Prado"],
    Libertador: ["Rancagua", "San Fernando", "Rengo", "Pichidegua", "Peumo", "Las Cabras", "Mostazal", "Codegua", "Requínoa", "Coltauco", "Graneros", "Machalí", "Olivar"],
    Maule: ["Talca", "Curicó", "Linares", "San Javier", "Parral", "Retiro", "Villa Alegre", "San Clemente", "Yerbas Buenas", "Colbún", "Longaví", "Cauquenes", "Pelluhue", "Chanco", "Constitución", "Empedrado", "Maule", "San Rafael", "Río Claro"],
    Ñuble: ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco"],
    BioBio: ["Concepción", "Talcahuano", "Penco", "Tomé", "Florida", "Hualpén", "Hualqui", "Santa Juana", "Lota", "Coronel", "San Pedro de la Paz", "Chiguayante", "Los Ángeles", "Cabrero", "Mulchén", "Nacimiento", "Laja", "San Rosendo", "Yumbel", "Negrete", "Alto Biobío"],
    Araucania: ["Temuco", "Villarrica", "Angol", "Victoria", "Traiguén", "Curacautín", "Lonquimay", "Carahue", "Saavedra", "Pitrufquén", "Freire", "Gorbea", "Loncoche", "Pucón", "Vilcún", "Perquenco", "Melipeuco", "Cholchol", "Toltén", "Teodoro Schmidt", "Nueva Imperial", "Lautaro", "Cunco", "Padre Las Casas", "Galvarino", "Collipulli", "Ercilla", "Los Sauces", "Lumaco", "Purén", "Renaico"],
    Rios: ["Valdivia", "La Unión", "Panguipulli", "Futrono", "Río Bueno", "Lago Ranco", "Corral", "Paillaco", "Máfil", "Lanco", "Mariquina", "Los Lagos"],
    Lagos: ["Puerto Montt", "Osorno", "Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Frutillar", "Fresia", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Palena", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quemchi", "Quellón", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"],
    Aysen: ["Coyhaique", "Aysén", "Cisnes", "Guaitecas", "Lago Verde", "Río Ibáñez", "Chile Chico", "Cochrane", "O'Higgins", "Tortel"],
    Magallanes: ["Punta Arenas", "Puerto Natales", "Río Verde", "San Gregorio", "Laguna Blanca", "Porvenir", "Primavera", "Timaukel", "Cabo de Hornos", "Antártica"],
  };

  // Cargar usuario existente
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      const user = obtenerUsuario(id);
      if (user) {
        setUsuario({ ...user });
        if (user.region && comunasPorRegion[user.region]) {
          setComunas(comunasPorRegion[user.region]);
        }
      }
    }
  }, [usuarios, location.search]);

  // Actualizar comunas según región
  useEffect(() => {
    if (usuario.region && comunasPorRegion[usuario.region]) {
      setComunas(comunasPorRegion[usuario.region]);
    } else {
      setComunas([]);
    }
  }, [usuario.region]);

  const guardarCambios = () => {
    if (!usuario.nombre || !usuario.email) {
      setMensaje("⚠️ Por favor completa los campos obligatorios.");
      return;
    }
    if (usuario.clave1 && usuario.clave1.length < 6) {
      setMensaje("⚠️ La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (usuario.clave1 !== usuario.clave2) {
      setMensaje("⚠️ Las contraseñas no coinciden.");
      return;
    }

    editarUsuario(usuario.id, usuario);
    setMensaje("✅ Cambios guardados correctamente.");
    setShowToast(true);

    setTimeout(() => setShowToast(false), 2000);
    setTimeout(() => navigate("/usuariosRegistrados"), 1000);
  };

  const resetFormulario = () => {
    const user = obtenerUsuario(usuario.id);
    if (user) {
      setUsuario({ ...user });
      if (user.region && comunasPorRegion[user.region]) {
        setComunas(comunasPorRegion[user.region]);
      }
      setMensaje("Campos restaurados a su valor original.");
    }
  };

  const limpiarCampo = (campo) => {
    setUsuario({ ...usuario, [campo]: "" });
  };

  const badgeClass = {
    Activo: "badge-activo",
    Pendiente: "badge-pendiente",
    Suspendido: "badge-suspendido",
  }[usuario.estado] || "badge-activo";

  return (
    <div className="editar-usr-wrapper">
      <div className="editar-usr-container">
        <h2 className="editar-usr-titulo">✏️ Editar Usuario</h2>
        <p className="editar-usr-subtitulo">
          Modifica la información del usuario seleccionado
        </p>

        {mensaje && (
          <div
            className={`editar-usr-mensaje ${
              mensaje.includes("✅") ? "ok" : "warn"
            }`}
          >
            {mensaje}
          </div>
        )}

        <form className="editar-usr-form">
          {/* === Información Personal === */}
          <div className="editar-usr-section">
            <h3 className="editar-usr-section-titulo">Información Personal</h3>

            <div className="form-group">
              <label>Nombre completo *</label>
              <input
                type="text"
                value={usuario.nombre}
                onFocus={() => limpiarCampo("nombre")}
                onChange={(e) =>
                  setUsuario({ ...usuario, nombre: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Correo electrónico *</label>
              <input
                type="email"
                value={usuario.email}
                onFocus={() => limpiarCampo("email")}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Teléfono (opcional)</label>
              <input
                type="tel"
                value={usuario.telefono}
                onFocus={() => limpiarCampo("telefono")}
                onChange={(e) =>
                  setUsuario({ ...usuario, telefono: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Edad</label>
              <input
                type="number"
                min="1"
                max="120"
                value={usuario.edad}
                onFocus={() => limpiarCampo("edad")}
                onChange={(e) =>
                  setUsuario({ ...usuario, edad: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Estado actual</label>
              <div className={badgeClass}>{usuario.estado}</div>
            </div>
          </div>

          {/* === Contraseña === */}
          <div className="editar-usr-section">
            <h3 className="editar-usr-section-titulo">
              Cambiar Contraseña (opcional)
            </h3>

            <div className="form-group">
              <label>Nueva contraseña</label>
              <input
                type="password"
                value={usuario.clave1}
                onChange={(e) =>
                  setUsuario({ ...usuario, clave1: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                value={usuario.clave2}
                onChange={(e) =>
                  setUsuario({ ...usuario, clave2: e.target.value })
                }
              />
            </div>
          </div>

          {/* === Ubicación === */}
          <div className="editar-usr-section">
            <h3 className="editar-usr-section-titulo">Ubicación</h3>

            <div className="form-group">
              <label>Región</label>
              <select
                value={usuario.region}
                onChange={(e) =>
                  setUsuario({ ...usuario, region: e.target.value, comuna: "" })
                }
              >
                <option value="">Seleccione una región</option>
                {Object.keys(comunasPorRegion).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Comuna</label>
              <select
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

          {/* === Acciones === */}
          <div className="editar-usr-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate("/usuariosRegistrados")}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn-restaurar"
              onClick={resetFormulario}
            >
              Restaurar
            </button>
            <button
              type="button"
              className="btn-guardar"
              onClick={guardarCambios}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>

      {showToast && (
        <div className="toast-exito">Cambios guardados correctamente</div>
      )}
    </div>
  );
}
