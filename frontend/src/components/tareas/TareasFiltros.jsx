// src/components/tareas/TareasFiltros.jsx

/**
 * @param {{
 *   filtroEstado: "pendientes" | "completadas" | "todas",
 *   setFiltroEstado: (v: "pendientes" | "completadas" | "todas") => void,
 *   filtroFecha: "todas" | "hoy" | "vencidas" | "proximas",
 *   setFiltroFecha: (v: "todas" | "hoy" | "vencidas" | "proximas") => void,
 *   filtroPrioridad: "todas" | "baja" | "media" | "alta",
 *   setFiltroPrioridad: (v: "todas" | "baja" | "media" | "alta") => void,
 * }} props
 */
export default function TareasFiltros({
  filtroEstado,
  setFiltroEstado,
  filtroFecha,
  setFiltroFecha,
  filtroPrioridad,
  setFiltroPrioridad,
}) {
  return (
    <div className="row mb-3 g-2">
      <div className="col-md-4">
        <label className="form-label">Estado</label>
        <select
          className="form-select"
          value={filtroEstado}
          onChange={(e) =>
            setFiltroEstado(e.target.value)
          }
        >
          <option value="pendientes">Pendientes</option>
          <option value="completadas">Completadas</option>
          <option value="todas">Todas</option>
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Fecha</label>
        <select
          className="form-select"
          value={filtroFecha}
          onChange={(e) =>
            setFiltroFecha(e.target.value)
          }
        >
          <option value="todas">Todas</option>
          <option value="hoy">Solo hoy</option>
          <option value="vencidas">Vencidas</option>
          <option value="proximas">Próximos 3 días</option>
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Prioridad</label>
        <select
          className="form-select"
          value={filtroPrioridad}
          onChange={(e) =>
            setFiltroPrioridad(e.target.value)
          }
        >
          <option value="todas">Todas</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>
    </div>
  );
}
