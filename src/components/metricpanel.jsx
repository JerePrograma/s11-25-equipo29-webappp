import React from "react";

function MetricPanel({ titulo, valor, icono, color = "primary" }) {
  return (
    <div className="card text-center shadow-sm border-0 mb-4">
      <div className={`card-body bg-${color} text-light rounded`}>
        <div className="mb-2 fs-2">{icono}</div>
        <h5 className="card-title fw-bold">{titulo}</h5>
        <p className="display-6 fw-bold mb-0">{valor}</p>
      </div>
    </div>
  );
}

export default MetricPanel;

