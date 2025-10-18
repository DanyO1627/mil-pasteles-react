import { useState, useEffect } from "react";
import "../styles/style.css";

export default function Registro() {
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
    if (form.region && comunasPorRegion[form.region]) {
      setComunas(comunasPorRegion[form.region]);
    } else {
      setComunas([]);
    }
  }, [form.region]);

  // Control de cambios en los inputs
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Validación y guardado en localStorage
  const onSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, clave1, clave2, region, comuna } = form;
    const errores = [];

    // Validar nombre
    if (nombre.trim() === "") errores.push("El nombre no puede estar vacío.");

    // Validar correo
    if (!email.includes("@")) errores.push("El correo electrónico no es válido.");

    // Validar contraseña
    if (clave1.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");

    // Confirmar contraseña
    if (clave1 !== clave2) errores.push("Las contraseñas no coinciden.");

    // Validar región y comuna
    if (!region) errores.push("Debes seleccionar una región.");
    if (!comuna) errores.push("Debes seleccionar una comuna.");

    if (errores.length > 0) {
      setMsg(<div className="alert alert-danger"><ul>{errores.map((err, i) => <li key={i}>{err}</li>)}</ul></div>);
      return;
    }

    // Generar estado aleatorio
    const estados = ["Completado", "Pendiente", "Cancelado"];
    const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];

    // Crear nuevo usuario
    const nuevoUsuario = {
      fecha: new Date().toISOString().slice(0, 10),
      id: "USR" + Date.now(),
      nombre,
      email,
      region,
      comuna,
      estado: estadoAleatorio,
      monto: 0
    };

    // Obtener lista y guardar
    const usuariosExtra = JSON.parse(localStorage.getItem("usuariosExtra") || "[]");
    usuariosExtra.push(nuevoUsuario);
    localStorage.setItem("usuariosExtra", JSON.stringify(usuariosExtra));

    // Mensaje de éxito
    setMsg(<div className="alert alert-success">✅ Registro exitoso</div>);

    // Redirección
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
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
      </div>
    </main>
  );
}
