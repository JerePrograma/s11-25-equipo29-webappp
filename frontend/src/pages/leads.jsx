// src/pages/Leads.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useConfig } from "../context/configcontext.jsx";

export default function Leads() {
  const { API_BASE_URL, etapas } = useConfig();

  const [leads, setLeads] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  // ---------------------------------------
  // FETCH REAL
  // ---------------------------------------
  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/leads`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setLeads(data);
      } catch {
        console.warn("⚠ No hay backend → leads vacíos");
        setLeads([]);
      }
    }
    cargar();
  }, [API_BASE_URL]);

  // ---------------------------------------
  // BADGES SEGÚN ETAPA
  // ---------------------------------------
  const badgeEtapa = {
    "Nuevo lead": "primary",
    "Contacto inicial": "info",
    "En seguimiento": "warning text-dark",
    "Respuesta pendiente": "danger",
    "Cliente": "success",
  };

  // ---------------------------------------
  // FILTRO DE LEADS
  // ---------------------------------------
  const leadsFiltrados = useMemo(() => {
    return leads
      .filter((lead) =>
        lead.nombre?.toLowerCase().includes(busqueda.toLowerCase())
      )
      .filter((lead) =>
        estadoFiltro === "Todos" ? true : lead.etapa === estadoFiltro
      );
  }, [leads, busqueda, estadoFiltro]);

  return (
    <div className="container-fluid">

      {/* HEADER */}
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

      {/* FILTROS */}
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
          <label className="form-label small">Filtrar por etapa</label>
          <select
            className="form-select"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="Todos">Todas</option>
            {etapas.map((et) => (
              <option key={et} value={et}>
                {et}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* TABLA */}
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
                    <th>Etapa</th>
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
                        <span className={`badge bg-${badgeEtapa[lead.etapa] || "secondary"}`}>
                          {lead.etapa}
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
