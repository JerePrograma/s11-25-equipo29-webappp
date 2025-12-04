// src/context/LeadContext.jsx
import React, { createContext, useContext, useState } from "react";

const LeadContext = createContext();

// Datos fake iniciales del backend
const LEADS_INICIALES = [
  {
    id: 1,
    nombre: "María Gómez",
    canal: "WhatsApp",
    etapa: "En seguimiento",
    estadoCalor: "Lead caliente",
    ultima: "Hace 2 horas",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    canal: "Email",
    etapa: "Contacto inicial",
    estadoCalor: "Lead tibio",
    ultima: "Ayer",
  },
  {
    id: 3,
    nombre: "Ana López",
    canal: "Instagram",
    etapa: "Nuevo lead",
    estadoCalor: "Lead frío",
    ultima: "Hace 3 días",
  },
];

// Normalizador → UNE Leads con Contactos
function normalizarLead(lead) {
  return {
    ...lead,

    // 👇 Este es el estado que usa Contactos y Leads
    estado: lead.etapa, // "En seguimiento", "Nuevo lead", etc.

    // 👇 Tipo de contacto común
    tipoContacto: "Lead",

    // 👇 (Opcional) Podés querer mostrar esto más adelante
    intensidad: lead.estadoCalor,
  };
}

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(LEADS_INICIALES.map(normalizarLead));

  function agregarLead(nuevoLead) {
    setLeads((prev) => [
      ...prev,
      normalizarLead({ id: Date.now(), ...nuevoLead }),
    ]);
  }

  function editarLead(id, cambios) {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? normalizarLead({ ...lead, ...cambios }) : lead
      )
    );
  }

  function eliminarLead(id) {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  }

  return (
    <LeadContext.Provider
      value={{ leads, agregarLead, editarLead, eliminarLead }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  return useContext(LeadContext);
}
