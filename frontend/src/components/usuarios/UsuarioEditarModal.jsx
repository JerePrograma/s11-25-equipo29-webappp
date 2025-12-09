// src/components/usuarios/UsuarioEditarModal.jsx
import React, { useEffect, useState } from "react";
import { useRoles } from "../../context/rolescontext.jsx";

/**
 * @typedef {import("../../api/types.js").UsuarioResponse} UsuarioResponse
 */

/**
 * @typedef {Object} UsuarioEditarForm
 * @property {string} nombre
 * @property {string} telefono
 * @property {string} estado
 * @property {string} rolId   // string en el form, se castea a number
 */

/**
 * @param {{
 *   usuario: UsuarioResponse;
 *   onClose: () => void;
 *   onSave: (form: UsuarioEditarForm) => void;
 * }} props
 */
export default function UsuarioEditarModal({ usuario, onClose, onSave }) {
  const { roles } = useRoles();

  /** @type {[UsuarioEditarForm, Function]} */
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    estado: "activo",
    rolId: "",
  });

  useEffect(() => {
    if (!usuario) return;
    setForm({
      nombre: usuario.nombre || "",
      telefono: usuario.telefono || "",
      estado: usuario.estado || "activo",
      rolId: usuario.rolId ? String(usuario.rolId) : "",
    });
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    if (!form.rolId) {
      alert("El rol es obligatorio");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000090" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Editar usuario</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                value={usuario.email}
                disabled
              />
              <small className="text-muted">
                El email no se edita desde esta pantalla.
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Rol</label>
              <select
                className="form-select"
                name="rolId"
                value={form.rolId}
                onChange={handleChange}
              >
                <option value="">Seleccionar rol...</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Estado</label>
              <select
                className="form-select"
                name="estado"
                value={form.estado}
                onChange={handleChange}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
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
