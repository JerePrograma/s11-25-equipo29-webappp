// src/context/usercontext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  listUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../api/usuarioApi.js";

/**
 * @typedef {import("../api/types.js").UsuarioResponse} UsuarioResponse
 * @typedef {import("../api/types.js").UsuarioCreateRequest} UsuarioCreateRequest
 * @typedef {import("../api/types.js").UsuarioUpdateRequest} UsuarioUpdateRequest
 */

const UserContext = createContext(
  /** @type {{
    users: UsuarioResponse[];
    loading: boolean;
    error: string | null;
    recargar: () => Promise<void>;
    crearUsuario: (nuevo: UsuarioCreateRequest) => Promise<UsuarioResponse>;
    editarUsuario: (id: number, cambios: UsuarioUpdateRequest) => Promise<UsuarioResponse>;
    eliminarUsuario: (id: number) => Promise<void>;
  } | null} */ (null)
);

/**
 * UserContext:
 * - Administra el listado de usuarios del sistema (UsuarioResponse).
 * - Usa UsuarioController.
 */
export function UserProvider({ children }) {
  /** @type {[UsuarioResponse[], Function]} */
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(/** @type {string | null} */ (null));

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      /** @type {UsuarioResponse[]} */
      const data = await listUsuarios();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
      setError("No se pudieron cargar los usuarios.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  /**
   * @param {UsuarioCreateRequest} nuevo
   * @returns {Promise<UsuarioResponse>}
   */
  const crearUsuarioHandler = async (nuevo) => {
    const creado = await createUsuario(nuevo);
    setUsers((prev) => [...prev, creado]);
    return creado;
  };

  /**
   * @param {number} id
   * @param {UsuarioUpdateRequest} cambios
   * @returns {Promise<UsuarioResponse>}
   */
  const editarUsuarioHandler = async (id, cambios) => {
    const actualizado = await updateUsuario(id, cambios);
    setUsers((prev) => prev.map((u) => (u.id === id ? actualizado : u)));
    return actualizado;
  };

  /**
   * @param {number} id
   */
  const eliminarUsuarioHandler = async (id) => {
    await deleteUsuario(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        recargar: cargarUsuarios,
        crearUsuario: crearUsuarioHandler,
        editarUsuario: editarUsuarioHandler,
        eliminarUsuario: eliminarUsuarioHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUsers debe usarse dentro de UserProvider");
  }
  return ctx;
}
