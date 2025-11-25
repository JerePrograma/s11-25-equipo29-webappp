// src/components/Register.jsx
import React, { useState } from "react";

// Ajusta esto según tu setup (Vite/CRA)
const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8080";
import { Outlet, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!form.email || !form.password || !form.nombre) {
      setError("Nombre, email y contraseña son obligatorios.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          password: form.password,
          telefono: form.telefono,
          // Ajusta este rolId al que tengas en tu BD
          rolId: 1,
        }),
      });

      if (!response.ok) {
        let message = `Error en el registro (HTTP ${response.status})`;
        try {
          const body = await response.json();
          if (body?.message) message = body.message;
          else if (body?.error) message = body.error;
        } catch (_) {
          // respuesta no JSON, mantenemos el mensaje por defecto
        }
        throw new Error(message);
      }

      const usuarioCreado = await response.json();
      console.log("Usuario creado:", usuarioCreado);

      setSuccess("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
      });
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
        <p className="text-muted mb-4">Crea tu cuenta</p>
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
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

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
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              className="form-control"
              placeholder="+34 600 123 456"
              value={form.telefono}
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

          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <hr className="mt-4" />
        <p className="text-center mt-2">
          ¿Ya tienes una cuenta?{" "}
          <a href="#" className="text-primary">
            <Link to='/login'>
            Inicia sesion aquí
            </Link>
          </a>
        </p>
      </section>
    </div>
  );
};

export default Register;
