// src/api/conversacionApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").ConversacionCreateRequest} ConversacionCreateRequest
 * @typedef {import("./types.js").ConversacionResponse} ConversacionResponse
 * @typedef {import("./types.js").ConversacionUpdateRequest} ConversacionUpdateRequest
 */

/**
 * Crear conversación.
 * @param {ConversacionCreateRequest} payload
 * @returns {Promise<ConversacionResponse>}
 */
export function createConversacion(payload) {
  return apiFetch("/api/conversaciones", {
    method: "POST",
    body: payload,
  });
}

/**
 * Obtener conversación por id.
 * @param {number} id
 * @returns {Promise<ConversacionResponse>}
 */
export function getConversacion(id) {
  return apiFetch(`/api/conversaciones/${id}`);
}

/**
 * Listar todas las conversaciones.
 * @returns {Promise<ConversacionResponse[]>}
 */
export function listConversaciones() {
  return apiFetch("/api/conversaciones");
}

/**
 * Actualizar conversación.
 * @param {number} id
 * @param {ConversacionUpdateRequest} payload
 * @returns {Promise<ConversacionResponse>}
 */
export function updateConversacion(id, payload) {
  return apiFetch(`/api/conversaciones/${id}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Eliminar conversación.
 * @param {number} id
 * @returns {Promise<void>}
 */
export function deleteConversacion(id) {
  return apiFetch(`/api/conversaciones/${id}`, {
    method: "DELETE",
  });
}
