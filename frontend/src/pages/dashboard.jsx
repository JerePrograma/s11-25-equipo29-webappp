// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLeads } from "../context/leadcontext.jsx";
import {
  esHoy,
  estaAtrasado,
  esEnProximosDias,
  parseFecha,
} from "../utils/seguimientohelpers.js";

function Dashboard() {
  const { leads } = useLeads();
  const listaLeads = leads ?? [];

  // 👉 Métricas principales
  const totalLeads = listaLeads.length;

  const clientesEnSeguimiento = listaLeads.filter(
    (lead) =>
      lead?.estado === "En seguimiento" ||
      lead?.estado === "Lead activo" ||
      lead?.estado === "Cliente"
  );

  const respuestasPendientes = listaLeads.filter(
    (lead) => lead?.estado === "Respuesta pendiente"
  );

  const leadsConvertidos = listaLeads.filter(
    (lead) => lead?.estado === "Cliente"
  );
  const tasaConversion =
    totalLeads > 0
      ? Math.round((leadsConvertidos.length / totalLeads) * 100)
      : 0;

  // 👉 Lógica de seguimiento por fechas
  const seguimientosConFecha = listaLeads.filter(
    (lead) => !!lead?.fechaProximaAccion
  );

  const seguimientosVencidos = seguimientosConFecha.filter((lead) =>
    estaAtrasado(lead.fechaProximaAccion)
  );

  const seguimientosHoy = seguimientosConFecha.filter((lead) =>
    esHoy(lead.fechaProximaAccion)
  );

  const seguimientosProximos = seguimientosConFecha.filter((lead) =>
    esEnProximosDias(lead.fechaProximaAccion, 7)
  );

  // 👉 Últimas interacciones
  const ultimasInteracciones = [...listaLeads]
    .filter((lead) => !!lead?.ultimaInteraccion)
    .sort((a, b) => {
      const fechaA = parseFecha(a.ultimaInteraccion)?.getTime() ?? 0;
      const fechaB = parseFecha(b.ultimaInteraccion)?.getTime() ?? 0;
      return fechaB - fechaA;
    })
    .slice(0, 5);

  // 👉 Helper badge
  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Lead activo":
        return "badge bg-success";
      case "En seguimiento":
        return "badge bg-warning text-dark";
      case "Respuesta pendiente":
        return "badge bg-danger";
      case "En frío":
        return "badge bg-secondary";
      case "Cliente":
        return "badge bg-primary";
      default:
        return "badge bg-light text-dark";
    }
  };

  // 👉 scroll suave
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="container-fluid" id="dashboard-top">
      {/* Título */}
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Dashboard</h1>
        <p className="text-muted mb-0">
          Vista general de tus leads, clientes y seguimientos pendientes.
        </p>

        {seguimientosVencidos.length > 0 || seguimientosHoy.length > 0 ? (
          <p className="mt-2 small">
            🔔 Tenés{" "}
            <strong>{seguimientosVencidos.length}</strong> seguimientos{" "}
            <span className="text-danger">vencidos</span> y{" "}
            <strong>{seguimientosHoy.length}</strong> para{" "}
            <span className="text-primary">hoy</span>.
          </p>
        ) : (
          <p className="mt-2 small text-success">
            ✅ No tenés seguimientos atrasados por ahora.
          </p>
        )}
      </header>

      {/* FILA 1 */}
      <section className="row g-3 mb-4">
        {/* Leads activos */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Leads activos
              </h6>
              <h3 className="fw-bold mb-1">{totalLeads}</h3>
              <p className="text-success small mb-1">
                Datos desde LeadContext
              </p>
              <Link to="/leads" className="small">
                Ver funnel completo →
              </Link>
            </div>
          </div>
        </div>

        {/* Clientes en seguimiento */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Clientes en seguimiento
              </h6>
              <h3 className="fw-bold mb-1">
                {clientesEnSeguimiento.length}
              </h3>
              <p className="text-primary small mb-0">
                Próximos contactos programados:{" "}
                <strong>{seguimientosConFecha.length}</strong>
              </p>

              {/* 🔽 Ir a seguimientos */}
              <p
                className="small text-primary mt-2"
                style={{ cursor: "pointer" }}
                onClick={() => scrollToSection("seguimientos-clientes")}
              >
                Ir a seguimientos →
              </p>
            </div>
          </div>
        </div>

        {/* Respuestas pendientes */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Respuestas pendientes
              </h6>
              <h3 className="fw-bold mb-1">
                {respuestasPendientes.length}
              </h3>
              <p className="text-danger small mb-0">
                ¡Revisar WhatsApp y email!
              </p>

              {/* 🔽 Ir a respuestas pendientes */}
              <p
                className="small text-primary mt-2"
                style={{ cursor: "pointer" }}
                onClick={() => scrollToSection("seguimientos-clientes")}
              >
                Ir a respuestas pendientes →
              </p>
            </div>
          </div>
        </div>

        {/* Tasa conversión */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Tasa de conversión
              </h6>
              <h3 className="fw-bold mb-1">{tasaConversion}%</h3>
              <p className="text-muted small mb-0">
                {leadsConvertidos.length} clientes sobre {totalLeads} leads
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILA 2 */}
      <section className="row g-3">
        {/* Últimas interacciones */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Últimas interacciones</h5>
              <p className="text-muted small">
                Resumen de los últimos contactos por WhatsApp y correo.
              </p>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Canal</th>
                      <th>Estado</th>
                      <th>Último contacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ultimasInteracciones.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-muted">
                          Todavía no hay interacciones registradas.
                        </td>
                      </tr>
                    ) : (
                      ultimasInteracciones.map((lead) => (
                        <tr key={lead.id}>
                          <td>{lead.nombre}</td>
                          <td>{lead.canal || "N/D"}</td>
                          <td>
                            <span className={getBadgeClass(lead.estado)}>
                              {lead.estado || "Sin estado"}
                            </span>
                          </td>
                          <td>
                            {lead.ultimaInteraccion
                              ? lead.ultimaInteraccion
                              : "Sin fecha"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* SEGUIMIENTOS */}
        <div className="col-12 col-lg-4" id="seguimientos-clientes">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              
              <h5 className="card-title mb-3">Seguimientos</h5>

              {/* 🔼 volver arriba */}
              <p
                className="small text-secondary mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => scrollToSection("dashboard-top")}
              >
                Subir al inicio →
              </p>

              <p className="small mb-1">
                🔴 Vencidos: <strong>{seguimientosVencidos.length}</strong>
              </p>
              <p className="small mb-1">
                🟡 Hoy: <strong>{seguimientosHoy.length}</strong>
              </p>
              <p className="small mb-3">
                🟢 Próximos 7 días:{" "}
                <strong>{seguimientosProximos.length}</strong>
              </p>

              <hr />

              <h6 className="small text-muted mb-2">
                Seguimientos de hoy
              </h6>

              {seguimientosHoy.length === 0 ? (
                <p className="small text-success mb-0">
                  No tenés seguimientos programados para hoy!
                </p>
              ) : (
                <ul className="list-unstyled small mb-0">
                  {seguimientosHoy.map((lead) => (
                    <li key={lead.id} className="mb-2">
                      <strong>{lead.nombre}</strong>
                      <br />
                      <span className="text-muted">
                        {lead.proximaAccion || "Contacto pendiente"} •{" "}
                        {lead.canal || "Canal N/D"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
