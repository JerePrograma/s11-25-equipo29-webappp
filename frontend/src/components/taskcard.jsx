import React from "react";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function TaskCard({ titulo, descripcion, fecha, estado = "pendiente", responsable }) {
  // Elegimos color e ícono según estado
  const estados = {
    pendiente: { color: "warning", icono: <FaClock /> },
    completada: { color: "success", icono: <FaCheckCircle /> },
    cancelada: { color: "danger", icono: <FaTimesCircle /> },
  };

  const { color, icono } = estados[estado] || estados.pendiente;

  return (
    <div className={`card border-${color} shadow-sm mb-3`}>
      <div className={`card-header bg-${color} bg-opacity-25 fw-bold`}>
        {icono} <span className="ms-2 text-capitalize">{estado}</span>
      </div>

      <div className="card-body">
        <h5 className="card-title mb-1">{titulo}</h5>
        {descripcion && <p className="card-text text-muted">{descripcion}</p>}
        {responsable && (
          <p className="mb-1">
            <strong>Responsable:</strong> {responsable}
          </p>
        )}
        {fecha && (
          <small className="text-muted">
            <strong>Fecha:</strong> {fecha}
          </small>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
