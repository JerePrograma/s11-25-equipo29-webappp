// src/hooks/useTareasFiltradas.js
import { useMemo } from "react";
import { esHoy, esVencida, estaCompletada } from "../utils/tareasFecha.js";

/**
 * @typedef {import("../api/types.js").TareaResponse} TareaResponse
 */

/**
 * Filtra tareas por estado, fecha y prioridad.
 *
 * @param {TareaResponse[]} tareas
 * @param {{
 *   estado: "pendientes" | "completadas" | "todas",
 *   fecha: "todas" | "hoy" | "vencidas" | "proximas",
 *   prioridad: "todas" | "baja" | "media" | "alta"
 * }} filtros
 * @returns {TareaResponse[]}
 */
export function useTareasFiltradas(tareas, filtros) {
  const { estado, fecha, prioridad } = filtros;

  return useMemo(
    () =>
      tareas.filter((t) => {
        const completada = estaCompletada(t);

        // Estado
        if (estado === "pendientes" && completada) return false;
        if (estado === "completadas" && !completada) return false;

        // Prioridad
        if (prioridad !== "todas" && t.prioridad !== prioridad) return false;

        // Fecha
        if (fecha === "hoy" && !esHoy(t.fechaLimite)) return false;
        if (fecha === "vencidas" && !esVencida(t.fechaLimite)) return false;
        if (fecha === "proximas") {
          const hoy = new Date();
          const f = t.fechaLimite ? new Date(t.fechaLimite) : null;
          if (!f) return false;
          const diff = f.getTime() - hoy.getTime();
          if (!(f > hoy && diff <= 1000 * 60 * 60 * 24 * 3)) return false;
        }

        return true;
      }),
    [tareas, estado, fecha, prioridad]
  );
}
