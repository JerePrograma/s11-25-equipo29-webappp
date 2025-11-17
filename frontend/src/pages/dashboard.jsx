// src/pages/Dashboard.jsx
import React from "react";

function Dashboard() {
  return (
    <div className="container-fluid">
      {/* Título y subtítulo */}
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Dashboard</h1>
        <p className="text-muted mb-0">
          Vista general de tus leads, clientes y conversaciones.
        </p>
      </header>

      {/* FILA 1: Cards de métricas principales */}
      <section className="row g-3 mb-4">
        {/* Leads activos */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Leads activos
              </h6>
              <h3 className="fw-bold mb-1">32</h3>
              <p className="text-success small mb-0">▲ +8 esta semana</p>
            </div>
          </div>
        </div>

        {/* Clientes en seguimiento */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Clientes en seguimiento
              </h6>
              <h3 className="fw-bold mb-1">14</h3>
              <p className="text-primary small mb-0">
                Próximos contactos programados
              </p>
            </div>
          </div>
        </div>

        {/* Respuestas pendientes */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Respuestas pendientes
              </h6>
              <h3 className="fw-bold mb-1">7</h3>
              <p className="text-danger small mb-0">
                ¡Revisar WhatsApp y email!
              </p>
            </div>
          </div>
        </div>

        {/* Tasa de conversión */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small mb-2">
                Tasa de conversión
              </h6>
              <h3 className="fw-bold mb-1">23%</h3>
              <p className="text-muted small mb-0">Últimos 30 días</p>
            </div>
          </div>
        </div>
      </section>

      {/* FILA 2: tabla + recordatorios */}
      <section className="row g-3">
        {/* Últimas interacciones */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Últimas interacciones</h5>
              <p className="text-muted small">
                Resumen de los últimos contactos por WhatsApp y correo.
              </p>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Canal</th>
                      <th>Estado</th>
                      <th>Último contacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>María Gómez</td>
                      <td>WhatsApp</td>
                      <td>
                        <span className="badge bg-success">Lead activo</span>
                      </td>
                      <td>Hace 2 horas</td>
                    </tr>
                    <tr>
                      <td>Juan Pérez</td>
                      <td>Email</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          En seguimiento
                        </span>
                      </td>
                      <td>Ayer</td>
                    </tr>
                    <tr>
                      <td>Startup XYZ</td>
                      <td>WhatsApp</td>
                      <td>
                        <span className="badge bg-secondary">En frío</span>
                      </td>
                      <td>Hace 5 días</td>
                    </tr>
                    <tr>
                      <td>Ana López</td>
                      <td>Email</td>
                      <td>
                        <span className="badge bg-danger">Respuesta pendiente</span>
                      </td>
                      <td>Hace 3 horas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* Próximos recordatorios / tareas */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-3">Próximos recordatorios</h5>
              <ul className="list-unstyled mb-3">
                <li className="mb-2">
                  <span className="fw-semibold">09:30</span> — Llamar a María
                  (demo del producto).
                </li>
                <li className="mb-2">
                  <span className="fw-semibold">11:00</span> — Responder email a
                  Juan sobre precios.
                </li>
                <li className="mb-2">
                  <span className="fw-semibold">15:15</span> — Enviar propuesta
                  a Startup XYZ.
                </li>
              </ul>
              <button className="btn btn-outline-dark mt-auto">
                Ver todas las tareas
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
