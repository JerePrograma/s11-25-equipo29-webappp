import React from "react";

const Register = () => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <section className="p-4  rounded" style={{ width: "420px" }}>
        <h2 className="fw-bold mb-1">Startup CRM</h2>
        <p className="text-muted mb-4">Crea tu cuenta</p>
        <hr />
        <form action="">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefono</label>
            <input
              type="number"
              className="form-control"
              placeholder="+34 600 123 456"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input type="password" className="form-control" />
          </div>
          <button className="btn btn-primary w-100 mt-2">Crear Cuenta</button>
        </form>
        <hr className="mt-4" />
        <p className="text-center mt-2">
          ¿Ya tienes una cuenta?{" "}
          <a href="#" className="text-primary">
            Inicia sesion aquí
          </a>
        </p>
      </section>
    </div>
  );
};

export default Register;
