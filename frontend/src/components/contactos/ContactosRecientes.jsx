// src/components/contactos/ContactosRecientes.jsx
import React from "react";
import { tipoContactoLegible } from "../../utils/contactos.js";

/**
 * @typedef {import("../../api/types.js").ClienteResponse} ClienteResponse
 */

/**
 * @param {{
 *   contactos: ClienteResponse[],
 *   leads: ClienteResponse[],
 * }} props
 */
export default function ContactosRecientes({ contactos = [], leads = [] }) {
  const contactosSeguros = Array.isArray(contactos) ? contactos : [];
  const leadsSeguros = Array.isArray(leads) ? leads : [];

  const contactosRecientes = contactosSeguros.slice(0, 3);
  const leadsRecientes = leadsSeguros.slice(0, 3);

  const formatFecha = (iso) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return "—";
    }
  };

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
                <div>
                  <h6 className="mb-1">{c.nombre}</h6>
                  <small className="text-muted">
                    {(c.origen || "CRM") + " · " + formatFecha(c.creadoEn)}
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <span className="badge bg-primary">
                    {c.etapaFunnelNombre || "Sin etapa"}
                  </span>
                  <span className="badge bg-dark">
                    {tipoContactoLegible(c.tipo)}
                  </span>
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
                    {(lead.origen || "CRM") +
                      " · " +
                      formatFecha(lead.creadoEn)}
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <span className="badge bg-primary">
                    {lead.etapaFunnelNombre || "Sin etapa"}
                  </span>
                  <span className="badge bg-dark">
                    {tipoContactoLegible(lead.tipo) || "Lead"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
