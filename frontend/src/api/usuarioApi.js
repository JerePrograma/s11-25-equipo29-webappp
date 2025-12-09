// src/api/usuarioApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").UsuarioCreateRequest} UsuarioCreateRequest
 * @typedef {import("./types.js").UsuarioResponse} UsuarioResponse
 * @typedef {import("./types.js").UsuarioUpdateRequest} UsuarioUpdateRequest
 */

/**
 * Crear usuario.
 * @param {UsuarioCreateRequest} payload
 * @returns {Promise<UsuarioResponse>}
 */
export function createUsuario(payload) {
  return apiFetch("/api/usuarios", {
    method: "POST",
    body: payload,
  });
}

/**
 * Obtener usuario por id.
 * @param {number} id
 * @returns {Promise<UsuarioResponse>}
 */
export function getUsuario(id) {
  return apiFetch(`/api/usuarios/${id}`);
}

/**
 * Listar todos los usuarios.
 * @returns {Promise<UsuarioResponse[]>}
 */
export function listUsuarios() {
  return apiFetch("/api/usuarios");
}

/**
 * Actualizar usuario.
 * @param {number} id
 * @param {UsuarioUpdateRequest} payload
 * @returns {Promise<UsuarioResponse>}
 */
export function updateUsuario(id, payload) {
  return apiFetch(`/api/usuarios/${id}`, {
    method: "PUT",
    body: payload,
  });
}

/**
 * Eliminar usuario.
 * @param {number} id
 * @returns {Promise<void>}
 */
export function deleteUsuario(id) {
  return apiFetch(`/api/usuarios/${id}`, {
    method: "DELETE",
  });
}
