// src/pages/Contactos/ModalEtapa.jsx
import React, { useState, useEffect } from "react";
import { useConfig } from "../../context/configcontext.jsx";

export default function ModalEtapa({ contacto, onClose, onSave }) {
  
  const { etapas } = useConfig();

  const [nuevaEtapa, setNuevaEtapa] = useState(contacto.etapa);

  // Si las etapas todavía no cargaron, usamos fallback
  useEffect(() => {
    if (etapas.length > 0 && !etapas.includes(nuevaEtapa)) {
      setNuevaEtapa(etapas[0]);
    }
  }, [etapas]);

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Cambiar etapa</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <label className="form-label">Nueva etapa</label>

            <select
              className="form-select"
              value={nuevaEtapa}
              onChange={(e) => setNuevaEtapa(e.target.value)}
              disabled={etapas.length === 0}
            >
              {etapas.map((e) => (
                <option key={e} value={e}>
                  {e}
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
              onClick={() => onSave(nuevaEtapa)}
              disabled={etapas.length === 0}
            >
              Guardar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
