// src/pages/NoAutorizado.jsx
import React from "react";
import { Link } from "react-router-dom";

function NoAutorizado() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-5 fw-bold text-danger">Acceso Denegado</h1>
      <p className="mt-3">No tenés permisos para ver esta sección.</p>

      <Link to="/" className="btn btn-primary mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NoAutorizado;
