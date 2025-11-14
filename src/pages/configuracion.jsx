// src/pages/configuracion.jsx
import React from "react";

function Configuracion() {
  return (
    <div className="container-fluid py-4">
      
      {/* Título */}
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Configuración</h1>
        <p className="text-muted mb-0">
          Personalizá tu CRM según las necesidades de tu startup.
        </p>
      </header>

      <div className="row g-4">

        {/* Perfil de la startup */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Perfil de la startup</h5>
              <p className="text-muted small mb-3">
                Información básica que se muestra en el sistema y en las comunicaciones.
              </p>

              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre de la startup</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Grupo 29 CRM"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email de contacto</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="contacto@startup.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Industria</label>
                  <select className="form-select">
                    <option>Cross-Industry</option>
                    <option>Software / SaaS</option>
                    <option>Servicios profesionales</option>
                    <option>E-commerce</option>
                    <option>Educación</option>
                  </select>
                </div>

                <button type="button" className="btn btn-dark btn-sm">
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Canales de comunicación */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Canales de comunicación</h5>
              <p className="text-muted small mb-3">
                Activá o desactivá los canales que utiliza tu equipo para hablar con los clientes.
              </p>

              <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" id="canalWhatsapp" defaultChecked />
                <label className="form-check-label" htmlFor="canalWhatsapp">
                  WhatsApp integrado
                </label>
              </div>

              <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" id="canalEmail" defaultChecked />
                <label className="form-check-label" htmlFor="canalEmail">
                  Email (SMTP / Gmail)
                </label>
              </div>

              <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" id="canalLlamadas" />
                <label className="form-check-label" htmlFor="canalLlamadas">
                  Registro de llamadas
                </label>
              </div>

              <button type="button" className="btn btn-outline-secondary btn-sm mt-3">
                Configurar integraciones avanzadas
              </button>
            </div>
          </div>
        </div>

        {/* Preferencias del sistema */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Preferencias del sistema</h5>

              <div className="mb-3">
                <label className="form-label">Zona horaria</label>
                <select className="form-select">
                  <option>GMT-3 — Buenos Aires</option>
                  <option>GMT-5 — Bogotá / Lima</option>
                  <option>GMT-4 — Santiago de Chile</option>
                  <option>GMT-1 — Lisboa</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Idioma del sistema</label>
                <select className="form-select">
                  <option>Español</option>
                  <option>Inglés</option>
                </select>
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="modoOscuro" />
                <label className="form-check-label" htmlFor="modoOscuro">
                  Habilitar modo oscuro (beta)
                </label>
              </div>

              <button type="button" className="btn btn-dark btn-sm">
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>

        {/* Equipo (placeholder para futuro) */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Equipo y permisos</h5>
              <p className="text-muted small mb-3">
                Gestioná los usuarios que tienen acceso al CRM (próximamente).
              </p>

              <button type="button" className="btn btn-outline-secondary btn-sm" disabled>
                Gestión de usuarios (coming soon)
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Configuracion;
