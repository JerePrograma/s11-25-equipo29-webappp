import React from "react";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

/**
 * @typedef {import("../api/types.js").TareaResponse} TareaResponse
 */

/**
 * @param {{ tarea: TareaResponse }} props
 */
function TaskCard({ tarea }) {
  const {
    titulo,
    descripcion,
    fechaLimite,
    estado = "pendiente",
    asignadoANombre,
  } = tarea;

  const estados = {
    pendiente: { color: "warning", icono: <FaClock /> },
    en_progreso: { color: "info", icono: <FaClock /> },
    completada: { color: "success", icono: <FaCheckCircle /> },
    cancelada: { color: "danger", icono: <FaTimesCircle /> },
  };

  const { color, icono } = estados[estado] || estados.pendiente;

  return (
    <div className={`card border-${color} shadow-sm mb-3`}>
      <div className={`card-header bg-${color} bg-opacity-25 fw-bold`}>
        {icono}{" "}
        <span className="ms-2 text-capitalize">
          {estado.replace("_", " ")}
        </span>
      </div>

      <div className="card-body">
        <h5 className="card-title mb-1">{titulo}</h5>
        {descripcion && <p className="card-text text-muted">{descripcion}</p>}
        {asignadoANombre && (
          <p className="mb-1">
            <strong>Responsable:</strong> {asignadoANombre}
          </p>
        )}
        {fechaLimite && (
          <small className="text-muted">
            <strong>Fecha límite:</strong> {fechaLimite}
          </small>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
