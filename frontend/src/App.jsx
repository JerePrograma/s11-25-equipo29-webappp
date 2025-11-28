// src/App.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <aside
        className="bg-white border-end p-4 d-flex flex-column "
        style={{ width: "260px" }}
      >
        <div className="mb-4">
          <h2 className="h4 fw-bold mb-0">CRM</h2>
          <span className="text-muted small">Startup</span>
        </div>

        <nav className="nav flex-column gap-2">

          {/* Dashboard */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "btn btn-dark text-start d-flex align-items-center gap-2 sidebar-btn"
                : "btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
            }
          >
            <span className="fw-bold">▦</span>
            <span>Dashboard</span>
          </NavLink>

          {/* Contactos */}
          <NavLink
            to="/contactos"
            className={({ isActive }) =>
              isActive
                ? "btn btn-dark text-start d-flex align-items-center gap-2 sidebar-btn"
                : "btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
            }
          >
            <span className="fw-bold">◎</span>
            <span>Contactos</span>
          </NavLink>

          {/* Mensajes */}
          <NavLink
            to="/mensajes"
            className={({ isActive }) =>
              isActive
                ? "btn btn-dark text-start d-flex align-items-center gap-2 sidebar-btn"
                : "btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
            }
          >
            <span className="fw-bold">✉</span>
            <span>Mensajes</span>
          </NavLink>

          {/* Configuración */}
          <NavLink
            to="/configuracion"
            className={({ isActive }) =>
              isActive
                ? "btn btn-dark text-start d-flex align-items-center gap-2 sidebar-btn"
                : "btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
            }
          >
            <span className="fw-bold">⚙</span>
            <span>Configuración</span>
          </NavLink>

          {/* Usuarios */}
          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              isActive
                ? "btn btn-dark text-start d-flex align-items-center gap-2 sidebar-btn"
                : "btn btn-outline-secondary text-start d-flex align-items-center gap-2 sidebar-btn"
            }
          >
            <span className="fw-bold">👤</span>
            <span>Usuarios</span>
          </NavLink>
        </nav>

        <div className="mt-auto pt-4 small text-muted">
          <div className="d-flex gap-2 mb-3">
            <NavLink to="/login" className="w-100">
              <button className="btn btn-dark text-center align-items-center gap-2 sidebar-btn w-100">
                Login
              </button>
            </NavLink>
          </div>

          <span> Grupo 29® — Todos los derechos reservados. </span>
        </div>
      </aside>

      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
