// src/components/roles/RolNuevoModal.jsx
import React, { useState } from "react";

/**
 * @typedef {Object} RolNuevoForm
 * @property {string} nombre
 * @property {string} descripcion
 * @property {string} permisosJson
 */

/**
 * @param {{
 *   onClose: () => void;
 *   onSave: (form: RolNuevoForm) => void;
 * }} props
 */
export default function RolNuevoModal({ onClose, onSave }) {
  /** @type {[RolNuevoForm, Function]} */
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    permisosJson: "{\n  \"modulo\": {\n    \"accion\": true\n  }\n}",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) {
      alert("El nombre del rol es obligatorio");
      return;
    }

    // Validación soft de JSON
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
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Nuevo rol</h5>
            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="ADMIN, VENDEDOR, EXTERNO..."
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Rol con acceso completo al sistema..."
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Permisos (JSON)
                </label>
                <textarea
                  className="form-control"
                  name="permisosJson"
                  rows={8}
                  value={form.permisosJson}
                  onChange={handleChange}
                />
                <small className="text-muted">
                  JSON libre para permisos por módulo/acción. Ej: {"{"}
                  "usuarios": {"{"}"crear": true, "editar": false{"}"}
                  {"}"}.
                </small>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-dark w-100">
                  Guardar rol
                </button>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
