// src/context/leadcontext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  listClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../api/clienteApi.js";

/**
 * @typedef {import("../api/types.js").ClienteResponse} ClienteResponse
 * @typedef {import("../api/types.js").ClienteCreateRequest} ClienteCreateRequest
 * @typedef {import("../api/types.js").ClienteUpdateRequest} ClienteUpdateRequest
 */

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(
    /** @type {ClienteResponse[]} */ ([]),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(/** @type {string | null} */ (null));

  const cargarLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const clientes = await listClientes();
      const soloLeads = (clientes || []).filter((c) => c.tipo === "lead");
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
   * Crear lead (ClienteCreateRequest con tipo="lead").
   * @param {Partial<ClienteCreateRequest> & { nombre: string, email: string, telefono: string, propietarioId: number }} nuevo
   */
  const agregarLead = async (nuevo) => {
    /** @type {ClienteCreateRequest} */
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
    return creado;
  };

  /**
   * Editar lead.
   * @param {number} id
   * @param {ClienteUpdateRequest} cambios
   */
  const editarLead = async (id, cambios) => {
    const actualizado = await updateCliente(id, cambios);
    setLeads((prev) => prev.map((l) => (l.id === id ? actualizado : l)));
    return actualizado;
  };

  /**
   * Eliminar lead.
   * @param {number} id
   */
  const eliminarLead = async (id) => {
    await deleteCliente(id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
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
  const ctx = useContext(LeadContext);
  if (!ctx) {
    throw new Error("useLeads debe usarse dentro de <LeadProvider>");
  }
  return ctx;
}
