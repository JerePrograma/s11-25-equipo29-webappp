import React from "react";

/**
 * @param {{
 *   titulo: string;
 *   valor: string | number;
 *   icono?: React.ReactNode;
 *   color?: "primary" | "success" | "warning" | "danger" | "info" | "secondary";
 * }} props
 */
function MetricPanel({ titulo, valor, icono, color = "primary" }) {
  return (
    <div className="card text-center shadow-sm border-0 mb-4 h-100">
      <div className={`card-body bg-${color} text-light rounded`}>
        {icono && <div className="mb-2 fs-2">{icono}</div>}
        <h5 className="card-title fw-bold mb-1">{titulo}</h5>
        <p className="display-6 fw-bold mb-0">{valor}</p>
      </div>
    </div>
  );
}

export default MetricPanel;
