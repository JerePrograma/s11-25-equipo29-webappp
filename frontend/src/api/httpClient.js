// src/api/httpClient.js

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

/**
 * Construye un query string a partir de un objeto plano.
 * Ignora valores null/undefined.
 *
 * @param {Record<string, string | number | boolean | null | undefined>} params
 * @returns {string} Ej: "?foo=bar&active=true" o "" si no hay params válidos.
 */
export function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;
    searchParams.append(key, String(value));
  });

  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Wrapper genérico para fetch contra la API del CRM.
 * - Prependa API_URL.
 * - Inyecta Authorization: Bearer <token> si existe en localStorage.
 * - Serializa body a JSON si es objeto.
 *
 * @template T
 * @param {string} path - Path relativo a la API, ej: "/api/clientes".
 * @param {RequestInit & { skipAuth?: boolean }} [options]
 * @returns {Promise<T>}
 */
export async function apiFetch(path, options = {}) {
  const { skipAuth = false, headers, body, method, ...rest } = options;

  const token = !skipAuth ? localStorage.getItem("accessToken") : null;

  const finalHeaders = {
    ...(body && !headers?.["Content-Type"] ? { "Content-Type": "application/json" } : {}),
    ...(headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    method: method ?? (body ? "POST" : "GET"),
    headers: finalHeaders,
    body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
    ...rest,
  });

  if (!response.ok) {
    let errorBody = "";
    try {
      errorBody = await response.text();
    } catch {
      // ignore
    }
    const message = errorBody || response.statusText || "Unknown error";
    const error = new Error(`HTTP ${response.status} - ${message}`);
    // Podés hookear acá manejo global de 401/403 si querés.
    throw error;
  }

  if (response.status === 204) {
    return /** @type {T} */ (null);
  }

  const text = await response.text();

  if (!text) {
    return /** @type {T} */ (null);
  }

  try {
    return JSON.parse(text);
  } catch {
    // Respuesta no-JSON
    return /** @type {T} */ (text);
  }
}
