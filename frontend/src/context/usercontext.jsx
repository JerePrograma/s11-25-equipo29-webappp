// src/context/usercontext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  listUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../api/usuarioApi.js";

/**
 * UserContext:
 * - Administra el listado de usuarios del sistema (UsuarioResponse).
 * - Usa UsuarioController.
 */

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
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

  const crearUsuarioHandler = async (nuevo) => {
    const creado = await createUsuario(nuevo);
    setUsers((prev) => [...prev, creado]);
    return creado;
  };

  const editarUsuarioHandler = async (id, cambios) => {
    const actualizado = await updateUsuario(id, cambios);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? actualizado : u))
    );
    return actualizado;
  };

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
  return useContext(UserContext);
}
