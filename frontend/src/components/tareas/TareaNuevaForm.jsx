// src/components/tareas/TareaNuevaForm.jsx

/**
 * @typedef {import("../../api/types.js").ClienteResponse} ClienteResponse
 */

/**
 * @typedef {Object} NuevaTareaInput
 * @property {string} titulo
 * @property {string} [descripcion]
 * @property {number | null} [clienteId]
 * @property {number | null} [conversacionId]
 * @property {string} fechaLimite
 * @property {"baja" | "media" | "alta"} prioridad
 */

/**
 * @param {{
 *   leads: ClienteResponse[],
 *   onCrear: (input: NuevaTareaInput) => Promise<void> | void,
 * }} props
 */
export default function TareaNuevaForm({ leads, onCrear }) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    clienteId: /** @type {number | null} */ (null),
    clienteNombre: "",
    fechaLimite: "",
    prioridad: "media",
  });

  const handleChangeCampo = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClienteChange = (e) => {
    const nombre = e.target.value;
    const cliente = leads.find((c) => c.nombre === nombre) || null;

    setForm((prev) => ({
      ...prev,
      clienteNombre: nombre,
      clienteId: cliente ? cliente.id : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.titulo.trim()) {
      alert("El título es obligatorio");
      return;
    }
    if (!form.fechaLimite) {
      alert("Debe seleccionar una fecha de vencimiento");
      return;
    }

    try {
      await onCrear({
        titulo: form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        clienteId: form.clienteId ?? null,
        conversacionId: null,
        fechaLimite: form.fechaLimite,
        prioridad: form.prioridad,
      });

      setForm({
        titulo: "",
        descripcion: "",
        clienteId: null,
        clienteNombre: "",
        fechaLimite: "",
        prioridad: "media",
      });
    } catch (err) {
      console.error("Error creando tarea:", err);
      alert("Error creando la tarea.");
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Nueva tarea</h5>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Título *</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              value={form.titulo}
              onChange={handleChangeCampo}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contacto (lead/cliente)</label>
            <input
              list="lista-contactos"
              type="text"
              name="clienteNombre"
              className="form-control"
              value={form.clienteNombre}
              onChange={handleClienteChange}
            />
            <datalist id="lista-contactos">
              {leads.map((c) => (
                <option key={c.id} value={c.nombre} />
              ))}
            </datalist>
            <small className="text-muted">
              Se asociará la tarea al contacto seleccionado.
            </small>
          </div>

          <div className="col-md-12">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              className="form-control"
              value={form.descripcion}
              onChange={handleChangeCampo}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Prioridad</label>
            <select
              name="prioridad"
              className="form-select"
              value={form.prioridad}
              onChange={handleChangeCampo}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Vencimiento *</label>
            <input
              type="date"
              name="fechaLimite"
              className="form-control"
              value={form.fechaLimite}
              onChange={handleChangeCampo}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary mt-2" type="submit">
              Crear tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
