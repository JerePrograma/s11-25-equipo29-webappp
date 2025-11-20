import React from "react";

const Login = () => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <section className="p-4  rounded" style={{ width: "420px" }}>
        <h2 className="fw-bold mb-1">Startup CRM</h2>
        <p className="text-muted mb-4">Inicia sesión en tu cuenta</p>

        <hr />

        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
            />
          </div>

          <button className="btn btn-primary w-100 mt-2">
            Iniciar Sesión
          </button>
        </form>

        <hr className="mt-4" />

        <p className="text-center text-muted" style={{ fontSize: "0.9rem" }}>
          Demo: usa cualquier email y contraseña (mín 6 caracteres)
        </p>

        <p className="text-center mt-2">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-primary">
            Regístrate aquí
          </a>
        </p>
      </section>
    </div>
  );
};

export default Login;
