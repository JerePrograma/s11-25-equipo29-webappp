// src/context/authcontext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// 🌐 URL BASE del backend real (si existe)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Endpoint real del login
const LOGIN_API_URL = `${API_BASE_URL}/api/login`;

export function AuthProvider({ children }) {
  // ---------------------------------------
  // ESTADO DE USUARIO (persistente)
  // ---------------------------------------
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Guardar / limpiar sesión en localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ---------------------------------------
  // ⭐ LOGIN REAL — CON FALLBACK SEGURO
  // ---------------------------------------
  const login = async ({ email, nombre }) => {
    const normalizado = email?.trim().toLowerCase();
    if (!normalizado) return;

    try {
      // Si no hay backend definido, no intentamos llamar
      if (!API_BASE_URL) {
        console.warn("⚠️ No hay backend → Login externo temporal");
        setUser({
          nombre: nombre ?? "Visitante",
          email: normalizado,
          role: "externo",
          logged: true,
        });
        return;
      }

      const res = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizado }),
      });

      if (!res.ok) throw new Error("No se pudo iniciar sesión");

      const data = await res.json();

      // Espera formato backend:
      // { nombre, email, role }
      setUser({
        nombre: data.nombre ?? nombre ?? "Usuario",
        email: data.email ?? normalizado,
        role: data.role ?? "externo",
        logged: true,
      });

    } catch (err) {
      console.warn("⚠️ Backend no disponible → Login externo");

      // Fallback suave para no romper el CRM
      setUser({
        nombre: nombre ?? "Visitante",
        email: normalizado,
        role: "externo",
        logged: true,
      });
    }
  };

  // ---------------------------------------
  // LOGOUT
  // ---------------------------------------
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, API_BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
