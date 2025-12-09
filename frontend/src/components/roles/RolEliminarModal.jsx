// src/components/roles/RolEliminarModal.jsx
import React from "react";

/**
 * @typedef {import("../../api/types.js").RolResponse} RolResponse
 */

/**
 * @param {{
 *   rol: RolResponse;
 *   onClose: () => void;
 *   onDelete: () => void;
 * }} props
 */
export default function RolEliminarModal({ rol, onClose, onDelete }) {
  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000090" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Eliminar rol</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>
              ¿Seguro que querés eliminar el rol{" "}
              <strong>{rol?.nombre}</strong>?
            </p>
            <p className="text-muted small mb-0">
              Esta acción no se puede deshacer y puede afectar permisos de usuarios asociados.
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                onDelete();
                onClose();
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
