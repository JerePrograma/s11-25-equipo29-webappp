// src/api/authApi.js

import { apiFetch } from "./httpClient.js";

/**
 * @typedef {import("./types.js").AuthLoginRequest} AuthLoginRequest
 * @typedef {import("./types.js").AuthResponse} AuthResponse
 */

/**
 * Login de usuario.
 *
 * @param {AuthLoginRequest} payload
 * @returns {Promise<AuthResponse>}
 */
export function login(payload) {
  return apiFetch("/api/login", {
    method: "POST",
    body: payload,
    skipAuth: true, // no hay token antes de loguearse
  });
}
