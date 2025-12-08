// src/pages/Contactos/ModalEditar.jsx
import React, { useState, useEffect } from "react";
import { useConfig } from "../../context/configcontext.jsx";

function ModalEditar({ contacto, onClose, onSave }) {

  // Configuración del CRM
  const { canales, etapas, tiposContacto, estadosCalor } = useConfig();

  // Formulario interno
  const [form, setForm] = useState({
    nombre: "",
    canal: "",
    etapa: "",
    tipoContacto: "",
    estadoCalor: ""
  });

  // Cargar datos cuando la config y contacto existan
  useEffect(() => {
    if (!contacto) return;

    setForm({
      nombre: contacto.nombre || "",
      canal: contacto.canal || canales[0] || "",
      etapa: contacto.etapa || etapas[0] || "",
      tipoContacto: contacto.tipoContacto || tiposContacto[0] || "",
      estadoCalor: contacto.estadoCalor || estadosCalor[0] || ""
    });
  }, [contacto, canales, etapas, tiposContacto, estadosCalor]);

  // Manejar cambios
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Guardar cambios
  const guardar = () => {
    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    onSave(form);
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000090" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">

          <div className="modal-header">
            <h5 className="modal-title">Editar contacto</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            {/* Nombre */}
            <label className="form-label">Nombre</label>
            <input
              name="nombre"
              className="form-control mb-3"
              value={form.nombre}
              onChange={handleChange}
            />

            {/* Canal */}
            <label className="form-label">Canal</label>
            <select
              name="canal"
              className="form-select mb-3"
              value={form.canal}
              onChange={handleChange}
            >
              {canales.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* Etapa */}
            <label className="form-label">Etapa</label>
            <select
              name="etapa"
              className="form-select mb-3"
              value={form.etapa}
              onChange={handleChange}
            >
              {etapas.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>

            {/* Tipo contacto */}
            <label className="form-label">Tipo de contacto</label>
            <select
              name="tipoContacto"
              className="form-select mb-3"
              value={form.tipoContacto}
              onChange={handleChange}
            >
              {tiposContacto.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            {/* Estado calor */}
            <label className="form-label">Estado del lead</label>
            <select
              name="estadoCalor"
              className="form-select"
              value={form.estadoCalor}
              onChange={handleChange}
            >
              {estadosCalor.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            <button className="btn btn-dark" onClick={guardar}>
              Guardar cambios
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ModalEditar;
