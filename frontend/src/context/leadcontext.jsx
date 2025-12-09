// src/context/leadcontext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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

const ContactosContext = createContext(null);

export function LeadProvider({ children }) {
  const [contactos, setContactos] = useState(
    /** @type {ClienteResponse[]} */ ([]),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(/** @type {string | null} */ (null));

  const cargarContactos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listClientes();
      setContactos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar contactos", err);
      setError("No se pudieron cargar los contactos.");
      setContactos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  const leads = useMemo(
    () => contactos.filter((c) => (c.tipo || "").toLowerCase() === "lead"),
    [contactos],
  );

  const clientes = useMemo(
    () => contactos.filter((c) => (c.tipo || "").toLowerCase() === "cliente"),
    [contactos],
  );

  /**
   * Crear contacto (lead o cliente).
   * @param {ClienteCreateRequest} payload
   * @returns {Promise<ClienteResponse>}
   */
  const crearContacto = async (payload) => {
    const creado = await createCliente(payload);
    setContactos((prev) => [...prev, creado]);
    return creado;
  };

  /**
   * Actualizar contacto.
   * @param {number} id
   * @param {ClienteUpdateRequest} cambios
   * @returns {Promise<ClienteResponse>}
   */
  const actualizarContacto = async (id, cambios) => {
    const actualizado = await updateCliente(id, cambios);
    setContactos((prev) =>
      prev.map((c) => (c.id === id ? actualizado : c)),
    );
    return actualizado;
  };

  /**
   * Eliminar contacto.
   * @param {number} id
   */
  const eliminarContacto = async (id) => {
    await deleteCliente(id);
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ContactosContext.Provider
      value={{
        contactos,
        leads,
        clientes,
        loading,
        error,
        recargar: cargarContactos,
        crearContacto,
        actualizarContacto,
        eliminarContacto,
      }}
    >
      {children}
    </ContactosContext.Provider>
  );
}

/**
 * Hook principal de contactos/leads.
 */
export function useLeads() {
  const ctx = useContext(ContactosContext);
  if (!ctx) {
    throw new Error("useLeads debe usarse dentro de <LeadProvider>");
  }
  return ctx;
}
