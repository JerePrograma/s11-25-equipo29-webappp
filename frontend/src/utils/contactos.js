// src/utils/contactos.js

/**
 * Normaliza un tipo proveniente de UI a 'lead' | 'cliente'.
 * @param {string} tipoUI
 * @returns {"lead" | "cliente"}
 */
export function normalizarTipoContacto(tipoUI) {
  const t = (tipoUI || "").toString().trim().toLowerCase();
  if (t === "cliente") return "cliente";
  return "lead";
}

/**
 * Devuelve una etiqueta legible para el tipo.
 * @param {string} tipo
 * @returns {string}
 */
export function tipoContactoLegible(tipo) {
  const t = (tipo || "").toString().trim().toLowerCase();
  if (t === "cliente") return "Cliente";
  if (t === "lead") return "Lead";
  return tipo || "Contacto";
}

/**
 * Mapea estadoGeneral a clase de badge de Bootstrap.
 * @param {string} estadoGeneral
 * @returns {string} 'success' | 'warning' | 'danger' | 'secondary'
 */
export function estadoGeneralBadgeClass(estadoGeneral) {
  const e = (estadoGeneral || "").toString().trim().toLowerCase();
  if (e === "activo") return "success";
  if (e === "en_seguimiento") return "warning";
  if (e === "perdido") return "danger";
  return "secondary";
}

/**
 * Devuelve una etiqueta legible para estadoGeneral.
 * @param {string} estadoGeneral
 * @returns {string}
 */
export function estadoGeneralLegible(estadoGeneral) {
  const e = (estadoGeneral || "").toString().trim().toLowerCase();
  if (e === "activo") return "Activo";
  if (e === "en_seguimiento") return "En seguimiento";
  if (e === "perdido") return "Perdido";
  return estadoGeneral || "Sin estado";
}
