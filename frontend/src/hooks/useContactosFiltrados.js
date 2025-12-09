// src/hooks/useContactosFiltrados.js
import { useMemo } from "react";

/**
 * @typedef {import("../api/types.js").ClienteResponse} ClienteResponse
 */

/**
 * Filtra contactos por texto de búsqueda simple.
 * Busca en: nombre, email, telefono, origen, propietarioNombre.
 *
 * @param {ClienteResponse[]} contactos
 * @param {string} textoBusqueda
 * @returns {ClienteResponse[]}
 */
export function useContactosFiltrados(contactos, textoBusqueda) {
  return useMemo(() => {
    const texto = (textoBusqueda || "").trim().toLowerCase();
    if (!texto) return contactos;

    return contactos.filter((c) => {
      const hay = [
        c.nombre,
        c.email,
        c.telefono,
        c.origen,
        c.propietarioNombre,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(texto);
    });
  }, [contactos, textoBusqueda]);
}
