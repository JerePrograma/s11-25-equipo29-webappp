// src/context/authcontext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { listUsuarios } from "../api/usuarioApi.js";

/**
 * @typedef {import("../api/types.js").UsuarioResponse} UsuarioResponse
 */

/**
 * @typedef {Object} AuthUser
 * @property {number|null} id
 * @property {string} nombre
 * @property {string} email
 * @property {string} role  // "admin", "vendedor", "externo", etc.
 * @property {boolean} logged
 */

const AuthContext = createContext(
  /** @type {{ user: AuthUser | null, login: (args: {email: string, nombre?: string}) => Promise<void>, logout: () => void } | null} */ (
    null
  )
);

const STORAGE_KEY = "startupcrm_user";

export function AuthProvider({ children }) {
  /** @type {[AuthUser | null, Function]} */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? /** @type {AuthUser} */ (JSON.parse(saved)) : null;
  });

  // Persistencia en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  /**
   * login({ email, nombre })
   * Se llama DESPUÉS de un login exitoso contra /api/login.
   * Usa /api/usuarios para mapear email → UsuarioResponse.
   * @param {{ email: string, nombre?: string }} args
   */
  const login = async ({ email, nombre }) => {
    const normalizado = (email || "").trim().toLowerCase();
    if (!normalizado) return;

    try {
      /** @type {UsuarioResponse[]} */
      const usuarios = await listUsuarios();
      const encontrado = usuarios.find(
        (u) => (u.email || "").toLowerCase() === normalizado
      );

      if (encontrado) {
        /** @type {AuthUser} */
        const authUser = {
          id: encontrado.id,
          nombre: encontrado.nombre,
          email: encontrado.email,
          role: (encontrado.rolNombre || "").toLowerCase(),
          logged: true,
        };
        setUser(authUser);
        return;
      }
    } catch (err) {
      console.warn(
        "No se pudo obtener el usuario desde backend. Fallback a usuario externo.",
        err
      );
    }

    // Fallback: visitante/externo
    /** @type {AuthUser} */
    const externo = {
      id: null,
      nombre: nombre || normalizado.split("@")[0] || "Usuario",
      email: normalizado,
      role: "externo",
      logged: true,
    };
    setUser(externo);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
}
