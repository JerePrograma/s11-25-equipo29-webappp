// src/pages/contactos/VerContacto.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLeads } from "../../context/leadcontext.jsx";
import { useTasks } from "../../context/taskcontext.jsx";

export default function VerContacto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { leads } = useLeads();
  const { tareas } = useTasks();

  const contacto = leads.find((c) => Number(c.id) === Number(id));

  const [tab, setTab] = useState("info");

  if (!contacto) {
    return <div className="container py-4">Contacto no encontrado.</div>;
  }

  // Filtrar tareas por nombre del contacto
  const tareasDelContacto = tareas.filter((t) => t.contacto === contacto.nombre);

  // ORDENAR ACTIVIDAD (más reciente arriba)
  const actividadOrdenada = [...(contacto.actividad || [])].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  // Formatear fechas
  const formatearFecha = (fecha) => {
    const f = new Date(fecha);
    return f.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container py-4">

      {/* VOLVER */}
      <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {/* CABECERA DEL CONTACTO */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center"
          style={{ width: 70, height: 70, fontSize: "1.8rem" }}
        >
          {contacto.nombre.charAt(0)}
        </div>

        <div>
          <h2 className="fw-bold mb-1">{contacto.nombre}</h2>
          <p className="text-muted mb-0">Canal: {contacto.canal}</p>

          <div className="d-flex gap-2 mt-2">
            <span className="badge bg-primary">{contacto.estado}</span>
            <span className="badge bg-dark">{contacto.tipoContacto}</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "info" ? "active" : ""}`}
            onClick={() => setTab("info")}
          >
            Información
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "tareas" ? "active" : ""}`}
            onClick={() => setTab("tareas")}
          >
            Tareas
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "actividad" ? "active" : ""}`}
            onClick={() => setTab("actividad")}
          >
            Actividad
          </button>
        </li>

        <li className="nav-item">
          <button
            className="nav-link"
            onClick={() =>
              navigate(
                `/mensajes?contacto=${encodeURIComponent(
                  contacto.nombre
                )}&canal=${encodeURIComponent(contacto.canal)}`
              )
            }
          >
            Conversaciones
          </button>
        </li>
      </ul>

      {/* TAB: INFORMACIÓN */}
      {tab === "info" && (
        <div className="card shadow-sm p-4">
          <h5 className="fw-bold mb-3">Datos del contacto</h5>
          <p><strong>Nombre:</strong> {contacto.nombre}</p>
          <p><strong>Canal:</strong> {contacto.canal}</p>
          <p><strong>Estado actual:</strong> {contacto.estado}</p>
          <p><strong>Tipo:</strong> {contacto.tipoContacto}</p>
          <p className="text-muted">Más datos próximamente…</p>
        </div>
      )}

      {/* TAB: TAREAS */}
      {tab === "tareas" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Tareas asociadas</h5>

            <button
              className="btn btn-sm btn-dark"
              onClick={() =>
                navigate(`/tareas?contacto=${encodeURIComponent(contacto.nombre)}`)
              }
            >
              + Nueva tarea
            </button>
          </div>

          {tareasDelContacto.length === 0 ? (
            <p className="text-muted">No hay tareas para este contacto.</p>
          ) : (
            <ul className="list-group shadow-sm">
              {tareasDelContacto.map((t) => (
                <li key={t.id} className="list-group-item">
                  <strong>{t.titulo}</strong>
                  <br />
                  {t.descripcion && <small className="text-muted">{t.descripcion}</small>}
                  <br />
                  <small className="text-muted">
                    Vence: {new Date(t.vencimiento).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* TAB: ACTIVIDAD — TIMELINE REAL */}
      {tab === "actividad" && (
        <div className="card shadow-sm p-4">
          <h5 className="fw-bold mb-3">Actividad reciente</h5>

          {actividadOrdenada.length === 0 ? (
            <p className="text-muted">No hay actividad registrada.</p>
          ) : (
            <ul className="list-group">
              {actividadOrdenada.map((a, i) => (
                <li key={i} className="list-group-item">
                  <div className="fw-bold">{a.tipo}</div>
                  <div>{a.detalle}</div>
                  <small className="text-muted">{formatearFecha(a.fecha)}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
