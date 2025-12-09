// src/api/rolApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").RolCreateRequest} RolCreateRequest
 * @typedef {import("./types.js").RolResponse} RolResponse
 * @typedef {import("./types.js").RolUpdateRequest} RolUpdateRequest
 */

/**
 * Crear rol.
 * @param {RolCreateRequest} payload
 * @returns {Promise<RolResponse>}
 */
export function createRol(payload) {
  return apiFetch("/api/roles", {
    method: "POST",
    body: payload,
  });
}

/**
 * Listar todos los roles.
 * @returns {Promise<RolResponse[]>}
 */
export function listRoles() {
  return apiFetch("/api/roles");
}

/**
 * Obtener rol por id.
 * @param {number} id
 * @returns {Promise<RolResponse>}
 */
export function getRol(id) {
  return apiFetch(`/api/roles/${id}`);
}

/**
 * Actualizar rol.
 * @param {number} id
 * @param {RolUpdateRequest} payload
 * @returns {Promise<RolResponse>}
 */
export function updateRol(id, payload) {
  return apiFetch(`/api/roles/${id}`, {
    method: "PUT",
    body: payload,
  });
}
