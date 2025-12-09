// src/api/etapaFunnelApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").EtapaFunnelCreateRequest} EtapaFunnelCreateRequest
 * @typedef {import("./types.js").EtapaFunnelResponse} EtapaFunnelResponse
 * @typedef {import("./types.js").EtapaFunnelUpdateRequest} EtapaFunnelUpdateRequest
 */

/**
 * Crear etapa de funnel.
 * @param {EtapaFunnelCreateRequest} payload
 * @returns {Promise<EtapaFunnelResponse>}
 */
export function createEtapaFunnel(payload) {
  return apiFetch("/api/etapas-funnel", {
    method: "POST",
    body: payload,
  });
}

/**
 * Listar todas las etapas de funnel.
 * @returns {Promise<EtapaFunnelResponse[]>}
 */
export function listEtapasFunnel() {
  return apiFetch("/api/etapas-funnel");
}

/**
 * Obtener etapa de funnel por id.
 * @param {number} id
 * @returns {Promise<EtapaFunnelResponse>}
 */
export function getEtapaFunnel(id) {
  return apiFetch(`/api/etapas-funnel/${id}`);
}

/**
 * Actualizar etapa de funnel.
 * @param {number} id
 * @param {EtapaFunnelUpdateRequest} payload
 * @returns {Promise<EtapaFunnelResponse>}
 */
export function updateEtapaFunnel(id, payload) {
  return apiFetch(`/api/etapas-funnel/${id}`, {
    method: "PUT",
    body: payload,
  });
}
