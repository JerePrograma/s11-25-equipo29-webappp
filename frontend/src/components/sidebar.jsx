import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      className="d-none d-md-flex flex-column bg-light border-end p-3"
      style={{ minWidth: "240px", maxWidth: "280px" }}
    >
      <h5 className="text-primary fw-bold mb-4">Menú</h5>

      <nav className="nav flex-column gap-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/pipelines"
          className={({ isActive }) =>
            `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
          }
        >
          🧩 Pipelines
        </NavLink>

        <NavLink
          to="/contactos"
          className={({ isActive }) =>
            `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
          }
        >
          👥 Contactos
        </NavLink>

        <NavLink
          to="/tareas"
          className={({ isActive }) =>
            `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
          }
        >
          ✅ Tareas
        </NavLink>

        <NavLink
          to="/leads"
          className={({ isActive }) =>
            `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
          }
        >
          🧲 Leads
        </NavLink>
      </nav>

      <div className="mt-4 small text-muted">
        <div className="d-flex justify-content-between mb-1">
          <span>Uso del sistema</span>
          <span>72%</span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Uso del sistema"
          aria-valuenow={72}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-bar bg-primary"
            style={{ width: "72%" }}
          ></div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
