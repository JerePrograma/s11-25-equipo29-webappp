import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUsuario } from "../api/usuarioApi.js";

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

      // Ajusta rolId según tu semilla de datos (1 = ADMIN por ahora, por ejemplo)
      const payload = {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        telefono: form.telefono,
        rolId: 1,
      };

      const usuarioCreado = await createUsuario(payload);
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
    <div className="container py-5 d-flex justify-content-center">
      <section
        className="p-4 rounded shadow-sm bg-white w-100"
        style={{ maxWidth: "420px" }}
      >
        <h2 className="fw-bold mb-1 text-center">Startup CRM</h2>
        <p className="text-muted mb-4 text-center">Crea tu cuenta</p>
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

        <form onSubmit={handleSubmit} noValidate>
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
              placeholder="+54 9 11 5555-5555"
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
          <Link to="/login" className="text-primary">
            Inicia sesión aquí
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
