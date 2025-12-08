// src/pages/Mensajes.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLeads } from "../context/leadcontext.jsx";

const API_URL = import.meta.env.VITE_API_URL; // ⭐ URL del backend real

function Mensajes() {
  const [searchParams] = useSearchParams();
  const { leads, agregarMensaje } = useLeads();

  const contactoDesdeURL = searchParams.get("contacto");
  const canalDesdeURL = searchParams.get("canal");

  const [contactosConfig, setContactosConfig] = useState(null);

  // ⭐ Cargar contactos reales desde BACKEND
  useEffect(() => {
    fetch(`${API_URL}/contactos`)
      .then((res) => res.json())
      .then((data) => setContactosConfig(data))
      .catch((err) => console.error("Error cargando contactos:", err));
  }, []);

  // ⭐ Formatear fecha/hora
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

  // ⭐ Obtener lead actual desde contexto
  const lead = useMemo(() => {
    return leads.find((l) => l.nombre === contactoDesdeURL) || null;
  }, [leads, contactoDesdeURL]);

  // ⭐ Ordenar mensajes por fecha
  const mensajesOrdenados = useMemo(() => {
    if (!lead) return [];
    return [...(lead.mensajes || [])].sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }, [lead]);

  const [nuevoMensaje, setNuevoMensaje] = useState("");

  if (!contactosConfig) return <p className="p-4">Cargando contactos…</p>;

  if (!lead) return <p className="p-4">No se encontró el lead.</p>;

  // 👉 Datos del contacto devueltos por la API
  const datosContacto = contactosConfig[lead.nombre];
  const numeroWhatsapp = datosContacto?.whatsapp || "";
  const email = datosContacto?.email || "";

  // ⭐ Enviar mensaje → se guarda en el backend al enchufarlo
  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;

    agregarMensaje(lead.id, {
      texto: nuevoMensaje,
      canal: canalDesdeURL || "WhatsApp",
      fecha: new Date().toISOString(),
      enviadoPor: "usuario",
    });

    setNuevoMensaje("");

    // ⭐ YA PREPARADO PARA BACKEND REAL
    try {
      await fetch(`${API_URL}/mensajes/${lead.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: nuevoMensaje,
          canal: canalDesdeURL,
        }),
      });
    } catch (err) {
      console.error("Error enviando mensaje al backend:", err);
    }
  };

  return (
    <div className="container py-4">

      {/* ⭐ INFORMACIÓN DEL CONTACTO */}
      <div className="mb-4">
        <h2 className="fw-bold">{lead.nombre}</h2>

        <p className="text-muted">
          Canal actual: <strong>{canalDesdeURL}</strong>
        </p>

        <p>
          📱 WhatsApp:{" "}
          <a
            href={`https://wa.me/${numeroWhatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="text-success"
          >
            {numeroWhatsapp}
          </a>
        </p>

        <p>
          📧 Email:{" "}
          <a href={`mailto:${email}`} className="text-primary">
            {email}
          </a>
        </p>
      </div>

      {/* ⭐ LISTA DE MENSAJES */}
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

      {/* ⭐ INPUT PARA ENVIAR MENSAJE */}
      <div className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Escribir mensaje…"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />

        <button className="btn btn-primary" onClick={enviarMensaje}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Mensajes;
