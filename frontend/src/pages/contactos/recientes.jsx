// src/pages/Contactos/Recientes.jsx
import React from "react";

function Recientes({ contactos = [], leads = [] }) {
  // Protecciones por si viene null o undefined
  const contactosSeguros = Array.isArray(contactos) ? contactos : [];
  const leadsSeguros = Array.isArray(leads) ? leads : [];

  // Tomamos los primeros 3
  const contactosRecientes = contactosSeguros.slice(0, 3);
  const leadsRecientes = leadsSeguros.slice(0, 3);

  return (
    <section className="row mb-4">

      {/* CONTACTOS RECIENTES */}
      <div className="col-md-6 mb-3">
        <h5 className="mb-3">Contactos recientes</h5>

        {contactosRecientes.length === 0 ? (
          <p className="text-muted small">No hay contactos recientes.</p>
        ) : (
          contactosRecientes.map((c) => (
            <div key={c.id} className="card mb-2 shadow-sm border-0">
              <div className="card-body d-flex justify-content-between align-items-center">

                {/* DATOS */}
                <div>
                  <h6 className="mb-1">{c.nombre}</h6>
                  <small className="text-muted">
                    {c.canal} · {c.creadoEn ? new Date(c.creadoEn).toLocaleDateString() : "—"}
                  </small>
                </div>

                {/* BADGES */}
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">{c.etapa}</span>
                  <span className="badge bg-dark">{c.tipoContacto}</span>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* LEADS RECIENTES */}
      <div className="col-md-6 mb-3">
        <h5 className="mb-3">Leads recientes</h5>

        {leadsRecientes.length === 0 ? (
          <p className="text-muted small">No hay leads recientes.</p>
        ) : (
          leadsRecientes.map((lead) => (
            <div key={lead.id} className="card mb-2 shadow-sm border-0">
              <div className="card-body d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="mb-1">{lead.nombre}</h6>
                  <small className="text-muted">
                    {lead.canal} · {lead.creadoEn ? new Date(lead.creadoEn).toLocaleDateString() : "—"}
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <span className="badge bg-primary">{lead.etapa}</span>
                  <span className="badge bg-dark">{lead.tipoContacto || "Lead"}</span>
                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
}

export default Recientes;
