import React, { useState, useEffect } from "react";
import { useLeads } from "../../context/leadcontext.jsx";
import { useConfig } from "../../context/configcontext.jsx";

export default function ModalAgregar({ onClose }) {
  const { agregarLead } = useLeads();
  const {
    canales,
    etapas,
    tiposContacto,
    estadosCalor,
  } = useConfig();

  const [form, setForm] = useState({
    nombre: "",
    canal: "",
    etapa: "",
    tipoContacto: "",
    estadoCalor: "",
    creadoEn: new Date().toISOString(),
  });

  // Setear valores iniciales cuando existan opciones
  useEffect(() => {
    if (canales.length > 0 && !form.canal) {
      setForm((f) => ({ ...f, canal: canales[0] }));
    }
    if (etapas.length > 0 && !form.etapa) {
      setForm((f) => ({ ...f, etapa: etapas[0] }));
    }
    if (tiposContacto.length > 0 && !form.tipoContacto) {
      setForm((f) => ({ ...f, tipoContacto: tiposContacto[0] }));
    }
    if (estadosCalor.length > 0 && !form.estadoCalor) {
      setForm((f) => ({ ...f, estadoCalor: estadosCalor[0] }));
    }
  }, [canales, etapas, tiposContacto, estadosCalor]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    agregarLead(form);
    onClose();
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Agregar Contacto</h5>
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
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* ETAPA */}
              <div className="col-md-6">
                <label className="form-label">Etapa</label>
                <select
                  className="form-select"
                  name="etapa"
                  value={form.etapa}
                  onChange={handleChange}
                >
                  {etapas.map((e) => (
                    <option key={e} value={e}>{e}</option>
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
                    <option key={t} value={t}>{t}</option>
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
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
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
