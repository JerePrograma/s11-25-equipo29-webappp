// src/api/tareaApi.js

import { apiFetch, buildQuery } from "./httpClient.js";

/**
 * @typedef {import("./types.js").TareaCreateRequest} TareaCreateRequest
 * @typedef {import("./types.js").TareaResponse} TareaResponse
 * @typedef {import("./types.js").TareaUpdateRequest} TareaUpdateRequest
 */

/**
 * Crear tarea.
 * @param {TareaCreateRequest} payload
 * @returns {Promise<TareaResponse>}
 */
export function createTarea(payload) {
  return apiFetch("/api/tareas", {
    method: "POST",
    body: payload,
  });
}

/**
 * Obtener tarea por id.
 * @param {number} id
 * @returns {Promise<TareaResponse>}
 */
export function getTarea(id) {
  return apiFetch(`/api/tareas/${id}`);
}

/**
 * Listar tareas del usuario (pendientes/en_progreso).
 * @param {number} asignadoAId
 * @returns {Promise<TareaResponse[]>}
 */
export function listTareasPorUsuario(asignadoAId) {
  const query = buildQuery({ asignadoAId });
  return apiFetch(`/api/tareas${query}`);
}

/**
 * Actualizar tarea.
 * @param {number} id
 * @param {TareaUpdateRequest} payload
 * @returns {Promise<TareaResponse>}
 */
export function updateTarea(id, payload) {
  return apiFetch(`/api/tareas/${id}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Eliminar tarea.
 * @param {number} id
 * @returns {Promise<void>}
 */
export function deleteTarea(id) {
  return apiFetch(`/api/tareas/${id}`, {
    method: "DELETE",
  });
}
