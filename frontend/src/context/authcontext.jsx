// src/context/authcontext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { listUsuarios } from "../api/usuarioApi.js";

/**
 * AuthContext:
 * - NO hace el login HTTP (eso lo hace Login.jsx + authApi.login).
 * - Recibe email/nombre ya autenticado y resuelve el usuario real contra /api/usuarios.
 * - Guarda { id, nombre, email, role, logged } en localStorage.
 */

const AuthContext = createContext(null);
const STORAGE_KEY = "startupcrm_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
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
   * Usa /api/usuarios para mapear email → UsuarioResponse (id, rol, etc.).
   */
  const login = async ({ email, nombre }) => {
    const normalizado = (email || "").trim().toLowerCase();
    if (!normalizado) return;

    try {
      const usuarios = await listUsuarios();
      const encontrado = usuarios.find(
        (u) => (u.email || "").toLowerCase() === normalizado
      );

      if (encontrado) {
        setUser({
          id: encontrado.id,
          nombre: encontrado.nombre,
          email: encontrado.email,
          role: (encontrado.rolNombre || "").toLowerCase(), // "admin", "vendedor", etc.
          logged: true,
        });
        return;
      }
    } catch (err) {
      console.warn(
        "No se pudo obtener el usuario desde backend. Fallback a usuario externo.",
        err
      );
    }

    // Fallback: visitante/externo
    setUser({
      id: null,
      nombre: nombre || normalizado.split("@")[0] || "Usuario",
      email: normalizado,
      role: "externo",
      logged: true,
    });
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
  return useContext(AuthContext);
}
