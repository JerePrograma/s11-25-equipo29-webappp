// src/components/usuarios/UsuarioEliminarModal.jsx
import React from "react";

/**
 * @typedef {import("../../api/types.js").UsuarioResponse} UsuarioResponse
 */

/**
 * @param {{
 *   usuario: UsuarioResponse;
 *   onClose: () => void;
 *   onDelete: () => void;
 * }} props
 */
export default function UsuarioEliminarModal({ usuario, onClose, onDelete }) {
  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000090" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Eliminar usuario</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>
              ¿Seguro que querés eliminar a{" "}
              <strong>{usuario?.nombre}</strong>?
            </p>
            <p className="text-muted small mb-0">
              Esta acción no se puede deshacer.
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
