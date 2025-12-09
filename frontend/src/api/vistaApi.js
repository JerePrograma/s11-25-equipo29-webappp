// src/api/vistaApi.js

import { apiFetch, buildQuery } from "./httpClient.js";

/**
 * @typedef {import("./types.js").VistaGuardadaCreateRequest} VistaGuardadaCreateRequest
 * @typedef {import("./types.js").VistaGuardadaResponse} VistaGuardadaResponse
 * @typedef {import("./types.js").VistaGuardadaUpdateRequest} VistaGuardadaUpdateRequest
 */

/**
 * Crear vista guardada.
 *
 * @param {VistaGuardadaCreateRequest} payload
 * @param {number} usuarioId - ID del usuario dueño de la vista.
 * @returns {Promise<VistaGuardadaResponse>}
 */
export function createVistaGuardada(payload, usuarioId) {
  const query = buildQuery({ usuarioId });
  return apiFetch(`/api/vistas${query}`, {
    method: "POST",
    body: payload,
  });
}

/**
 * Obtener vista guardada por id.
 * @param {number} id
 * @returns {Promise<VistaGuardadaResponse>}
 */
export function getVistaGuardada(id) {
  return apiFetch(`/api/vistas/${id}`);
}

/**
 * Listar vistas guardadas de un usuario.
 * @param {number} usuarioId
 * @returns {Promise<VistaGuardadaResponse[]>}
 */
export function listVistasPorUsuario(usuarioId) {
  return apiFetch(`/api/vistas/usuario/${usuarioId}`);
}

/**
 * Listar vistas públicas.
 * @returns {Promise<VistaGuardadaResponse[]>}
 */
export function listVistasPublicas() {
  return apiFetch("/api/vistas/publicas");
}

/**
 * Actualizar vista guardada.
 * @param {number} id
 * @param {VistaGuardadaUpdateRequest} payload
 * @returns {Promise<VistaGuardadaResponse>}
 */
export function updateVistaGuardada(id, payload) {
  return apiFetch(`/api/vistas/${id}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Eliminar vista guardada.
 * @param {number} id
 * @returns {Promise<void>}
 */
export function deleteVistaGuardada(id) {
  return apiFetch(`/api/vistas/${id}`, {
    method: "DELETE",
  });
}
