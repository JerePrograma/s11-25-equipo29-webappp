// src/pages/Mensajes.jsx
import React from "react";

function Mensajes() {
  return (
    <div className="container-fluid py-4">

      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Mensajes</h1>
        <p className="text-muted">Administrá conversaciones en tiempo real.</p>
      </header>

      <div className="d-flex border rounded shadow-sm" style={{ height: "70vh" }}>

        {/* Lista de chats */}
        <aside className="border-end p-3" style={{ width: "280px" }}>
          <h6 className="fw-bold mb-3">Conversaciones</h6>

          <div className="list-group">
            <button className="list-group-item list-group-item-action active">
              María Gómez — WhatsApp
            </button>

            <button className="list-group-item list-group-item-action">
              Juan Pérez — Email
            </button>

            <button className="list-group-item list-group-item-action">
              Ana López — WhatsApp
            </button>
          </div>
        </aside>

        {/* Conversación */}
        <div className="d-flex flex-column flex-grow-1">

          {/* Header del contacto */}
          <div className="border-bottom p-3 d-flex align-items-center">
            <h6 className="fw-bold mb-0">María Gómez</h6>
            <span className="badge bg-success ms-3">WhatsApp</span>
          </div>

          {/* Chat */}
          <div className="flex-grow-1 p-3 overflow-auto bg-light">
            <div className="mb-3">
              <div className="p-2 bg-white rounded shadow-sm d-inline-block">
                Hola! ¿Tenés un minuto?
              </div>
            </div>

            <div className="text-end mb-3">
              <div className="p-2 bg-primary text-white rounded shadow-sm d-inline-block">
                Sí, decime :)
              </div>
            </div>
          </div>

          {/* Caja de mensaje */}
          <div className="border-top p-3 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Escribí un mensaje..."
            />
            <button className="btn btn-dark">Enviar</button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Mensajes;
