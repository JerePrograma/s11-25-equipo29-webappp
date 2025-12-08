// src/pages/LeadDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useConfig } from "../context/configcontext.jsx";

export default function LeadDetail() {
  const { id } = useParams();
  const { API_BASE_URL, estadosCalor, etapas } = useConfig();

  const [lead, setLead] = useState(null);

  // 🔥 FETCH DEL LEAD REAL
  useEffect(() => {
    async function cargarLead() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/leads/${id}`);
        if (!res.ok) throw new Error("Lead no encontrado");
        const data = await res.json();
        setLead(data);
      } catch (err) {
        setLead(null);
      }
    }
    cargarLead();
  }, [API_BASE_URL, id]);

  if (!lead) {
    return <p className="text-danger">Lead no encontrado.</p>;
  }

  // 🔥 Badge dinámico usando etapa
  const badgeColor = {
    "Nuevo lead": "primary",
    "En seguimiento": "warning text-dark",
    "Respuesta pendiente": "danger",
    "Cliente": "success",
  }[lead.etapa] || "secondary";

  return (
    <div className="container py-4">

      {/* 🔙 Volver */}
      <Link to="/contactos" className="btn btn-link mb-3">
        ← Volver a Contactos
      </Link>

      {/* 🧩 Encabezado */}
      <h3 className="fw-bold">{lead.nombre}</h3>
      <p className="text-muted">Canal: {lead.canal}</p>

      <span className={`badge bg-${badgeColor} mb-3`}>
        {lead.etapa || "Sin etapa"}
      </span>

      <hr />

      {/* 🔗 NAV TABS */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <Link to={`/contactos/${id}`} className="nav-link active">
            Información
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/tareas?contacto=${encodeURIComponent(lead.nombre)}`}
            className="nav-link"
          >
            Tareas
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/mensajes?contacto=${encodeURIComponent(lead.nombre)}&canal=${encodeURIComponent(lead.canal)}`}
            className="nav-link"
          >
            Conversaciones
          </Link>
        </li>

        <li className="nav-item">
          <Link to={`/actividad/${id}`} className="nav-link">
            Actividad
          </Link>
        </li>
      </ul>

      {/* ⚙ Información */}
      <div>
        <h5 className="fw-bold">Información general</h5>

        <p><strong>Canal:</strong> {lead.canal}</p>
        <p><strong>Etapa:</strong> {lead.etapa}</p>
        <p><strong>Tipo:</strong> {lead.tipoContacto}</p>
        <p><strong>Intensidad:</strong> {lead.intensidad || "—"}</p>
        <p><strong>Última actividad:</strong> {lead.ultima || "—"}</p>
      </div>

    </div>
  );
}
