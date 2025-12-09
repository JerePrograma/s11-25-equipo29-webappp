// src/api/plantillaApi.js

import { apiFetch, buildQuery } from "./httpClient.js";

/**
 * @typedef {import("./types.js").PlantillaCreateRequest} PlantillaCreateRequest
 * @typedef {import("./types.js").PlantillaResponse} PlantillaResponse
 * @typedef {import("./types.js").PlantillaUpdateRequest} PlantillaUpdateRequest
 */

/**
 * Crear plantilla de comunicación.
 * @param {PlantillaCreateRequest} payload
 * @returns {Promise<PlantillaResponse>}
 */
export function createPlantilla(payload) {
  return apiFetch("/api/plantillas", {
    method: "POST",
    body: payload,
  });
}

/**
 * Obtener plantilla por id.
 * @param {number} id
 * @returns {Promise<PlantillaResponse>}
 */
export function getPlantilla(id) {
  return apiFetch(`/api/plantillas/${id}`);
}

/**
 * Listar plantillas por canal.
 * @param {"whatsapp"|"email"} canal
 * @returns {Promise<PlantillaResponse[]>}
 */
export function listPlantillasPorCanal(canal) {
  const query = buildQuery({ canal });
  return apiFetch(`/api/plantillas${query}`);
}

/**
 * Actualizar plantilla.
 * @param {number} id
 * @param {PlantillaUpdateRequest} payload
 * @returns {Promise<PlantillaResponse>}
 */
export function updatePlantilla(id, payload) {
  return apiFetch(`/api/plantillas/${id}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Eliminar plantilla.
 * @param {number} id
 * @returns {Promise<void>}
 */
export function deletePlantilla(id) {
  return apiFetch(`/api/plantillas/${id}`, {
    method: "DELETE",
  });
}
