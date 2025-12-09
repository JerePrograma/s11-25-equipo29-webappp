// src/App.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "./context/authcontext.jsx";
import "./styles/App.css";

function App() {
  const { user, logout } = useAuth();

  const rol = user?.role;
  const isAdmin = rol === "admin";
  const isVendedor = rol === "vendedor"; // preparado por si lo usás en otros lados
  const isExterno = rol === "externo";

  console.log("🔍 USER:", user);
  console.log("🔍 ROLE:", user?.role);
  console.log("🔍 EXTERNO?:", isExterno);

  // ==== MODO VISITANTE (sin sidebar) ====
  if (isExterno) {
    return (
      <div className="app-visitor">
        <header className="visitor-header">
          <div>
            <h1 className="visitor-title">Startup CRM</h1>
            <p className="visitor-subtitle">
              Estás navegando en modo visitante
            </p>
          </div>

          <NavLink to="/login" className="visitor-login-link">
            <button className="btn btn-dark visitor-login-btn">
              Iniciar sesión
            </button>
          </NavLink>
        </header>

        <main className="app-main">
          <section className="visitor-intro card mb-4">
            <div className="card-body">
              <h2 className="fw-bold mb-2">Explorá el CRM</h2>
              <p className="text-muted mb-3">
                Mirá una demo del panel y las métricas que vas a poder gestionar
                cuando inicies sesión.
              </p>

              <NavLink to="/about">
                <button className="btn btn-outline-primary">
                  ℹ Sobre nosotros
                </button>
              </NavLink>
            </div>
          </section>

          <section className="app-outlet">
            <Outlet />
          </section>
        </main>
      </div>
    );
  }

  // ==== MODO APP (admin / vendedor / otros roles internos) ====
  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className="app-sidebar">
        {/* HEADER SIDEBAR */}
        <div className="sidebar-header">
          <h2 className="sidebar-logo">CRM</h2>
          <span className="sidebar-subtitle">Startup</span>
        </div>

        {/* NAV */}
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `sidebar-link sidebar-btn btn ${
                isActive ? "btn-dark" : "btn-outline-secondary"
              }`
            }
          >
            ▦ Dashboard
          </NavLink>

          <NavLink
            to="/contactos"
            className={({ isActive }) =>
              `sidebar-link sidebar-btn btn ${
                isActive ? "btn-dark" : "btn-outline-secondary"
              }`
            }
          >
            ◎ Contactos
          </NavLink>

          <NavLink
            to="/mensajes"
            className={({ isActive }) =>
              `sidebar-link sidebar-btn btn ${
                isActive ? "btn-dark" : "btn-outline-secondary"
              }`
            }
          >
            ✉ Mensajes
          </NavLink>

          <NavLink
            to="/tareas"
            className={({ isActive }) =>
              `sidebar-link sidebar-btn btn ${
                isActive ? "btn-dark" : "btn-outline-secondary"
              }`
            }
          >
            📝 Tareas
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/usuarios"
              className={({ isActive }) =>
                `sidebar-link sidebar-btn btn ${
                  isActive ? "btn-dark" : "btn-outline-secondary"
                }`
              }
            >
              👤 Usuarios
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/configuracion/vistas"
              className={({ isActive }) =>
                `sidebar-link sidebar-btn btn ${
                  isActive ? "btn-dark" : "btn-outline-secondary"
                }`
              }
            >
              ⚙️ Vistas y Etiquetas
            </NavLink>
          )}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `sidebar-link sidebar-btn btn ${
                isActive ? "btn-dark" : "btn-outline-secondary"
              }`
            }
          >
            ℹ Sobre Nosotros
          </NavLink>
        </nav>

        {/* FOOTER SIDEBAR */}
        <div className="sidebar-footer">
          {user?.logged ? (
            <button className="btn btn-danger w-100" onClick={logout}>
              Cerrar sesión
            </button>
          ) : (
            <NavLink to="/login" className="w-100 d-block">
              <button className="btn btn-dark w-100">Login</button>
            </NavLink>
          )}

          <span className="sidebar-copy">
            Grupo 29® — Todos los derechos reservados.
          </span>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="app-main">
        <section className="app-outlet">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default App;
