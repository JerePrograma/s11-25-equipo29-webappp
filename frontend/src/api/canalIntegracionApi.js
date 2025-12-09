// src/api/canalIntegracionApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").CanalIntegracionCreateRequest} CanalIntegracionCreateRequest
 * @typedef {import("./types.js").CanalIntegracionResponse} CanalIntegracionResponse
 * @typedef {import("./types.js").CanalIntegracionUpdateRequest} CanalIntegracionUpdateRequest
 */

/**
 * Crear canal de integración.
 * @param {CanalIntegracionCreateRequest} payload
 * @returns {Promise<CanalIntegracionResponse>}
 */
export function createCanalIntegracion(payload) {
  return apiFetch("/api/canales-integracion", {
    method: "POST",
    body: payload,
  });
}

/**
 * Listar todos los canales de integración.
 * @returns {Promise<CanalIntegracionResponse[]>}
 */
export function listCanalesIntegracion() {
  return apiFetch("/api/canales-integracion");
}

/**
 * Obtener canal de integración por id.
 * @param {number} id
 * @returns {Promise<CanalIntegracionResponse>}
 */
export function getCanalIntegracion(id) {
  return apiFetch(`/api/canales-integracion/${id}`);
}

/**
 * Actualizar canal de integración.
 * @param {number} id
 * @param {CanalIntegracionUpdateRequest} payload
 * @returns {Promise<CanalIntegracionResponse>}
 */
export function updateCanalIntegracion(id, payload) {
  return apiFetch(`/api/canales-integracion/${id}`, {
    method: "PUT",
    body: payload,
  });
}
