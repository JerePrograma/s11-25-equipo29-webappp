// src/context/leadcontext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  listClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../api/clienteApi.js";

/**
 * LeadContext:
 * - Representa "leads" como clientes con tipo === "lead".
 * - Usa ClienteController y Cliente*Request/Response del backend.
 */

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const clientes = await listClientes();
      const soloLeads = clientes.filter((c) => c.tipo === "lead");
      setLeads(soloLeads);
    } catch (err) {
      console.error("Error al cargar leads", err);
      setError("No se pudieron cargar los leads.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarLeads();
  }, []);

  /**
   * agregarLead:
   * espera un objeto compatible con ClienteCreateRequest,
   * pero fuerza tipo = "lead" y estadoGeneral por defecto.
   *
   * ej:
   * agregarLead({
   *   nombre, email, telefono, origen, etapaFunnelId, propietarioId
   * })
   */
  const agregarLead = async (nuevo) => {
    try {
      const payload = {
        nombre: nuevo.nombre,
        email: nuevo.email,
        telefono: nuevo.telefono,
        tipo: "lead",
        estadoGeneral: nuevo.estadoGeneral || "en_seguimiento",
        etapaFunnelId: nuevo.etapaFunnelId ?? null,
        propietarioId: nuevo.propietarioId,
        origen: nuevo.origen || "manual",
      };

      const creado = await createCliente(payload);
      setLeads((prev) => [...prev, creado]);
    } catch (err) {
      console.error("Error al crear lead", err);
      throw err;
    }
  };

  const editarLead = async (id, cambios) => {
    try {
      const actualizado = await updateCliente(id, cambios);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? actualizado : l))
      );
    } catch (err) {
      console.error("Error al editar lead", err);
      throw err;
    }
  };

  const eliminarLead = async (id) => {
    try {
      await deleteCliente(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error al eliminar lead", err);
      throw err;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        error,
        cargarLeads,
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
