// src/components/tareas/TareasLista.jsx
import { esHoy, esVencida, estaCompletada } from "../../utils/tareasFecha.js";

/**
 * @typedef {import("../../api/types.js").TareaResponse} TareaResponse
 */

/**
 * @param {{
 *   tareas: TareaResponse[],
 *   isExterno: boolean,
 *   onCompletar: (id: number) => Promise<void> | void,
 *   onEditarClick: (tarea: TareaResponse) => void,
 *   onEliminar: (id: number) => Promise<void> | void,
 * }} props
 */
export default function TareasLista({
  tareas,
  isExterno,
  onCompletar,
  onEditarClick,
  onEliminar,
}) {
  if (tareas.length === 0) {
    return <p className="text-muted">No hay tareas con los filtros actuales.</p>;
  }

  return (
    <div className="list-group">
      {tareas.map((t) => {
        let clase =
          "list-group-item d-flex justify-content-between align-items-start";

        if (estaCompletada(t)) clase += " bg-light text-muted";
        else if (esVencida(t.fechaLimite)) clase += " list-group-item-danger";
        else if (esHoy(t.fechaLimite)) clase += " list-group-item-warning";
        else clase += " list-group-item-success";

        return (
          <div key={t.id} className={clase}>
            <div>
              <h6 className="fw-bold mb-1">{t.titulo}</h6>

              {t.descripcion && (
                <p className="small mb-1">{t.descripcion}</p>
              )}

              <div className="small mb-1">
                <strong>Contacto:</strong> {t.clienteNombre || "—"} ·{" "}
                <strong>Prioridad:</strong> {t.prioridad} ·{" "}
                <strong>Estado:</strong> {t.estado}
              </div>

              <div className="small text-muted">
                Vence:{" "}
                {t.fechaLimite
                  ? new Date(t.fechaLimite).toLocaleDateString()
                  : "—"}
              </div>
            </div>

            <div className="d-flex flex-column gap-1">
              {isExterno ? (
                <span className="badge bg-secondary">Solo lectura</span>
              ) : (
                <>
                  {!estaCompletada(t) ? (
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => onCompletar(t.id)}
                    >
                      ✓ Completar
                    </button>
                  ) : (
                    <span className="badge bg-dark">Completada</span>
                  )}

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEditarClick(t)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onEliminar(t.id)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
