// src/context/rolescontext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  listRoles,
  createRol,
  updateRol,
} from "../api/rolApi.js";

/**
 * @typedef {import("../api/types.js").RolResponse} RolResponse
 * @typedef {import("../api/types.js").RolCreateRequest} RolCreateRequest
 * @typedef {import("../api/types.js").RolUpdateRequest} RolUpdateRequest
 */

const RolesContext = createContext(
  /** @type {{
    roles: RolResponse[];
    loading: boolean;
    error: string | null;
    recargar: () => Promise<void>;
    crearRol: (nuevo: RolCreateRequest) => Promise<RolResponse>;
    editarRol: (id: number, cambios: RolUpdateRequest) => Promise<RolResponse>;
  } | null} */ (null)
);

/**
 * RolesProvider:
 * - Mantiene catálogo de roles (id, nombre, descripción, permisosJson).
 * - Se puede reutilizar en combos, administración de permisos, etc.
 */
export function RolesProvider({ children }) {
  /** @type {[RolResponse[], Function]} */
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(/** @type {string | null} */ (null));

  const cargarRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      /** @type {RolResponse[]} */
      const data = await listRoles();
      setRoles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar roles", err);
      setError("No se pudieron cargar los roles.");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRoles();
  }, []);

  /**
   * @param {RolCreateRequest} nuevo
   * @returns {Promise<RolResponse>}
   */
  const crearRolHandler = async (nuevo) => {
    const creado = await createRol(nuevo);
    setRoles((prev) => [...prev, creado]);
    return creado;
  };

  /**
   * @param {number} id
   * @param {RolUpdateRequest} cambios
   * @returns {Promise<RolResponse>}
   */
  const editarRolHandler = async (id, cambios) => {
    const actualizado = await updateRol(id, cambios);
    setRoles((prev) => prev.map((r) => (r.id === id ? actualizado : r)));
    return actualizado;
  };

  return (
    <RolesContext.Provider
      value={{
        roles,
        loading,
        error,
        recargar: cargarRoles,
        crearRol: crearRolHandler,
        editarRol: editarRolHandler,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
}

export function useRoles() {
  const ctx = useContext(RolesContext);
  if (!ctx) {
    throw new Error("useRoles debe usarse dentro de RolesProvider");
  }
  return ctx;
}
