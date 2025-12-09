// src/components/contactos/ContactoNuevoModal.jsx
import React, { useEffect, useState } from "react";
import { useConfig } from "../../context/configcontext.jsx";

/**
 * @param {{
 *   onClose: () => void,
 *   onSave: (payload: {
 *     nombre: string,
 *     email: string,
 *     telefono: string,
 *     canal: string,
 *     etapa: string,
 *     tipoContacto: string,
 *     estadoCalor: string,
 *     origen: string,
 *     creadoEn: string,
 *     tipo?: string,
 *   }) => void,
 * }} props
 */
export default function ContactoNuevoModal({ onClose, onSave }) {
  const { canales, etapas, tiposContacto, estadosCalor } = useConfig();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    canal: "",
    etapa: "",
    tipoContacto: "",
    estadoCalor: "",
    origen: "",
    creadoEn: new Date().toISOString(),
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      canal: prev.canal || canales[0] || "",
      etapa: prev.etapa || etapas[0] || "",
      tipoContacto: prev.tipoContacto || tiposContacto[0] || "Lead",
      estadoCalor: prev.estadoCalor || estadosCalor[0] || "Lead frío",
    }));
  }, [canales, etapas, tiposContacto, estadosCalor]);

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
    if (!form.telefono.trim()) {
      alert("El teléfono es obligatorio");
      return;
    }

    onSave({
      ...form,
      tipo:
        form.tipoContacto?.toLowerCase() === "cliente"
          ? "cliente"
          : "lead",
    });
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar contacto</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              {/* NOMBRE */}
              <div className="col-12">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="col-md-6">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* TELÉFONO */}
              <div className="col-md-6">
                <label className="form-label">Teléfono *</label>
                <input
                  type="tel"
                  className="form-control"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* CANAL */}
              <div className="col-md-6">
                <label className="form-label">Canal</label>
                <select
                  className="form-select"
                  name="canal"
                  value={form.canal}
                  onChange={handleChange}
                >
                  {canales.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* ETAPA (UI) */}
              <div className="col-md-6">
                <label className="form-label">Etapa (visual)</label>
                <select
                  className="form-select"
                  name="etapa"
                  value={form.etapa}
                  onChange={handleChange}
                >
                  {etapas.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              {/* TIPO CONTACTO */}
              <div className="col-md-6">
                <label className="form-label">Tipo de contacto</label>
                <select
                  className="form-select"
                  name="tipoContacto"
                  value={form.tipoContacto}
                  onChange={handleChange}
                >
                  {tiposContacto.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* ESTADO CALOR */}
              <div className="col-md-6">
                <label className="form-label">Estado del lead</label>
                <select
                  className="form-select"
                  name="estadoCalor"
                  value={form.estadoCalor}
                  onChange={handleChange}
                >
                  {estadosCalor.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              {/* ORIGEN */}
              <div className="col-12">
                <label className="form-label">Origen (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="origen"
                  placeholder="Landing, campaña, referido..."
                  value={form.origen}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  Guardar contacto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
