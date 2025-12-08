// src/context/leadcontext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const LeadContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);

  // --------------------------------------------------
  // ⭐ CARGAR LEADS (fetch real + fallback sin romper)
  // --------------------------------------------------
  useEffect(() => {
    async function cargarLeads() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/leads`);

        if (!res.ok) {
          throw new Error("Backend no disponible");
        }

        const data = await res.json();
        setLeads(data); // ← cuando exista backend, funciona

      } catch (error) {
        console.warn("⚠️ No se pudo conectar al backend → usando []");
        setLeads([]); // ← ENGÁÑO PRO PARA QUE NO ROMPA
      }
    }

    cargarLeads();
  }, []);

  // --------------------------------------------------
  // ⭐ AGREGAR LEAD (cuando haya backend se conecta)
  // --------------------------------------------------
  const agregarLead = async (nuevo) => {
    const leadConId = {
      ...nuevo,
      id: Date.now(),
      creadoEn: new Date().toISOString(),
    };

    try {
      await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadConId),
      });
    } catch (error) {
      console.warn("⚠️ Backend no disponible → guardando en memoria");
    }

    setLeads((prev) => [...prev, leadConId]);
  };

  // --------------------------------------------------
  // ⭐ EDITAR LEAD
  // --------------------------------------------------
  const editarLead = async (id, cambios) => {
    const original = leads.find((l) => l.id === id);
    if (!original) return;

    const actualizado = { ...original, ...cambios };

    try {
      await fetch(`${API_BASE_URL}/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });
    } catch (error) {
      console.warn("⚠️ Backend no disponible → editando en memoria");
    }

    setLeads((prev) =>
      prev.map((l) => (l.id === id ? actualizado : l))
    );
  };

  // --------------------------------------------------
  // ⭐ ELIMINAR LEAD
  // --------------------------------------------------
  const eliminarLead = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/leads/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.warn("⚠️ Backend no disponible → borrando en memoria");
    }

    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        agregarLead,
        editarLead,
        eliminarLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  return useContext(LeadContext);
}
