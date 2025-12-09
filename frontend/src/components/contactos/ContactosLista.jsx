// src/components/contactos/ContactosLista.jsx
import React from "react";
import {
  estadoGeneralBadgeClass,
  estadoGeneralLegible,
  tipoContactoLegible,
} from "../../utils/contactos.js";

/**
 * @typedef {import("../../api/types.js").ClienteResponse} ClienteResponse
 */

/**
 * @param {{
 *   contactos: ClienteResponse[],
 *   onVer: (c: ClienteResponse) => void,
 *   onEditar: (c: ClienteResponse) => void,
 *   onEliminar: (c: ClienteResponse) => void,
 *   onEnviarMensaje: (c: ClienteResponse) => void,
 *   onCambiarEstado?: (c: ClienteResponse) => void,
 * }} props
 */
export default function ContactosLista({
  contactos,
  onVer,
  onEditar,
  onEliminar,
  onEnviarMensaje,
  onCambiarEstado,
}) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Origen/Canal</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {contactos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No se encontraron contactos.
                  </td>
                </tr>
              ) : (
                contactos.map((c) => {
                  const badgeClass = estadoGeneralBadgeClass(
                    c.estadoGeneral,
                  );

                  return (
                    <tr key={c.id}>
                      {/* NOMBRE */}
                      <td className="fw-semibold">{c.nombre}</td>

                      {/* ORIGEN / CANAL */}
                      <td>{c.origen || "CRM"}</td>

                      {/* ESTADO GENERAL */}
                      <td>
                        <span className={`badge bg-${badgeClass}`}>
                          {estadoGeneralLegible(c.estadoGeneral)}
                        </span>
                      </td>

                      {/* TIPO */}
                      <td>
                        <span className="badge bg-dark">
                          {tipoContactoLegible(c.tipo)}
                        </span>
                      </td>

                      {/* ACCIONES */}
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-success d-flex align-items-center gap-1"
                            onClick={() => onEnviarMensaje(c)}
                          >
                            <i className="bi bi-chat-dots" />
                            Enviar
                          </button>

                          {onCambiarEstado && (
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => onCambiarEstado(c)}
                            >
                              Estado
                            </button>
                          )}

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onVer(c)}
                          >
                            Ver
                          </button>

                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onEditar(c)}
                          >
                            Editar
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onEliminar(c)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
