// src/api/mensajeApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").MensajeSendRequest} MensajeSendRequest
 * @typedef {import("./types.js").MensajeResponse} MensajeResponse
 */

/**
 * Enviar mensaje saliente en una conversación.
 * @param {MensajeSendRequest} payload
 * @returns {Promise<MensajeResponse>}
 */
export function enviarMensaje(payload) {
  return apiFetch("/api/mensajes", {
    method: "POST",
    body: payload,
  });
}

/**
 * Obtener mensaje por id.
 * @param {number} id
 * @returns {Promise<MensajeResponse>}
 */
export function getMensaje(id) {
  return apiFetch(`/api/mensajes/${id}`);
}

/**
 * Listar mensajes por conversación.
 * @param {number} conversacionId
 * @returns {Promise<MensajeResponse[]>}
 */
export function listMensajesPorConversacion(conversacionId) {
  return apiFetch(`/api/mensajes/conversacion/${conversacionId}`);
}
