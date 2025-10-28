import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import "../styles/base.css";
import "../styles/compra.css";

export default function Compra() {
  const { carrito, precioTotal, vaciarCarrito, procesarCompra } = useCarrito();
  const navigate = useNavigate();
  
  // Objeto de regiones y comunas de Chile
  const comunasPorRegion = {
    Arica: ["Arica", "Camarones", "Putre", "General Lagos"],
    Tarapaca: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    Antofagasta: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    Atacama: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    Coquimbo: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    Valparaiso: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    Metropolitana: ["Santiago", "Puente Alto", "Maipú", "Las Condes", "La Florida", "Vitacura", "Ñuñoa", "Recoleta", "Providencia", "La Cisterna", "Pudahuel", "San Bernardo", "Renca", "La Granja", "Cerro Navia", "Estación Central", "Lo Prado", "Macul", "Peñalolén", "San Miguel", "Pedro Aguirre Cerda", "La Pintana", "Quilicura", "Lo Espejo", "El Bosque", "Huechuraba", "Lo Barnechea", "San Joaquín", "La Reina", "Cerrillos", "Conchalí", "Independencia", "Quinta Normal", "San Ramón"],
    Libertador: ["Rancagua", "San Fernando", "Rengo", "Pichidegua", "Peumo", "Las Cabras", "Mostazal", "Codegua", "Requínoa", "Coltauco", "Graneros", "Machalí", "Olivar"],
    Maule: ["Talca", "Curicó", "Linares", "San Javier", "Parral", "Retiro", "Villa Alegre", "San Clemente", "Yerbas Buenas", "Colbún", "Longaví", "Cauquenes", "Pelluhue", "Chanco", "Constitución", "Empedrado", "Maule", "San Rafael", "Río Claro"],
    Ñuble: ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco"],
    BioBio: ["Concepción", "Talcahuano", "Penco", "Tomé", "Florida", "Hualpén", "Hualqui", "Santa Juana", "Lota", "Coronel", "San Pedro de la Paz", "Chiguayante", "Los Ángeles", "Cabrero", "Mulchén", "Nacimiento", "Laja", "San Rosendo", "Yumbel", "Alto Biobío", "Negrete"],
    Araucania: ["Temuco", "Villarrica", "Angol", "Victoria", "Traiguén", "Curacautín", "Lonquimay", "Carahue", "Saavedra", "Pitrufquén", "Freire", "Gorbea", "Loncoche", "Pucón", "Vilcún", "Perquenco", "Melipeuco", "Cholchol", "Toltén", "Teodoro Schmidt", "Nueva Imperial", "Lautaro", "Cunco", "Padre Las Casas", "Galvarino", "Collipulli", "Ercilla", "Los Sauces", "Lumaco", "Purén", "Reinaco"],
    Rios: ["Valdivia", "La Unión", "Panguipulli", "Futrono", "Río Bueno", "Lago Ranco", "Corral", "Paillaco", "Máfil", "Lanco", "Mariquina", "Los Lagos"],
    Lagos: ["Puerto Montt", "Osorno", "Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Frutillar", "Fresia", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Palena", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quemchi", "Quellón", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"],
    Aysen: ["Coyhaique", "Aysén", "Cisnes", "Guaitecas", "Lago Verde", "Río Ibáñez", "Chile Chico", "Cochrane", "O'Higgins", "Tortel"],
    Magallanes: ["Punta Arenas", "Puerto Natales", "Río Verde", "San Gregorio", "Laguna Blanca", "Porvenir", "Primavera", "Timaukel", "Cabo de Hornos", "Antártica"]
  };

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    calle: "",
    departamento: "",
    region: "",
    comuna: "",
    indicaciones: ""
  });

  const [errors, setErrors] = useState({});
  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si es el campo de teléfono, solo permitir números
    if (name === "telefono") {
      const soloNumeros = value.replace(/\D/g, "");
      setFormData(prev => ({
        ...prev,
        [name]: soloNumeros
      }));
    } else if (name === "region") {
      // Cuando cambia la región, actualizar las comunas disponibles
      setFormData(prev => ({
        ...prev,
        region: value,
        comuna: "" // Reset comuna cuando cambia región
      }));
      setComunasDisponibles(comunasPorRegion[value] || []);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (formData.telefono.length < 9) {
      newErrors.telefono = "El teléfono debe tener al menos 9 dígitos";
    }
    
    if (!formData.calle.trim()) newErrors.calle = "La dirección es requerida";
    if (!formData.region) newErrors.region = "Selecciona una región";
    if (!formData.comuna) newErrors.comuna = "Selecciona una comuna";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      navigate("/productos");
      return;
    }

    if (validateForm()) {
      // NO procesar la compra aún, solo validar
      // const resultado = procesarCompra();
      
      // Calcular costo de envío
      const costoEnvio = 3000;
      
      // Guardar una copia del carrito antes de vaciar
      const carritoParaEnviar = [...carrito];
      
      // Redirigir a página de compra exitosa con todos los datos
      navigate("/compraExitosa", {
        state: {
          formData: formData,
          carrito: carritoParaEnviar,
          precioTotal: precioTotal,
          costoEnvio: costoEnvio
        }
      });
      
      // Procesar la compra y vaciar carrito después de navegar
      setTimeout(() => {
        procesarCompra();
        vaciarCarrito();
      }, 100);
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-vacio">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos antes de proceder al pago</p>
          <button className="btn-volver" onClick={() => navigate("/productos")}>
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-titulo">Carrito de compra</h1>
      <p className="checkout-subtitulo">Completa la siguiente información</p>

      <div className="checkout-contenido">
        {/* Formulario */}
        <div className="checkout-formulario">
          <form onSubmit={handleSubmit}>
            {/* Información del cliente */}
            <section className="form-seccion">
              <h3 className="form-seccion-titulo">Información del cliente</h3>
              <p className="form-seccion-subtitulo">Completa la siguiente información</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre*</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={errors.nombre ? "input-error" : ""}
                  />
                  {errors.nombre && <span className="error-text">{errors.nombre}</span>}
                </div>
                
                <div className="form-group">
                  <label>Apellido*</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className={errors.apellido ? "input-error" : ""}
                  />
                  {errors.apellido && <span className="error-text">{errors.apellido}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Correo*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label>Teléfono* (solo números)</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="912345678"
                    maxLength="11"
                    className={errors.telefono ? "input-error" : ""}
                  />
                  {errors.telefono && <span className="error-text">{errors.telefono}</span>}
                </div>
              </div>
            </section>

            {/* Dirección de entrega */}
            <section className="form-seccion">
              <h3 className="form-seccion-titulo">Dirección de entrega de los productos</h3>
              <p className="form-seccion-subtitulo">Ingresa dirección de forma detallada</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Calle*</label>
                  <input
                    type="text"
                    name="calle"
                    value={formData.calle}
                    onChange={handleChange}
                    placeholder="Av. Libertador 123"
                    className={errors.calle ? "input-error" : ""}
                  />
                  {errors.calle && <span className="error-text">{errors.calle}</span>}
                </div>
                
                <div className="form-group">
                  <label>Departamento (opcional)</label>
                  <input
                    type="text"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    placeholder="Ej: 403"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Región*</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className={errors.region ? "input-error" : ""}
                  >
                    <option value="">Selecciona región</option>
                    {Object.keys(comunasPorRegion).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.region && <span className="error-text">{errors.region}</span>}
                </div>
                
                <div className="form-group">
                  <label>Comuna*</label>
                  <select
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    disabled={!formData.region}
                    className={errors.comuna ? "input-error" : ""}
                  >
                    <option value="">Selecciona comuna</option>
                    {comunasDisponibles.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </select>
                  {errors.comuna && <span className="error-text">{errors.comuna}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Indicaciones para la entrega (opcional)</label>
                <textarea
                  name="indicaciones"
                  value={formData.indicaciones}
                  onChange={handleChange}
                  placeholder="Ej: Entre calles, color del edificio, no tiene timbre..."
                  rows="3"
                />
              </div>
            </section>

            <button type="submit" className="btn-pagar">
              Pagar ahora ${precioTotal.toLocaleString()}
            </button>
          </form>
        </div>

        {/* Resumen del pedido */}
        <div className="checkout-resumen">
          <div className="resumen-card">
            <div className="resumen-header">
              <h3>Total a pagar:</h3>
              <h2 className="resumen-total">${precioTotal.toLocaleString()}</h2>
            </div>

            <div className="resumen-tabla">
              <div className="tabla-header">
                <span>Imagen</span>
                <span>Nombre</span>
                <span>Precio</span>
                <span>Cant.</span>
                <span>Subtotal</span>
              </div>

              <div className="tabla-items">
                {carrito.map((item) => (
                  <div key={item.id} className="tabla-item">
                    <img src={item.imagen} alt={item.nombre} />
                    <span className="item-nombre-tabla">{item.nombre}</span>
                    <span>${item.precio.toLocaleString()}</span>
                    <span>{item.cantidad}</span>
                    <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}