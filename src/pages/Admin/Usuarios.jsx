
import { useMemo, useState } from "react";
import "../../styles/global.css";

const ESTADOS = ["Activo", "Pendiente", "Suspendido"];

const MOCK = [
  { fecha: "2025-12-24", id:"USR1023", nombre:"Goliat Espinoza", email:"goliat.espinoza@mail.com", estado:"Suspendido", monto:20000 },
  { fecha: "2025-12-12", id:"USR1011", nombre:"Constanza Pino", email:"constanza.pino@mail.com", estado:"Suspendido", monto:15000 },
  { fecha: "2025-11-23", id:"USR1022", nombre:"Evelin calderon", email:"evelin.calderon@mail.com", estado:"Pendiente",  monto:18000 },
  { fecha: "2025-11-11", id:"USR1010", nombre:"Daniela Oliveros", email:"daniela.olivero@mail.com",  estado:"Pendiente",  monto:12000 },
  { fecha: "2025-10-22", id:"USR1021", nombre:"Steven Espinoza", email:"steven.espinoza@mail.com", estado:"Activo",     monto:15000 },
  { fecha: "2025-10-10", id:"USR1009", nombre:"Ariel Vega",       email:"ariel.vega@mail.com",       estado:"Activo",     monto:25000 },
  { fecha: "2025-09-21", id:"USR1020", nombre:"Daniela Olivero",  email:"daniela.olivero@mail.com",  estado:"Suspendido", monto:12000 },
];

export default function UsuariosAdmin() {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);

  const data = useMemo(() => {
    let rows = [...MOCK];
    if (estado !== "Todos") rows = rows.filter(r => r.estado === estado);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(r =>
        r.nombre.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [estado, query]);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const pageData = data.slice((page-1)*pageSize, page*pageSize);

  const Badge = ({value}) => (
    <span className={`badge ${value.toLowerCase()}`}>{value}</span>
  );

  return (
    <div className="admin-wrap">
      <aside className="sidebar">
        <h2>🧁 Compañía</h2>
        <ul>
          <li><a href="/admin">📊 Panel de control</a></li>
          <li className="active">👥 Usuarios</li>
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Usuarios</h1>
          <div className="toolbar">
            <select value={estado} onChange={e=>{setEstado(e.target.value); setPage(1);}}>
              <option>Todos</option>
              {ESTADOS.map(e => <option key={e}>{e}</option>)}
            </select>

            <select value={pageSize} onChange={e=>{setPageSize(+e.target.value); setPage(1);}}>
              {[10,15,25,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <div className="search">
              <span>🔍</span>
              <input placeholder="Buscar usuario, email..." value={query} onChange={e=>{setQuery(e.target.value); setPage(1);}} />
            </div>

            <button className="btn primary">👤 Nuevo usuario</button>
          </div>
        </header>

        <section className="panel">
          <table className="users-table">
            <thead>
              <tr>
                <th>Fecha</th><th>ID</th><th>Nombre</th><th>Email</th><th>Estado</th><th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map(r => (
                <tr key={r.id}>
                  <td>{r.fecha}</td>
                  <td>{r.id}</td>
                  <td>{r.nombre}</td>
                  <td className="mono">{r.email}</td>
                  <td><Badge value={r.estado} /></td>
                  <td>${r.monto.toLocaleString("es-CL")}</td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr><td colSpan={6} className="empty">Sin resultados</td></tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>«</button>
            <span className="current">{page}</span>
            <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>»</button>
          </div>
        </section>
      </main>
    </div>
  );
}
