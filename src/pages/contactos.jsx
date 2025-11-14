// src/pages/Contactos.jsx
import React, { useState } from "react";

function Contactos() {
  // Estado del buscador
  const [busqueda, setBusqueda] = useState("");

  // Datos de ejemplo (luego se reemplazan por API o Firebase)
  const contactos = [
    {
      nombre: "María Gómez",
      canal: "WhatsApp",
      estado: "Lead activo",
      badge: "success",
      ultima: "Hace 2 horas",
    },
    {
      nombre: "Juan Pérez",
      canal: "Email",
      estado: "En seguimiento",
      badge: "warning text-dark",
      ultima: "Ayer",
    },
    {
      nombre: "Ana López",
      canal: "WhatsApp",
      estado: "Respuesta pendiente",
      badge: "danger",
      ultima: "Hace 3 días",
    },
  ];

  // 🔍 FILTRO DEL BUSCADOR
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      {/* Título */}
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Contactos</h1>
        <p className="text-muted mb-0">Gestioná tus leads, clientes y conversaciones.</p>
      </header>

      {/* Buscador + botón nuevo */}
      <section className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Buscar contacto..."
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button className="btn btn-dark">
          + Nuevo contacto
        </button>
      </section>

      {/* Tabla */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0">

              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Canal</th>
                  <th>Estado</th>
                  <th>Última interacción</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>

                {contactosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No se encontraron contactos.
                    </td>
                  </tr>
                ) : (
                  contactosFiltrados.map((c, i) => (
                    <tr key={i}>
                      <td>{c.nombre}</td>
                      <td>{c.canal}</td>
                      <td>
                        <span className={`badge bg-${c.badge}`}>{c.estado}</span>
                      </td>
                      <td>{c.ultima}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary me-2">Ver</button>
                        <button className="btn btn-sm btn-outline-secondary me-2">Editar</button>
                        <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contactos;
