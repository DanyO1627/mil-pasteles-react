import { useEffect, useState } from "react";
import { getBoletas, eliminarBoleta } from "../../services/boletaService";
import "../../styles/stylesAdmin/historialCompra.css";

export default function HistorialCompras() {
    const [boletas, setBoletas] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    // Cargar boletas desde el backend
    // estamos "blindando" porque no funcionaaa
    useEffect(() => {
        const cargar = async () => {
            const data = await getBoletas();
            console.log("BOLETAS RECIBIDAS POR EL FRONT:", data);
            setBoletas(Array.isArray(data) ? data : []);
        };

        cargar();
    }, []);

    // Buscador
    // Blindar por si boletas NO es array
    const boletasSeguras = Array.isArray(boletas) ? boletas : [];

    // Buscador 
    const boletasFiltradas = boletasSeguras.filter((b) => {
        const query = busqueda.toLowerCase();
        return (
            b.id.toString().includes(query) ||
            (b.usuario?.nombre || "").toLowerCase().includes(query)
        );
    });

    const handleLimpiar = async () => {
        if (!window.confirm("¿Borrar TODO el historial de boletas?")) return;

        try {
            // eliminar UNA POR UNA
            for (const b of boletas) {
                await eliminarBoleta(b.id);
            }
            setBoletas([]);
            alert("Historial eliminado.");
        } catch (err) {
            console.error("❌ Error al borrar:", err);
        }
    };

    return (
        <div className="historial-wrapper">
            <h2 className="titulo">🧾 Historial de Boletas</h2>

            {/* Buscador */}
            <div className="buscador">
                <input
                    type="text"
                    placeholder="Buscar por ID o nombre de cliente..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                {boletas.length > 0 && (
                    <button className="btn-limpiar" onClick={handleLimpiar}>
                        🗑 Limpiar historial
                    </button>
                )}
            </div>

            {/* Lista de boletas */}
            <div className="boletas-lista">
                {boletasFiltradas.length === 0 ? (
                    <p className="no-data">No hay boletas registradas.</p>
                ) : (
                    boletasFiltradas.map((b) => (
                        <div key={b.id} className="boleta-card">
                            <h3>Boleta #{b.id}</h3>
                            <p><strong>Fecha:</strong> {b.fecha}</p>
                            <p><strong>Total:</strong>
                                ${(b.totalFinal ?? 0).toLocaleString("es-CL")}
                            </p>

                            {/* Cliente */}
                            {b.usuario ? (
                                <p><strong>Cliente:</strong> {b.usuario.nombre} ({b.usuario.email})</p>
                            ) : (
                                <p><strong>Cliente:</strong> Invitado</p>
                            )}

                            {/* Dirección */}
                            <p>
                                <strong>Dirección:</strong> {b.calle}, {b.comuna}, {b.region}
                            </p>

                            {/* Productos */}
                            <div className="productos">
                                {(b.carrito || []).map((item, i) => (
                                    <div key={i} className="item">
                                        {item.nombreProducto} x{item.cantidad}
                                        <strong>${(item.totalLinea ?? 0).toLocaleString("es-CL")}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
