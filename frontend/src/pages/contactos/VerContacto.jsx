// src/pages/Contactos/VerContacto.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLeads } from "../../context/leadcontext.jsx";
import { useTasks } from "../../context/taskcontext.jsx";
import {
  estadoGeneralLegible,
  tipoContactoLegible,
} from "../../utils/contactos.js";

/**
 * Detalle de un contacto: info básica, tareas asociadas y actividad.
 */
export default function VerContacto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { contactos } = useLeads();
  const { tareas } = useTasks();

  const contacto = contactos.find(
    (c) => Number(c.id) === Number(id),
  );

  const [tab, setTab] = useState("info");

  if (!contacto) {
    return <div className="container py-4">Contacto no encontrado.</div>;
  }

  // Tareas asociadas al contacto por clienteId
  const tareasDelContacto = tareas.filter(
    (t) => t.clienteId === contacto.id,
  );

  /** @type {import("../../api/types.js").ActividadResponse[]} */
  const actividad = Array.isArray(contacto.actividad)
    ? contacto.actividad
    : [];

  const actividadOrdenada = [...actividad].sort(
    (a, b) =>
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
  );

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
          <p className="text-muted mb-0">
            Origen/Canal: {contacto.origen || "CRM"}
          </p>

          <div className="d-flex gap-2 mt-2">
            <span className="badge bg-primary">
              {estadoGeneralLegible(contacto.estadoGeneral)}
            </span>
            <span className="badge bg-dark">
              {tipoContactoLegible(contacto.tipo)}
            </span>
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
                  contacto.nombre,
                )}&canal=${encodeURIComponent(contacto.origen || "WhatsApp")}`,
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
          <p>
            <strong>Nombre:</strong> {contacto.nombre}
          </p>
          <p>
            <strong>Email:</strong> {contacto.email || "—"}
          </p>
          <p>
            <strong>Teléfono:</strong> {contacto.telefono || "—"}
          </p>
          <p>
            <strong>Origen/Canal:</strong> {contacto.origen || "CRM"}
          </p>
          <p>
            <strong>Estado general:</strong>{" "}
            {estadoGeneralLegible(contacto.estadoGeneral)}
          </p>
          <p>
            <strong>Tipo:</strong> {tipoContactoLegible(contacto.tipo)}
          </p>
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
                navigate(
                  `/tareas?clienteId=${encodeURIComponent(
                    contacto.id,
                  )}`,
                )
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
                  {t.descripcion && (
                    <>
                      <br />
                      <small className="text-muted">
                        {t.descripcion}
                      </small>
                    </>
                  )}
                  <br />
                  <small className="text-muted">
                    Estado: {t.estado} · Prioridad: {t.prioridad} · Vence:{" "}
                    {t.fechaLimite
                      ? new Date(t.fechaLimite).toLocaleDateString()
                      : "—"}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* TAB: ACTIVIDAD */}
      {tab === "actividad" && (
        <div className="card shadow-sm p-4">
          <h5 className="fw-bold mb-3">Actividad reciente</h5>

          {actividadOrdenada.length === 0 ? (
            <p className="text-muted">No hay actividad registrada.</p>
          ) : (
            <ul className="list-group">
              {actividadOrdenada.map((a) => (
                <li key={a.id} className="list-group-item">
                  <div className="fw-bold">{a.tipo}</div>
                  <div className="small">{a.metadataJson}</div>
                  <small className="text-muted">
                    {formatearFecha(a.fecha)}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
