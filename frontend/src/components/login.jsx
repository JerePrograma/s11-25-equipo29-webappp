import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";
import { login as apiLogin } from "../api/authApi.js";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || password.length < 3) {
      setError("Completa email y contraseña (mínimo 3 caracteres).");
      return;
    }

    try {
      setSubmitting(true);

      // Llamada real al backend
      const authResponse = await apiLogin({ email, password });

      // Guardamos tokens para httpClient
      localStorage.setItem("accessToken", authResponse.accessToken);
      localStorage.setItem("refreshToken", authResponse.refreshToken);

      // Mantenemos la lógica actual de tu AuthContext (role derivado del email, etc.)
      login({
        email,
        nombre: email.split("@")[0],
      });

      navigate("/");
    } catch (err) {
      setError(
        err?.message || "No se pudo iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <section
        className="p-4 rounded shadow-sm bg-white w-100"
        style={{ maxWidth: "420px" }}
      >
        <h2 className="fw-bold mb-1 text-center">Startup CRM</h2>
        <p className="text-muted mb-4 text-center">
          Inicia sesión en tu cuenta
        </p>

        <hr />

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@startupcrm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            className="btn btn-primary w-100 mt-2"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <hr className="mt-4" />
      </section>
    </div>
  );
};

export default Login;
