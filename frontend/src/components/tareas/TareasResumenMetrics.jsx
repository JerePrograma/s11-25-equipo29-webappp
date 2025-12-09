// src/components/tareas/TareasResumenMetrics.jsx
import { esHoy, esVencida, estaCompletada } from "../../utils/tareasFecha.js";

/**
 * @typedef {import("../../api/types.js").TareaResponse} TareaResponse
 */

/**
 * @param {{ tareas: TareaResponse[] }} props
 */
export default function TareasResumenMetrics({ tareas }) {
  const total = tareas.length;
  const completadas = tareas.filter(estaCompletada).length;
  const pendientes = total - completadas;
  const vencidas = tareas.filter((t) => esVencida(t.fechaLimite)).length;
  const hoyCount = tareas.filter((t) => esHoy(t.fechaLimite)).length;

  return (
    <div className="row mb-4 text-center">
      <div className="col">
        <h5>Total</h5>
        <div className="fw-bold">{total}</div>
      </div>
      <div className="col">
        <h5>Pendientes</h5>
        <div className="fw-bold">{pendientes}</div>
      </div>
      <div className="col">
        <h5>Completadas</h5>
        <div className="fw-bold">{completadas}</div>
      </div>
      <div className="col">
        <h5>Vencidas</h5>
        <div className="fw-bold text-danger">{vencidas}</div>
      </div>
      <div className="col">
        <h5>Para hoy</h5>
        <div className="fw-bold text-warning">{hoyCount}</div>
      </div>
    </div>
  );
}
