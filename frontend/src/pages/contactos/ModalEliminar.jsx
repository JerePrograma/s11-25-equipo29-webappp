// src/pages/Contactos/ModalEliminar.jsx
import React from "react";

function ModalEliminar({ contacto, onClose, onDelete }) {
  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000090" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          
          <div className="modal-header">
            <h5 className="modal-title text-danger">Eliminar contacto</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <p>
              ¿Seguro que querés eliminar a{" "}
              <strong>{contacto?.nombre}</strong>?
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

export default ModalEliminar;
