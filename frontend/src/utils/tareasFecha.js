// src/utils/tareasFecha.js

/**
 * ¿La fecha está vencida (antes de hoy)?
 * @param {string | null | undefined} v
 * @returns {boolean}
 */
export function esVencida(v) {
  if (!v) return false;
  return new Date(v) < new Date();
}

/**
 * ¿La fecha es hoy (mismo día/mes/año local)?
 * @param {string | null | undefined} v
 * @returns {boolean}
 */
export function esHoy(v) {
  if (!v) return false;
  const hoy = new Date();
  const d = new Date(v);

  return (
    d.getFullYear() === hoy.getFullYear() &&
    d.getMonth() === hoy.getMonth() &&
    d.getDate() === hoy.getDate()
  );
}

/**
 * ¿La tarea está completada según su estado?
 * @param {import("../api/types.js").TareaResponse} tarea
 * @returns {boolean}
 */
export function estaCompletada(tarea) {
  return tarea.estado === "completada";
}
