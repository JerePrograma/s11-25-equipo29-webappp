// src/pages/Leads.jsx
import React, { useState, useMemo } from "react";
import { useLeads } from "../context/leadcontext.jsx";
import { Link } from "react-router-dom";

function Leads() {
  const { leads } = useLeads();

  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  // Estados reales del funnel
  const estadosPosibles = [
    "Nuevo lead",
    "Contacto inicial",
    "En seguimiento",
  ];

  // Mapeo unificado igual al de Contactos
  const estadoBadgeMap = {
    "Nuevo lead": "badge bg-info",                   // celeste
    "Contacto inicial": "badge bg-success",          // verde
    "En seguimiento": "badge bg-warning text-dark",  // amarillo

    "Lead activo": "badge bg-success",               // verde
    "Cliente": "badge bg-dark",                      // negro
  };

  // Filtro de leads
  const leadsFiltrados = useMemo(() => {
    if (!leads) return [];

    return leads
      .filter((lead) =>
        lead.nombre?.toLowerCase().includes(busqueda.toLowerCase())
      )
      .filter((lead) =>
        estadoFiltro === "Todos" ? true : lead.estado === estadoFiltro
      );
  }, [leads, busqueda, estadoFiltro]);

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h3 fw-bold mb-1">Leads</h1>
          <p className="text-muted">
            Vista del funnel de leads según su etapa y canal.
          </p>
        </div>

        <Link to="/contactos" className="btn btn-outline-dark">
          Gestionar contactos
        </Link>
      </header>

      {/* Filtros */}
      <section className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label small">Buscar por nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: María..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label small">Filtrar por estado</label>
          <select
            className="form-select"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            {estadosPosibles.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Tabla */}
      <section className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Funnel de leads</h5>
            <span className="badge bg-dark">Total: {leadsFiltrados.length}</span>
          </div>

          {leadsFiltrados.length === 0 ? (
            <p className="text-muted">No hay leads con ese filtro.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Canal</th>
                    <th>Estado</th>
                    <th>Tipo</th>
                    <th>Último contacto</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsFiltrados.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.nombre}</td>
                      <td>{lead.canal}</td>

                      <td>
                        <span
                          className={
                            estadoBadgeMap[lead.estado] ||
                            "badge bg-secondary"
                          }
                        >
                          {lead.estado}
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-dark">
                          {lead.tipoContacto || "Lead"}
                        </span>
                      </td>

                      <td className="small text-muted">
                        {lead.ultima || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-3 text-muted small">
            Para editar leads usá <strong>Contactos</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Leads;
