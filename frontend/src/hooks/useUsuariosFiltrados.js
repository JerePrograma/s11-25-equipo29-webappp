// src/hooks/useUsuariosFiltrados.js
import { useMemo } from "react";

/**
 * @typedef {import("../api/types.js").UsuarioResponse} UsuarioResponse
 */

/**
 * Filtra usuarios por nombre, email, teléfono o rolNombre.
 *
 * @param {UsuarioResponse[]} usuarios
 * @param {string} busqueda
 * @returns {UsuarioResponse[]}
 */
export function useUsuariosFiltrados(usuarios, busqueda) {
  return useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return usuarios;

    return usuarios.filter((u) => {
      const hay = [
        u.nombre,
        u.email,
        u.telefono,
        u.rolNombre,
        u.estado,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(texto);
    });
  }, [usuarios, busqueda]);
}
