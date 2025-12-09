// src/api/etiquetaApi.js

import { apiFetch, buildQuery } from "./httpClient.js";

/**
 * @typedef {import("./types.js").EtiquetaCreateRequest} EtiquetaCreateRequest
 * @typedef {import("./types.js").EtiquetaResponse} EtiquetaResponse
 * @typedef {import("./types.js").EtiquetaUpdateRequest} EtiquetaUpdateRequest
 * @typedef {import("./types.js").ClienteEtiquetaAssignmentRequest} ClienteEtiquetaAssignmentRequest
 * @typedef {import("./types.js").ClienteEtiquetasUpdateRequest} ClienteEtiquetasUpdateRequest
 * @typedef {import("./types.js").ConversacionEtiquetaAssignmentRequest} ConversacionEtiquetaAssignmentRequest
 */

/**
 * Crear etiqueta.
 * @param {EtiquetaCreateRequest} payload
 * @returns {Promise<EtiquetaResponse>}
 */
export function createEtiqueta(payload) {
  return apiFetch("/api/etiquetas", {
    method: "POST",
    body: payload,
  });
}

/**
 * Listar etiquetas por contexto (aplicaA).
 * @param {"cliente"|"conversacion"|"tarea"} aplicaA
 * @returns {Promise<EtiquetaResponse[]>}
 */
export function listEtiquetas(aplicaA) {
  const query = buildQuery({ aplicaA });
  return apiFetch(`/api/etiquetas${query}`);
}

/**
 * Actualizar etiqueta.
 * @param {number} id
 * @param {EtiquetaUpdateRequest} payload
 * @returns {Promise<EtiquetaResponse>}
 */
export function updateEtiqueta(id, payload) {
  return apiFetch(`/api/etiquetas/${id}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Asignar etiqueta puntual a cliente.
 * @param {ClienteEtiquetaAssignmentRequest} payload
 * @returns {Promise<void>}
 */
export function asignarEtiquetaACliente(payload) {
  return apiFetch("/api/etiquetas/clientes/asignar", {
    method: "POST",
    body: payload,
  });
}

/**
 * Listar etiquetas de un cliente.
 * @param {number} clienteId
 * @returns {Promise<EtiquetaResponse[]>}
 */
export function listEtiquetasDeCliente(clienteId) {
  return apiFetch(`/api/etiquetas/clientes/${clienteId}`);
}

/**
 * Actualizar el conjunto de etiquetas de un cliente.
 * @param {number} clienteId
 * @param {ClienteEtiquetasUpdateRequest} payload
 * @returns {Promise<void>}
 */
export function actualizarEtiquetasDeCliente(clienteId, payload) {
  return apiFetch(`/api/etiquetas/clientes/${clienteId}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Asignar etiqueta puntual a conversación.
 * @param {ConversacionEtiquetaAssignmentRequest} payload
 * @returns {Promise<void>}
 */
export function asignarEtiquetaAConversacion(payload) {
  return apiFetch("/api/etiquetas/conversaciones/asignar", {
    method: "POST",
    body: payload,
  });
}

/**
 * Listar etiquetas de una conversación.
 * @param {number} conversacionId
 * @returns {Promise<EtiquetaResponse[]>}
 */
export function listEtiquetasDeConversacion(conversacionId) {
  return apiFetch(`/api/etiquetas/conversaciones/${conversacionId}`);
}
