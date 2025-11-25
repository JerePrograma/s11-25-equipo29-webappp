// src/components/Login.jsx
import React, { useState } from "react";

// Igual que en Register: configurable por env o default localhost
const API_BASE_URL =
import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8080";
import { Outlet, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("Email y contraseña son obligatorios.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        let message = `Error al iniciar sesión (HTTP ${response.status})`;
        try {
          const body = await response.json();
          if (body?.message) message = body.message;
          else if (body?.error) message = body.error;
        } catch (_) {
          // respuesta no JSON, mantenemos mensaje base
        }
        throw new Error(message);
      }

      const data = await response.json();
      // Esperado: { accessToken, refreshToken, expiresIn }

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      if (data.expiresIn) {
        const expiresAt = Date.now() + data.expiresIn * 1000;
        localStorage.setItem("accessTokenExpiresAt", String(expiresAt));
      }

      setSuccess("Inicio de sesión exitoso.");
      setForm({ email: "", password: "" });

      // TODO: acá podés redirigir al dashboard, por ejemplo:
      // navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <section className="p-4 rounded" style={{ width: "420px" }}>
        <h2 className="fw-bold mb-1">Startup CRM</h2>
        <p className="text-muted mb-4">Inicia sesión en tu cuenta</p>

        <hr />

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success py-2" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <hr className="mt-4" />

        <p className="text-center text-muted" style={{ fontSize: "0.9rem" }}>
          Demo: usa un usuario registrado con contraseña válida (mín. 6
          caracteres)
        </p>

        <p className="text-center mt-2">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-primary">
            <Link to='/register'>
            Regístrate aquí
            </Link>
            
          </a>
          {/* TODO: reemplazar por <Link to="/register"> si usas react-router */}
        </p>
      </section>
    </div>
  );
};

export default Login;
