import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1 fw-bold">CRM Grupo 29</p>
        <small className="text-muted">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
