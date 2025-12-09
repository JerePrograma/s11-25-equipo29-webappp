// src/components/usuarios/UsuarioNuevoModal.jsx
import React, { useEffect, useState } from "react";
import { useRoles } from "../../context/rolescontext.jsx";

/**
 * Payload que devolverá el modal al padre.
 * No es exactamente UsuarioCreateRequest, pero es compatible.
 *
 * @typedef {Object} UsuarioNuevoForm
 * @property {string} nombre
 * @property {string} email
 * @property {string} telefono
 * @property {string} password
 * @property {string} rolId   // string en el form, luego se castea a number
 */

/**
 * @param {{
 *   onClose: () => void;
 *   onSave: (payload: UsuarioNuevoForm) => void;
 * }} props
 */
export default function UsuarioNuevoModal({ onClose, onSave }) {
  const { roles, loading: loadingRoles } = useRoles();

  /** @type {[UsuarioNuevoForm, Function]} */
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    rolId: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!form.rolId && roles.length > 0) {
      setForm((prev) => ({ ...prev, rolId: String(roles[0].id) }));
    }
  }, [roles, form.rolId]);

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
      alert("El nombre es obligatorio");
      return;
    }
    if (!form.email.trim()) {
      alert("El email es obligatorio");
      return;
    }
    if (!form.password.trim()) {
      alert("La contraseña es obligatoria");
      return;
    }
    if (form.password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!form.rolId) {
      alert("Debes seleccionar un rol");
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
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Agregar usuario</h5>
            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control shadow-sm"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Teléfono</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Contraseña</label>
                <input
                  type="password"
                  className="form-control shadow-sm"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  className="form-control shadow-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Rol</label>
                <select
                  className="form-select shadow-sm"
                  name="rolId"
                  value={form.rolId}
                  onChange={handleChange}
                  disabled={loadingRoles || roles.length === 0}
                >
                  {loadingRoles && (
                    <option value="">Cargando roles...</option>
                  )}
                  {!loadingRoles && roles.length === 0 && (
                    <option value="">No hay roles</option>
                  )}
                  {!loadingRoles &&
                    roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-dark w-100">
                  Guardar usuario
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
