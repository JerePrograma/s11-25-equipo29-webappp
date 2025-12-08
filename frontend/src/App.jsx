// src/App.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "./context/authcontext.jsx";

import VerContacto from "./pages/contactos/VerContacto.jsx";
import LeadDetail from "./pages/LeadDetail.jsx";

function App() {
  const { user, logout } = useAuth();

  // Roles
  const rol = user?.role;

  const isAdmin = rol === "admin";
  const isVendedor = rol === "vendedor";

  // ⭐ Visitante REAL = solo cuando role === "externo"
  const isExterno = rol === "externo";

  console.log("🔍 USER:", user);
  console.log("🔍 ROLE:", user?.role);
  console.log("🔍 EXTERNO?:", isExterno);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* 🌟 SIDEBAR — SOLO ADMIN Y VENDEDOR */}
      {!isExterno && (
        <aside
          className="bg-white border-end p-4 d-flex flex-column"
          style={{ width: "260px" }}
        >
          {/* HEADER */}
          <div className="mb-4">
            <h2 className="h4 fw-bold mb-0">CRM</h2>
            <span className="text-muted small">Startup</span>
          </div>

          {/* NAV */}
          <nav className="nav flex-column gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-dark text-start d-flex align-items-center gap-2"
                  : "btn btn-outline-secondary text-start d-flex align-items-center gap-2"
              }
            >
              ▦ Dashboard
            </NavLink>

            <NavLink
              to="/contactos"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-dark text-start d-flex align-items-center gap-2"
                  : "btn btn-outline-secondary text-start d-flex align-items-center gap-2"
              }
            >
              ◎ Contactos
            </NavLink>

            <NavLink
              to="/mensajes"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-dark text-start d-flex align-items-center gap-2"
                  : "btn btn-outline-secondary text-start d-flex align-items-center gap-2"
              }
            >
              ✉ Mensajes
            </NavLink>

            <NavLink
              to="/tareas"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-dark text-start d-flex align-items-center gap-2"
                  : "btn btn-outline-secondary text-start d-flex align-items-center gap-2"
              }
            >
              📝 Tareas
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/usuarios"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-dark text-start d-flex align-items-center gap-2"
                    : "btn btn-outline-secondary text-start d-flex align-items-center gap-2"
                }
              >
                👤 Usuarios
              </NavLink>
            )}

            {isAdmin && (
              <NavLink
                to="/configuracion/vistas"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-dark text-start d-flex align-items-center gap-2"
                    : "btn btn-outline-secondary text-start d-flex align-items-center gap-2"
                }
              >
                ⚙️ Vistas y Etiquetas
              </NavLink>
            )}

            {/* ⭐ NUEVO: ABOUT (solo admin/vendedor en el menú) */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-dark text-start d-flex align-items-center gap-2"
                  : "btn btn-outline-secondary text-start d-flex align-items-center gap-2"
              }
            >
              ℹ Sobre Nosotros
            </NavLink>
          </nav>

          {/* FOOTER DEL SIDEBAR */}
          <div className="mt-auto pt-4 small text-muted">
            {user?.logged ? (
              <button className="btn btn-danger w-100" onClick={logout}>
                Cerrar sesión
              </button>
            ) : (
              <NavLink to="/login" className="w-100">
                <button className="btn btn-dark w-100">Login</button>
              </NavLink>
            )}

            <span className="d-block mt-3">
              Grupo 29® — Todos los derechos reservados.
            </span>
          </div>
        </aside>
      )}

      {/* 🌟 MODO VISITANTE */}
      {isExterno && (
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white shadow-sm">
            <div>
              <h3 className="fw-bold m-0">Bienvenido a Startup CRM</h3>
              <small className="text-muted">Estás navegando en modo visitante</small>
            </div>

            <NavLink to="/login">
              <button className="btn btn-dark px-4 py-2 fw-bold shadow-sm">
                Iniciar sesión
              </button>
            </NavLink>
          </div>

          <div className="p-4">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h4 className="fw-bold">Explorá el CRM</h4>
                <p className="text-muted mb-0">
                  Mirá una demo del panel y las métricas que vas a poder gestionar cuando inicies sesión.
                </p>

                {/* ⭐ NUEVO: BOTÓN ABOUT PARA EXTERNOS */}
                <NavLink to="/about">
                  <button className="btn btn-outline-primary mt-3">
                    ℹ Sobre nosotros
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
