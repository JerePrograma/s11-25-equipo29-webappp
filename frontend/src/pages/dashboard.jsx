// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLeads } from "../context/leadcontext.jsx";
import { useTasks } from "../context/taskcontext.jsx";
import FunnelMini from "./FunnelMini";
import PipelinePro from "./pipelinepro";

// ----------------------------
// Helpers de fechas
// ----------------------------
function esHoy(fecha) {
  const hoy = new Date();
  const f = new Date(fecha);
  return (
    f.getFullYear() === hoy.getFullYear() &&
    f.getMonth() === hoy.getMonth() &&
    f.getDate() === hoy.getDate()
  );
}

function esVencida(fecha) {
  if (!fecha) return false;
  return new Date(fecha) < new Date();
}

function enProximos7Dias(fecha) {
  const hoy = new Date();
  const f = new Date(fecha);
  const diferencia = (f - hoy) / (1000 * 60 * 60 * 24);
  return diferencia >= 1 && diferencia <= 7;
}

// ----------------------------
// Componente principal
// ----------------------------
export default function Dashboard() {
  const { leads } = useLeads();
  const { tareas } = useTasks();

  // --- MÉTRICAS DE LEADS ---
  const totalLeads = leads?.length ?? 0;

  // Lead activo = NO cliente
  const leadsActivos = leads.filter((l) => l.etapa !== "Cliente").length;

  const enSeguimiento = leads.filter((l) => l.etapa === "En seguimiento").length;

  const respuestasPendientes = leads.filter(
    (l) => l.etapa === "Respuesta pendiente"
  ).length;

  // --- MÉTRICAS DE TAREAS ---
  const tareasVencidas = tareas.filter(
    (t) => !t.completada && esVencida(t.vencimiento)
  ).length;

  const tareasHoy = tareas.filter(
    (t) => !t.completada && esHoy(t.vencimiento)
  ).length;

  const tareasProximos7Dias = tareas.filter(
    (t) => !t.completada && enProximos7Dias(t.vencimiento)
  ).length;

  return (
    <div className="container-fluid">

      {/* Título */}
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Dashboard</h1>
        <p className="text-muted mb-0">
          Vista general de tus leads, clientes y seguimientos.
        </p>
      </header>

      {/* 🔥 FUNNEL MINI + PIPELINE */}
      <FunnelMini />
      <PipelinePro />

      {/* ------------------------- */}
      {/* MÉTRICAS PRINCIPALES */}
      {/* ------------------------- */}
      <div className="row mb-3 mt-3">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-muted">Leads activos</h6>
            <p className="h4 fw-bold">{leadsActivos}</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-muted">En seguimiento</h6>
            <p className="h4 fw-bold">{enSeguimiento}</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-muted">Respuestas pendientes</h6>
            <p className="h4 fw-bold">{respuestasPendientes}</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3">
            <h6 className="text-muted">Total de leads</h6>
            <p className="h4 fw-bold">{totalLeads}</p>
          </div>
        </div>
      </div>

      {/* ------------------------- */}
      {/* ÚLTIMAS INTERACCIONES */}
      {/* ------------------------- */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold mb-3">Últimas interacciones</h5>
        <p className="text-muted">
          (En el futuro vamos a listar mensajes recientes, seguimientos o notas).
        </p>
      </div>

      {/* ------------------------- */}
      {/* TAREAS */}
      {/* ------------------------- */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold mb-3">Seguimientos (Tareas)</h5>

        <p className="text-muted">
          <strong className="text-danger">{tareasVencidas}</strong> vencidas
        </p>

        <p className="text-muted">
          <strong>{tareasHoy}</strong> para hoy
        </p>

        <p className="text-muted">
          <strong>{tareasProximos7Dias}</strong> en los próximos 7 días
        </p>

        <Link to="/tareas" className="btn btn-outline-primary mt-2">
          Ver todas las tareas
        </Link>
      </div>

    </div>
  );
}
