import React from "react";
import { NavLink } from "react-router-dom";

function sidebar() {
  return (
    <aside
      className="d-none d-md-block bg-light border-end vh-100 p-3"
      style={{ width: "250px" }}
    >
      <h5 className="text-primary fw-bold mb-4">Menú</h5>

      <nav className="nav flex-column">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/pipelines"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          🧩 Pipelines
        </NavLink>

        <NavLink
          to="/contactos"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          👥 Contactos
        </NavLink>

        <NavLink
          to="/tareas"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          ✅ Tareas
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          ⚙️ Configuración
        </NavLink>
      </nav>

      <div className="mt-4 small text-muted">
        <div className="d-flex justify-content-between">
          <span>Uso del sistema</span>
          <span>72%</span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Uso del sistema"
          aria-valuenow="72"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="progress-bar bg-primary" style={{ width: "72%" }}></div>
        </div>
      </div>
    </aside>
  );
}

export default sidebar;

