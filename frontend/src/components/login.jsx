import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || password.length < 3) {
      alert("Completa email y contraseña (mínimo 3 caracteres)");
      return;
    }

    login({
      email,
      nombre: email.split("@")[0]
    });

    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <section className="p-4 rounded" style={{ width: "420px" }}>
        <h2 className="fw-bold mb-1">Startup CRM</h2>
        <p className="text-muted mb-4">Inicia sesión en tu cuenta</p>

        <hr />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="admin@crm.com / vendedor@crm.com / cualquiera externo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
      </section>
    </div>
  );
};

export default Login;
