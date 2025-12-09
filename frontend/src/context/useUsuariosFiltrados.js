// src/hooks/useRolesFiltrados.js
import { useMemo } from "react";

/**
 * @typedef {import("../api/types.js").RolResponse} RolResponse
 */

/**
 * Filtra roles por nombre o descripción, y opcionalmente por contenido del JSON.
 *
 * @param {RolResponse[]} roles
 * @param {string} busqueda
 * @returns {RolResponse[]}
 */
export function useRolesFiltrados(roles, busqueda) {
  return useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return roles;

    return roles.filter((r) => {
      const hay = [
        r.nombre,
        r.descripcion,
        r.permisosJson,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(texto);
    });
  }, [roles, busqueda]);
}
