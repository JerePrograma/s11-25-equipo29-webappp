// src/components/tareas/TareaEditModal.jsx

/**
 * @typedef {import("../../api/types.js").TareaResponse} TareaResponse
 */

/**
 * @param {{
 *   tarea: TareaResponse,
 *   onChange: (changes: Partial<TareaResponse>) => void,
 *   onClose: () => void,
 *   onSave: () => void,
 * }} props
 */
export default function TareaEditModal({ tarea, onChange, onClose, onSave }) {
  if (!tarea) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Editar tarea</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                value={tarea.titulo}
                onChange={(e) => onChange({ titulo: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={tarea.descripcion}
                onChange={(e) =>
                  onChange({ descripcion: e.target.value })
                }
              ></textarea>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={tarea.estado}
                  onChange={(e) => onChange({ estado: e.target.value })}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En progreso</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Prioridad</label>
                <select
                  className="form-select"
                  value={tarea.prioridad}
                  onChange={(e) => onChange({ prioridad: e.target.value })}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div className="col-md-12">
                <label className="form-label">Fecha de vencimiento</label>
                <input
                  type="date"
                  className="form-control"
                  value={tarea.fechaLimite || ""}
                  onChange={(e) =>
                    onChange({ fechaLimite: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={onSave}>
              Guardar cambios
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
