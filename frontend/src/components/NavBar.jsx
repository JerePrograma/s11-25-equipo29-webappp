import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          CRM Grupo 29
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="mainNav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                Sobre nosotros
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
