import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold mb-3 text-primary">
            Bienvenidos al CRM Grupo 29
          </h1>
          <p className="lead text-muted">
            Gestioná tus contactos, tareas y oportunidades de forma simple y rápida.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg me-2">
            Ir al Panel
          </Link>
          <Link to="/contactos" className="btn btn-outline-primary btn-lg">
            Ver Contactos
          </Link>
          <Route
         path="about"
        element={
          <ProtectedRoute roles={["admin", "vendedor", "externo"]}>
            <About />
          </ProtectedRoute>
        }
      />

        </div>

        <div className="col-md-6 text-center">
          <img
            src="https://s1.1zoom.me/b5867/218/Sweets_Candy_Lollipop_Many_White_background_543314_1920x1080.jpg"
            alt="Imagen ilustrativa"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </main>
  );
}

export default Main;
