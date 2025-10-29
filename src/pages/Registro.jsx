import { useState, useEffect } from "react";
import { useUsuarios } from "../context/UsuariosContext.jsx"; // el import de los usuarios context (para acceder a ellos)
import { useNavigate } from "react-router-dom"; // para no tener qu recargar
import "../utils/Registro.logic.js";
import "../styles/mensaje.css";
import "../styles/style.css";

export default function Registro() {
  const { usuarios, agregarUsuario } = useUsuarios(); // aquí usamos la funcion del contexto
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    clave1: "",
    clave2: "",
    region: "",
    comuna: ""
  });
  const [msg, setMsg] = useState("");
  const [comunas, setComunas] = useState([]);
  const [showToast, setShowToast] = useState(false); // mensaje toast
  // Objeto de regiones y comunas
  const comunasPorRegion = {
    Arica: ["Arica", "Camarones", "Putre", "General Lagos"],
    Tarapaca: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    Antofagasta: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    Atacama: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    Coquimbo: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    Valparaiso: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    Metropolitana: ["Santiago", "Puente Alto", "Maipú", "Las Condes", "La Florida", "Vitacura", "Ñuñoa", "Recoleta", "Providencia", "La Cisterna", "Pudahuel", "San Bernardo", "Renca", "La Granja", "Cerro Navia", "Estación Central", "Lo Prado", "Macul", "Peñalolén", "San Miguel", "Pedro Aguirre Cerda", "La Pintana", "Quilicura", "Lo Espejo", "El Bosque", "Huechuraba", "Lo Barnechea", "San Joaquín", "Maipú", "La Reina", "Ñuñoa", "Vitacura"],
    Libertador: ["Rancagua", "San Fernando", "Rengo", "Pichidegua", "Peumo", "Las Cabras", "Mostazal", "Codegua", "Requínoa", "Coltauco", "Graneros", "Machalí", "Olivar", "Pichidegua", "Peumo", "Las Cabras", "Mostazal", "Codegua", "Requínoa", "Coltauco", "Graneros", "Machalí", "Olivar"],
    Maule: ["Talca", "Curicó", "Linares", "San Javier", "Parral", "Retiro", "Villa Alegre", "San Clemente", "Yerbas Buenas", "Colbún", "Longaví", "Cauquenes", "Pelluhue", "Chanco", "Constitución", "Empedrado", "Maule", "San Rafael", "Río Claro", "San Clemente", "San Javier", "Colbún", "Longaví", "Parral", "Retiro", "Villa Alegre", "Yerbas Buenas", "Colbún", "Longaví", "Parral", "Retiro", "Villa Alegre", "Yerbas Buenas"],
    Ñuble: ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco"],
    BioBio: ["Concepción", "Talcahuano", "Penco", "Tomé", "Florida", "Hualpén", "Hualqui", "Santa Juana", "Lota", "Coronel", "San Pedro de la Paz", "Chiguayante", "Los Ángeles", "Cabrero", "Mulchén", "Nacimiento", "Laja", "San Rosendo", "Yumbel", "Alto Biobío", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "San Rosendo", "Yumbel", "Alto Biobío", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "San Rosendo", "Yumbel"],
    Araucania: ["Temuco", "Villarrica", "Angol",
      "Victoria", "Traiguén", "Curacautín",
      "Lonquimay", "Carahue", "Saavedra",
      "Pitrufquén", "Freire", "Gorbea",
      "Loncoche", "Pucón", "Vilcún",
      "Perquenco", "Melipeuco", "Cholchol",
      "Toltén", "Teodoro Schmidt", "Nueva Imperial",
      "Lautaro", "Cunco", "Padre Las Casas",
      "Galvarino", "Collipulli", "Ercilla",
      "Lonquimay", "Los Sauces", "Lumaco",
      "Purén", "Reinaco"],
    Rios: ["Valdivia", "La Unión", "Panguipulli", "Futrono", "Río Bueno",
      "Lago Ranco", "Corral", "Paillaco", "Máfil", "Lanco", "Mariquina", "Los Lagos"],
    Lagos: ["Puerto Montt", "Osorno", "Ancud", "Calbuco",
      "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez",
      "Dalcahue", "Frutillar", "Fresia", "Futaleufú", "Hualaihué",
      "Llanquihue", "Los Muermos", "Maullín", "Palena", "Puerto Octay",
      "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén",
      "Quemchi", "Quellón", "Quinchao", "Río Negro", "San Juan de la Costa",
      "San Pablo"],
    Aysen: ["Coyhaique", "Aysén", "Cisnes", "Guaitecas", "Lago Verde",
      "Coyhaique", "Río Ibáñez", "Chile Chico", "Cochrane", "O'Higgins", "Tortel"],
    Magallanes: ["Punta Arenas", "Puerto Natales", "Río Verde", "San Gregorio",
      "Laguna Blanca", "Porvenir", "Primavera", "Timaukel", "Natales",
      "Cabo de Hornos", "Antártica"]
    // puedes agregar las demás regiones...
  };

  // Actualiza el listado de comunas cuando cambia la región
  useEffect(() => {
    const lista = window.RegistroLogic.computeComunas(form.region, comunasPorRegion);
    setComunas(lista);
  }, [form.region]);

  // Control de cambios en los inputs
  const onChange = (e) => {
    const next = window.RegistroLogic.changeHandler(form, e.target.name, e.target.value);
    setForm(next);
  };

  // Validación y guardado en localStorage
  const onSubmit = (e) => {
    e.preventDefault();
    const estados = ["Completado", "Pendiente", "Cancelado"];
    const res = window.RegistroLogic.submitRegistro(
      form,
      usuarios,
      comunasPorRegion,
      estados
    );

    // Mostrar mensaje HTML ya formateado (opcional)
    setMsg(<div dangerouslySetInnerHTML={{ __html: res.messageHtml }} />);

    if (!res.ok) return; // errores o duplicado: no continuar

    // Éxito: persistir mediante el contexto y efectos visuales
    agregarUsuario(res.nuevoUsuario);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setTimeout(() => navigate(res.navigateTo), 1200);
  };


  return (
    <main className="registro-wrapper">
      <div className="container">
        <h1 className="page-title">Crear cuenta</h1>

        <form id="nuevoUsuario" onSubmit={onSubmit} noValidate>
          {msg && <div id="mensajes">{msg}</div>}

          <div className="form-grid">
            <div className="field">
              <label htmlFor="nombre">Nombre completo</label>
              <input id="nombre" name="nombre" type="text" onChange={onChange} value={form.nombre} />
            </div>

            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" name="email" type="email" onChange={onChange} value={form.email} />
            </div>

            <div className="field">
              <label htmlFor="clave1">Contraseña</label>
              <input id="clave1" name="clave1" type="password" onChange={onChange} value={form.clave1} />
            </div>

            <div className="field">
              <label htmlFor="clave2">Confirmar contraseña</label>
              <input id="clave2" name="clave2" type="password" onChange={onChange} value={form.clave2} />
            </div>

            <div className="field">
              <label htmlFor="region">Región</label>
              <select id="region" name="region" onChange={onChange} value={form.region}>
                <option value="">Seleccione una región</option>
                {Object.keys(comunasPorRegion).map((key) => (
                  <option key={key} value={key}>{key.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="comuna">Comuna</label>
              <select id="comuna" name="comuna" onChange={onChange} value={form.comuna}>
                <option value="">Seleccione una comuna</option>
                {comunas.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="actions">
            <button className="btn-primary" type="submit">Registrar</button>
          </div>
        </form>
        {showToast && (
          <div className="toast-noti toast-exito">
            Usuario registrado correctamente
          </div>
        )}
      </div>
    </main>
  );
}
