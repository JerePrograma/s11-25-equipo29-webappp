// src/context/usercontext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

// 🌐 BASE URL del backend real (cuando exista)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 👉 RUTA REAL
const USERS_API_URL = `${API_BASE_URL}/api/users`;

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  // -------------------------------------------------------
  // ⭐ CARGAR USUARIOS (fetch real + fallback sin romper)
  // -------------------------------------------------------
  useEffect(() => {
    async function cargarUsuarios() {
      try {
        // Si no hay backend → no intentamos fetch
        if (!API_BASE_URL) {
          console.warn("⚠️ No hay backend → usuarios vacíos");
          setUsers([]);
          return;
        }

        const res = await fetch(USERS_API_URL);

        if (!res.ok) throw new Error("Backend no disponible");

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);

      } catch (err) {
        console.warn("⚠️ No se pudo cargar usuarios → usando []");
        setUsers([]); // fallback seguro
      }
    }

    cargarUsuarios();
  }, []);

  // -------------------------------------------------------
  // ➕ CREAR USUARIO
  // -------------------------------------------------------
  async function crearUsuario(nuevo) {
    const userConId = { ...nuevo, id: Date.now() };

    try {
      await fetch(USERS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userConId),
      });
    } catch (err) {
      console.warn("⚠️ Backend no disponible → usuario solo en memoria");
    }

    setUsers((prev) => [...prev, userConId]);
  }

  // -------------------------------------------------------
  // ✏ EDITAR USUARIO
  // -------------------------------------------------------
  async function editarUsuario(id, cambios) {
    const original = users.find((u) => u.id === id);
    if (!original) return;

    const actualizado = { ...original, ...cambios };

    try {
      await fetch(`${USERS_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });
    } catch (err) {
      console.warn("⚠️ Backend no disponible → edición solo en memoria");
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? actualizado : u))
    );
  }

  // -------------------------------------------------------
  // 🗑 ELIMINAR USUARIO
  // -------------------------------------------------------
  async function eliminarUsuario(id) {
    try {
      await fetch(`${USERS_API_URL}/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("⚠️ Backend no disponible → borrado solo en UI");
    }

    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // -------------------------------------------------------
  // EXPORTAR CONTEXTO
  // -------------------------------------------------------
  return (
    <UserContext.Provider
      value={{
        users,
        crearUsuario,
        editarUsuario,
        eliminarUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}
