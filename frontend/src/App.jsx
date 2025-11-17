// src/App.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      
      {/* Sidebar */}
      <aside
        className="bg-white border-end p-4 d-flex flex-column"
        style={{ width: "260px" }}
      >

        {/* Logo */}
        <div className="mb-4">
          <h2 className="h4 fw-bold mb-0">CRM</h2>
          <span className="text-muted small">Startup</span>
        </div>

        {/* Navegación */}
        <nav className="nav flex-column gap-2">

          {/* Dashboard */}
          <Link
            to="/"
            className="btn btn-dark text-start d-flex align-items-center gap-2 sidebar-btn"
          >
            <span className="fw-bold">▦</span>
            <span>Dashboard</span>
          </Link>

          {/* Contactos */}
          <Link
            to="/contactos"
            className="btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
          >
            <span className="fw-bold">◎</span>
            <span>Contactos</span>
          </Link>

          {/* Mensajes */}
          <Link
            to="/mensajes"
            className="btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
          >
            <span className="fw-bold">✉</span>
            <span>Mensajes</span>
          </Link>

          {/* Configuración */}
          <Link
            to="/configuracion"
            className="btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
          >
            <span className="fw-bold">⚙</span>
            <span>Configuración</span>
          </Link>

        </nav>

        {/* Footer del sidebar */}
        <div className="mt-auto pt-4 small text-muted">
          <span> Grupo 29® — Todos los derechos reservados. </span>
        </div>

      </aside>

      {/* Contenido principal */}
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>

    </div>
  );
}

export default App;
