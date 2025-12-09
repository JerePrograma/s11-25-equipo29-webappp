import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-3">
      <div className="container text-center">
        <p className="mb-1 fw-bold">Startup CRM · Grupo 29</p>
        <small className="text-muted d-block">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
