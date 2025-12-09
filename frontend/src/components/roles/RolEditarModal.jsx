// src/components/roles/RolEditarModal.jsx
import React, { useEffect, useState } from "react";

/**
 * @typedef {import("../../api/types.js").RolResponse} RolResponse
 */

/**
 * @typedef {Object} RolEditarForm
 * @property {string} descripcion
 * @property {string} permisosJson
 */

/**
 * @param {{
 *   rol: RolResponse;
 *   onClose: () => void;
 *   onSave: (form: RolEditarForm) => void;
 * }} props
 */
export default function RolEditarModal({ rol, onClose, onSave }) {
  /** @type {[RolEditarForm, Function]} */
  const [form, setForm] = useState({
    descripcion: "",
    permisosJson: "",
  });

  useEffect(() => {
    if (!rol) return;
    setForm({
      descripcion: rol.descripcion || "",
      permisosJson: rol.permisosJson || "",
    });
  }, [rol]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    if (form.permisosJson.trim()) {
      try {
        JSON.parse(form.permisosJson);
      } catch {
        const continuar = window.confirm(
          "El JSON de permisos no es válido. ¿Seguro que querés guardar igual?"
        );
        if (!continuar) return;
      }
    }

    onSave(form);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000090" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Editar rol</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={rol.nombre}
                disabled
              />
              <small className="text-muted">
                El nombre del rol no se edita desde esta pantalla.
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Permisos (JSON)
              </label>
              <textarea
                className="form-control"
                name="permisosJson"
                rows={10}
                value={form.permisosJson}
                onChange={handleChange}
              />
              <small className="text-muted">
                Editá el JSON de permisos según tu modelo de autorización.
              </small>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-dark" onClick={handleGuardar}>
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
