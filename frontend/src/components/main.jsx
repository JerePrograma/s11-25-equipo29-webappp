import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="container py-5">
      <div className="row align-items-center gy-4">
        <div className="col-12 col-lg-6">
          <h1 className="fw-bold mb-3 text-primary">
            Bienvenido al CRM Grupo 29
          </h1>

          <p className="lead text-muted mb-4">
            Gestioná contactos, tareas y oportunidades en un solo lugar, sin
            pelearte con el sistema.
          </p>

          <div className="d-flex flex-wrap gap-2">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Ir al Panel
            </Link>
            <Link to="/contactos" className="btn btn-outline-primary btn-lg">
              Ver Contactos
            </Link>
          </div>
        </div>

        <div className="col-12 col-lg-6 text-center">
          <img
            src="https://s1.1zoom.me/b5867/218/Sweets_Candy_Lollipop_Many_White_background_543314_1920x1080.jpg"
            alt="Ilustración CRM"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </main>
  );
}

export default Main;
