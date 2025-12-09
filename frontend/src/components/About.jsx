import React from "react";

export default function About() {
  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Sobre Nosotros</h2>
          </div>

          <p className="lead text-muted">
            Bienvenido a Startup CRM. Diseñamos herramientas simples y ágiles para
            gestionar contactos, tareas y equipos de venta sin fricción.
          </p>

          <p className="text-muted">
            Nuestro objetivo es ayudarte a cerrar más oportunidades, con una interfaz
            moderna, clara y confiable. Gracias por usar nuestro CRM — Equipo 29.
          </p>
        </div>
      </div>
    </section>
  );
}
