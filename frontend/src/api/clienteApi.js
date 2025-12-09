// src/api/clienteApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").ClienteCreateRequest} ClienteCreateRequest
 * @typedef {import("./types.js").ClienteResponse} ClienteResponse
 * @typedef {import("./types.js").ClienteUpdateRequest} ClienteUpdateRequest
 * @typedef {import("./types.js").ClienteCambioEtapaRequest} ClienteCambioEtapaRequest
 */

/**
 * Crear cliente/contacto.
 * @param {ClienteCreateRequest} payload
 * @returns {Promise<ClienteResponse>}
 */
export function createCliente(payload) {
  return apiFetch("/api/clientes", {
    method: "POST",
    body: payload,
  });
}

/**
 * Listar todos los clientes.
 * @returns {Promise<ClienteResponse[]>}
 */
export function listClientes() {
  return apiFetch("/api/clientes");
}

/**
 * Obtener cliente por id.
 * @param {number} id
 * @returns {Promise<ClienteResponse>}
 */
export function getCliente(id) {
  return apiFetch(`/api/clientes/${id}`);
}

/**
 * Actualizar cliente.
 * @param {number} id
 * @param {ClienteUpdateRequest} payload
 * @returns {Promise<ClienteResponse>}
 */
export function updateCliente(id, payload) {
  return apiFetch(`/api/clientes/${id}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Eliminar cliente.
 * @param {number} id
 * @returns {Promise<void>}
 */
export function deleteCliente(id) {
  return apiFetch(`/api/clientes/${id}`, {
    method: "DELETE",
  });
}

/**
 * Cambiar etapa del funnel de un cliente.
 * @param {number} id - ID del cliente.
 * @param {ClienteCambioEtapaRequest} payload
 * @returns {Promise<ClienteResponse>}
 */
export function cambiarEtapaFunnel(id, payload) {
  return apiFetch(`/api/clientes/${id}/etapa-funnel`, {
    method: "PUT",
    body: payload,
  });
}
