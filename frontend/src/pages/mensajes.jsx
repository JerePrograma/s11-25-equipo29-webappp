// src/pages/Mensajes.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLeads } from "../context/leadcontext.jsx";

const API_URL = import.meta.env.VITE_API_URL; // URL del backend

function Mensajes() {
  const [searchParams] = useSearchParams();
  const { leads, agregarMensaje } = useLeads();

  const contactoDesdeURL = searchParams.get("contacto");
  const canalDesdeURL = searchParams.get("canal");

  const [contactosConfig, setContactosConfig] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [errorCargaContactos, setErrorCargaContactos] = useState(null);

  // ---------------------------------------------------------------------------
  // Cargar contactos reales desde BACKEND (ClienteController -> /api/clientes)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let cancelado = false;

    async function cargarContactos() {
      try {
        setErrorCargaContactos(null);

        const res = await fetch(`${API_URL}/api/clientes`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        /** @type {import("../api/types.js").ClienteResponse[]} */
        const clientes = await res.json();

        // Mapeamos por nombre → { whatsapp, email }
        const mapa = clientes.reduce((acc, c) => {
          acc[c.nombre] = {
            whatsapp: c.telefono || "",
            email: c.email || "",
          };
          return acc;
        }, /** @type {Record<string, {whatsapp: string, email: string}>} */ ({}));

        if (!cancelado) {
          setContactosConfig(mapa);
        }
      } catch (err) {
        console.error("Error cargando contactos:", err);
        if (!cancelado) {
          setErrorCargaContactos("No se pudieron cargar los contactos.");
          // Seteamos objeto vacío para salir del "Cargando..."
          setContactosConfig({});
        }
      }
    }

    cargarContactos();

    return () => {
      cancelado = true;
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Formatear fecha/hora
  // ---------------------------------------------------------------------------
  const formatearFechaHora = (iso) => {
    if (!iso) return "";
    const f = new Date(iso);
    return f.toLocaleString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ---------------------------------------------------------------------------
  // Obtener lead actual desde contexto
  // ---------------------------------------------------------------------------
  const lead = useMemo(() => {
    return leads.find((l) => l.nombre === contactoDesdeURL) || null;
  }, [leads, contactoDesdeURL]);

  // ---------------------------------------------------------------------------
  // Ordenar mensajes por fecha
  // ---------------------------------------------------------------------------
  const mensajesOrdenados = useMemo(() => {
    if (!lead) return [];
    return [...(lead.mensajes || [])].sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }, [lead]);

  // ---------------------------------------------------------------------------
  // Estados de carga / error
  // ---------------------------------------------------------------------------
  if (!contactosConfig) {
    return <p className="p-4">Cargando contactos…</p>;
  }

  if (!lead) {
    return <p className="p-4">No se encontró el lead.</p>;
  }

  // ---------------------------------------------------------------------------
  // Datos del contacto (provenientes de /api/clientes)
  // ---------------------------------------------------------------------------
  const datosContacto = contactosConfig[lead.nombre] || {};
  const numeroWhatsapp = datosContacto.whatsapp || "";
  const email = datosContacto.email || "";

  // ---------------------------------------------------------------------------
  // Enviar mensaje → por ahora actualiza contexto y hace POST "maqueta"
  // ---------------------------------------------------------------------------
  const enviarMensaje = async () => {
    const texto = nuevoMensaje.trim();
    if (!texto) return;

    // Actualizamos estado local del contexto
    agregarMensaje(lead.id, {
      texto,
      canal: canalDesdeURL || "WhatsApp",
      fecha: new Date().toISOString(),
      enviadoPor: "usuario",
    });

    setNuevoMensaje("");

    // TODO: Enchufar con backend real de mensajes:
    //   - Endpoint real: POST /api/mensajes
    //   - Body: { conversacionId, contenido }
    //   - Requiere que tengas conversacionId disponible
    try {
      await fetch(`${API_URL}/mensajes/${lead.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto,
          canal: canalDesdeURL,
        }),
      });
    } catch (err) {
      console.error("Error enviando mensaje al backend (placeholder):", err);
    }
  };

  return (
    <div className="container py-4">
      {/* INFO CONTACTO */}
      <div className="mb-4">
        <h2 className="fw-bold">{lead.nombre}</h2>

        <p className="text-muted">
          Canal actual: <strong>{canalDesdeURL || "WhatsApp"}</strong>
        </p>

        {errorCargaContactos && (
          <p className="text-danger small mb-1">{errorCargaContactos}</p>
        )}

        <p>
          📱 WhatsApp:{" "}
          {numeroWhatsapp ? (
            <a
              href={`https://wa.me/${numeroWhatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="text-success"
            >
              {numeroWhatsapp}
            </a>
          ) : (
            <span className="text-muted">Sin número cargado</span>
          )}
        </p>

        <p>
          📧 Email:{" "}
          {email ? (
            <a href={`mailto:${email}`} className="text-primary">
              {email}
            </a>
          ) : (
            <span className="text-muted">Sin email cargado</span>
          )}
        </p>
      </div>

      {/* LISTA DE MENSAJES */}
      <div
        className="border rounded p-3 mb-3 bg-white"
        style={{ height: "350px", overflowY: "auto" }}
      >
        {mensajesOrdenados.length === 0 && (
          <p className="text-muted text-center">No hay mensajes todavía…</p>
        )}

        {mensajesOrdenados.map((m, i) => (
          <div
            key={i}
            className={`p-2 mb-2 rounded ${
              m.enviadoPor === "usuario"
                ? "bg-primary text-white ms-auto"
                : "bg-light"
            }`}
            style={{ maxWidth: "70%" }}
          >
            <div className="small">{m.texto}</div>
            <div className="text-end small opacity-75">
              {formatearFechaHora(m.fecha)}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT MENSAJE */}
      <div className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Escribir mensaje…"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviarMensaje();
            }
          }}
        />

        <button className="btn btn-primary" onClick={enviarMensaje}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Mensajes;
