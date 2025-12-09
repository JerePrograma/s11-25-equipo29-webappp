import React from "react";

/**
 * @typedef {import("../api/types.js").ClienteResponse} ClienteResponse
 */

/**
 * @param {{ cliente: ClienteResponse, onClick?: () => void, className?: string }} props
 */
function ContactCard({ cliente, onClick, className = "" }) {
  const {
    nombre,
    email,
    telefono,
    origen,
    estadoGeneral,
    propietarioNombre,
    etiquetas = [],
  } = cliente;

  const estado = estadoGeneral || "en_seguimiento";

  const badgeVariant =
    {
      activo: "success",
      en_seguimiento: "warning",
      perdido: "danger",
    }[estado] || "secondary";

  return (
    <div
      className={`card shadow-sm mb-3 ${onClick ? "cursor-pointer" : ""} ${className}`}
      role={onClick ? "button" : undefined}
      onClick={onClick}
    >
      <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">
        <div>
          <h5 className="card-title mb-1">{nombre}</h5>
          {propietarioNombre && (
            <div className="text-muted small mb-1">Propietario: {propietarioNombre}</div>
          )}
          <p className="card-text mb-1">{email}</p>
          {telefono && <p className="card-text mb-1">{telefono}</p>}
          {origen && (
            <small className="text-muted d-block">
              Origen: <strong>{origen}</strong>
            </small>
          )}
          {etiquetas.length > 0 && (
            <div className="mt-2 d-flex flex-wrap gap-1">
              {etiquetas.map((tag) => (
                <span key={tag} className="badge bg-light text-secondary border">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <span
          className={`badge bg-${badgeVariant} text-uppercase align-self-start`}
          style={{ letterSpacing: ".5px" }}
        >
          {estado.replace("_", " ")}
        </span>
      </div>
    </div>
  );
}

export default ContactCard;
