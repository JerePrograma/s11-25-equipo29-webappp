// src/pages/Mensajes.jsx
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Mensajes() {
  const [searchParams] = useSearchParams();

  const contactoDesdeURL = searchParams.get("contacto");
  const canalDesdeURL = searchParams.get("canal");

  // Datos de contacto para integración real
  const contactosConfig = {
    "María Gómez": { whatsapp: "5491111111111", email: "maria@example.com" },
    "Juan Pérez": { whatsapp: "5491122222222", email: "juan@example.com" },
    "Ana López": { whatsapp: "5491133333333", email: "ana@example.com" },
  };

  // Helper: formatear fecha/hora para timeline (CUS-09)
  const formatearFechaHora = (iso) => {
    if (!iso) return "";
    const fecha = new Date(iso);
    return fecha.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mock de conversaciones con fechaHora + canal en cada mensaje
  const conversacionesIniciales = useMemo(
    () => [
      {
        id: 1,
        nombre: "María Gómez",
        canal: "WhatsApp",
        mensajes: [
          {
            de: "contacto",
            texto: "Hola! ¿Tenés un minuto?",
            canal: "WhatsApp",
            fechaHora: "2025-12-03T13:00:00Z",
          },
          {
            de: "yo",
            texto: "Sí, decime :)",
            canal: "WhatsApp",
            fechaHora: "2025-12-03T13:02:00Z",
          },
        ],
      },
      {
        id: 2,
        nombre: "Juan Pérez",
        canal: "Email",
        mensajes: [
          {
            de: "contacto",
            texto: "Te mandé el presupuesto.",
            canal: "Email",
            fechaHora: "2025-12-02T16:30:00Z",
          },
        ],
      },
      {
        id: 3,
        nombre: "Ana López",
        canal: "WhatsApp",
        mensajes: [
          {
            de: "yo",
            texto: "Quedamos para el jueves, cualquier cosa avisame.",
            canal: "WhatsApp",
            fechaHora: "2025-12-01T18:15:00Z",
          },
        ],
      },
    ],
    []
  );

  const [conversaciones, setConversaciones] = useState(() => {
    if (!contactoDesdeURL) return conversacionesIniciales;

    const existe = conversacionesIniciales.find(
      (c) => c.nombre === contactoDesdeURL
    );

    if (existe) return conversacionesIniciales;

    const nuevo = {
      id: Date.now(),
      nombre: contactoDesdeURL,
      canal: canalDesdeURL || "WhatsApp",
      mensajes: [],
    };

    return [nuevo, ...conversacionesIniciales];
  });

  const [idSeleccionado, setIdSeleccionado] = useState(() => {
    if (contactoDesdeURL) {
      const encontrada = conversacionesIniciales.find(
        (c) => c.nombre === contactoDesdeURL
      );
      if (encontrada) return encontrada.id;
    }
    return conversacionesIniciales[0]?.id;
  });

  const conversacionActiva = conversaciones.find(
    (c) => c.id === idSeleccionado
  );

  const [canalSeleccionado, setCanalSeleccionado] = useState(
    canalDesdeURL || conversacionActiva?.canal || "WhatsApp"
  );
  const [plantilla, setPlantilla] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Guardar mensaje en CRM interno (con fechaHora + canal)
  const manejarEnviarMensaje = () => {
    if (!conversacionActiva) return;
    const texto = (mensaje || plantilla || "").trim();
    if (!texto) return;

    const ahoraISO = new Date().toISOString();

    setConversaciones((prev) =>
      prev.map((c) =>
        c.id === conversacionActiva.id
          ? {
              ...c,
              mensajes: [
                ...c.mensajes,
                {
                  de: "yo",
                  texto,
                  canal: canalSeleccionado,
                  fechaHora: ahoraISO,
                },
              ],
            }
          : c
      )
    );

    setMensaje("");
    setPlantilla("");
  };

  // Abrir WhatsApp real
  const abrirWhatsApp = () => {
    if (!conversacionActiva) return;

    const config = contactosConfig[conversacionActiva.nombre];
    if (!config?.whatsapp) return alert("No hay número configurado.");

    const texto =
      mensaje || plantilla || "Hola! Te escribo desde el CRM 😊";

    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
      texto
    )}`;

    window.open(url, "_blank");
  };

  // Abrir Gmail real
  const abrirEmail = () => {
    if (!conversacionActiva) return;

    const config = contactosConfig[conversacionActiva.nombre];
    if (!config?.email) return alert("No hay email configurado.");

    const subject = `Seguimiento - ${conversacionActiva.nombre}`;
    const body = mensaje || plantilla || "Hola! Te escribo por tu consulta 😊";

    const url = `mailto:${config.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
  };

  // Estilo PRO para el chat seleccionado
  const estiloItem = (id) =>
    id === idSeleccionado
      ? {
          backgroundColor: "#f0f4ff",
          borderLeft: "4px solid #0d6efd",
          fontWeight: 600,
        }
      : {};

  // Aseguramos orden cronológico (por si en el futuro vienen desordenados de backend)
  const mensajesOrdenados =
    conversacionActiva?.mensajes
      ?.slice()
      .sort(
        (a, b) =>
          new Date(a.fechaHora || 0).getTime() -
          new Date(b.fechaHora || 0).getTime()
      ) || [];

  return (
    <div className="container-fluid py-4">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Mensajes</h1>
        <p className="text-muted mb-0">
          Historial de conversaciones por canal (WhatsApp / Email).
        </p>
      </header>

      <div
        className="d-flex border rounded shadow-sm bg-white"
        style={{ height: "70vh", minHeight: "420px" }}
      >
        {/* SIDEBAR */}
        <aside className="border-end p-3" style={{ width: "260px" }}>
          <h6 className="fw-bold mb-3">Conversaciones</h6>

          <div className="list-group">
            {conversaciones.map((conv) => (
              <button
                key={conv.id}
                className="list-group-item list-group-item-action"
                style={estiloItem(conv.id)}
                onClick={() => {
                  setIdSeleccionado(conv.id);
                  setCanalSeleccionado(conv.canal || "WhatsApp");
                }}
              >
                <div className="fw-semibold">{conv.nombre}</div>
                <small className="text-muted">Canal: {conv.canal}</small>
              </button>
            ))}
          </div>
        </aside>

        {/* CHAT */}
        <div className="d-flex flex-column flex-grow-1">
          {/* Header del chat */}
          <div className="border-bottom p-3 d-flex justify-content-between">
            <div>
              <h6 className="fw-bold mb-0">
                {conversacionActiva?.nombre || "Seleccioná un chat"}
              </h6>
              {conversacionActiva && (
                <small className="text-muted">
                  Historial agrupado por conversación y canal.
                </small>
              )}
            </div>
            <span className="badge bg-success">{canalSeleccionado}</span>
          </div>

          {/* Barra de canal + plantilla */}
          <div className="border-bottom p-3 d-flex gap-3 flex-wrap">
            <div style={{ minWidth: "160px" }}>
              <label className="small text-muted">Canal</label>
              <select
                className="form-select form-select-sm"
                value={canalSeleccionado}
                onChange={(e) => setCanalSeleccionado(e.target.value)}
              >
                <option>WhatsApp</option>
                <option>Email</option>
              </select>
            </div>

            <div className="flex-grow-1">
              <label className="small text-muted">Plantilla</label>
              <select
                className="form-select form-select-sm"
                value={plantilla}
                onChange={(e) => setPlantilla(e.target.value)}
              >
                <option value="">Sin plantilla</option>
                <option value="Hola! Vi tu consulta y quería darte más info 😊">
                  Respuesta inicial
                </option>
                <option value="Te paso el detalle del servicio y las formas de pago.">
                  Info del servicio
                </option>
                <option value="¿Coordinamos una llamada o videollamada?">
                  Seguimiento
                </option>
              </select>
            </div>
          </div>

          {/* TIMELINE / HISTORIAL (CUS-09) */}
          <div className="flex-grow-1 p-3 overflow-auto bg-light">
            {mensajesOrdenados.length > 0 ? (
              mensajesOrdenados.map((msg, i) => {
                const esYo = msg.de === "yo";
                const canalMsg = msg.canal || conversacionActiva?.canal;
                const remitente = esYo ? "Tú" : conversacionActiva?.nombre;

                return (
                  <div
                    key={i}
                    className={`mb-3 ${esYo ? "text-end" : "text-start"}`}
                  >
                    <div
                      className={`p-2 rounded shadow-sm d-inline-block ${
                        esYo
                          ? "bg-primary text-white"
                          : "bg-white text-dark"
                      }`}
                    >
                      {msg.texto}
                    </div>
                    <div
                      className={`mt-1 small text-muted ${
                        esYo ? "text-end" : "text-start"
                      }`}
                      style={{ fontSize: "0.75rem" }}
                    >
                      {formatearFechaHora(msg.fechaHora)} · {canalMsg} ·{" "}
                      {remitente}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted small">
                Empezá enviando un mensaje a este contacto.
              </p>
            )}
          </div>

          {/* BOTONERA + INPUT */}
          <div className="border-top p-3 d-flex flex-wrap gap-2 align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder="Escribí un mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />

            {/* GUARDAR */}
            <button
              className="btn btn-dark d-flex align-items-center gap-2"
              onClick={manejarEnviarMensaje}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="#fff"
                viewBox="0 0 16 16"
              >
                <path d="M2 2v12h12V5.414L10.586 2H2zm9 3H5V3h6v2z" />
              </svg>
              Guardar
            </button>

            {/* WHATSAPP REAL */}
            <button
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={abrirWhatsApp}
              disabled={!conversacionActiva}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#25D366"
                  d="M128 0C57.3 0 0 57.3 0 128c0 22.6 6 44.6 17.3 63.8L0 256l65.8-17.2C85 250 106.9 256 128 256c70.7 0 128-57.3 128-128S198.7 0 128 0z"
                />
                <path
                  fill="#fff"
                  d="M184.6 151.8c-2.8-1.4-16.7-8.2-19.3-9.2-2.6-.9-4.5-1.4-6.4 1.4-1.9 2.8-7.3 9.2-8.9 11.1-1.6 1.9-3.3 2.1-6.1.7-2.8-1.4-11.7-4.3-22.3-13.6-8.2-7.3-13.8-16.3-15.4-19.1-1.6-2.8-.2-4.3 1.2-5.7 1.2-1.2 2.8-3.3 4.3-4.9 1.4-1.6 1.9-2.8 2.8-4.7.9-1.9.5-3.5-.2-4.9-.7-1.4-6.4-15.5-8.8-21.4-2.3-5.5-4.7-4.8-6.4-4.9-1.6-.1-3.5-.1-5.3-.1s-4.9.7-7.5 3.5c-2.6 2.8-9.8 9.6-9.8 23.4 0 13.8 10 27.1 11.4 29 1.4 1.9 19.6 29.9 47.5 41.8 6.6 2.8 11.7 4.5 15.6 5.8 6.6 2.1 12.6 1.8 17.3 1.1 5.3-.8 16.7-6.8 19.1-13.3 2.4-6.6 2.4-12.3 1.7-13.6-.7-1.3-2.6-2.1-5.5-3.5z"
                />
              </svg>
              WhatsApp
            </button>

            {/* GMAIL REAL */}
            <button
              className="btn btn-danger d-flex align-items-center gap-2"
              onClick={abrirEmail}
              disabled={!conversacionActiva}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#F44336"
                  d="M502.3 190.8L256 333 9.7 190.8 0 202.9 256 360l256-157.1z"
                />
                <path
                  fill="#E53935"
                  d="M502.3 76.1L256 218.3 9.7 76.1 0 88.2 256 245.3 512 88.2z"
                />
                <path fill="#D32F2F" d="M0 105.3v266.4L176 246.6z" />
                <path fill="#F44336" d="M512 105.3L336 246.6 512 371.7z" />
              </svg>
              Gmail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mensajes;
