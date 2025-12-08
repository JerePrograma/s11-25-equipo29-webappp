// src/pages/PipelinePro.jsx
import React from "react";
import { useLeads } from "../context/leadcontext";

function PipelinePro() {
  const { leads } = useLeads();

  const etapas = [
    { nombre: "Nuevo lead", key: "Nuevo lead", color: "primary" },
    { nombre: "En seguimiento", key: "En seguimiento", color: "success" },
    { nombre: "Respuesta pendiente", key: "Respuesta pendiente", color: "danger" },
    { nombre: "Cliente", key: "Cliente", color: "secondary" },
  ];

  // Cantidad por etapa
  const counts = (etapa) =>
    leads.filter((l) =>
      etapa === "Cliente"
        ? l.tipoContacto === "Cliente"
        : l.etapa === etapa
    ).length;

  // Total para calcular progresos
  const total = leads.length || 1;

  return (
    <div className="my-4">
      <h4 className="fw-bold mb-3">Pipeline de ventas</h4>

      <div className="pipeline-container d-flex flex-wrap justify-content-between align-items-center">

        {etapas.map((e, i) => (
          <React.Fragment key={i}>
            {/* BLOQUE DE ETAPA */}
            <div className="text-center">
              <div className={`rounded-circle bg-${e.color} text-white fw-bold shadow`}
                   style={{
                     width: "75px",
                     height: "75px",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     fontSize: "1.7rem",
                     margin: "0 auto"
                   }}>
                {counts(e.key)}
              </div>

              <div className="mt-2 fw-semibold">{e.nombre}</div>
            </div>

            {/* FLECHA → excepto en el último */}
            {i < etapas.length - 1 && (
              <div className="text-muted fs-3 mx-2 d-none d-md-block">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* BARRA DE PROGRESO GLOBAL */}
      <div className="mt-4">
        <p className="fw-semibold mb-1">Progreso del pipeline</p>

        <div className="progress" style={{ height: "14px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${(counts("Nuevo lead") / total) * 100}%` }}
          ></div>

          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${(counts("En seguimiento") / total) * 100}%` }}
          ></div>

          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: `${(counts("Respuesta pendiente") / total) * 100}%` }}
          ></div>

          <div
            className="progress-bar bg-secondary"
            role="progressbar"
            style={{ width: `${(counts("Cliente") / total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PipelinePro;
