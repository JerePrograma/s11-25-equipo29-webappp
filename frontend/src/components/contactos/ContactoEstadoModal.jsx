// src/components/contactos/ContactoEstadoModal.jsx
import React, { useState } from "react";
import { estadoGeneralLegible } from "../../utils/contactos.js";

/**
 * @param {{
 *   contacto: any,
 *   onClose: () => void,
 *   onSave: (estadoGeneral: "activo" | "en_seguimiento" | "perdido") => void,
 * }} props
 */
export default function ContactoEstadoModal({ contacto, onClose, onSave }) {
  const ESTADOS = [
    "activo",
    "en_seguimiento",
    "perdido",
  ];

  const [estado, setEstado] = useState(
    /** @type {"activo" | "en_seguimiento" | "perdido"} */
    (
      contacto?.estadoGeneral && ESTADOS.includes(contacto.estadoGeneral)
        ? contacto.estadoGeneral
        : "en_seguimiento"
    ),
  );

  const handleGuardar = () => {
    onSave(estado);
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cambiar estado</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <label className="form-label">Nuevo estado</label>

            <select
              className="form-select"
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value)
              }
            >
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {estadoGeneralLegible(e)}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            <button
              className="btn btn-primary"
              onClick={handleGuardar}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
