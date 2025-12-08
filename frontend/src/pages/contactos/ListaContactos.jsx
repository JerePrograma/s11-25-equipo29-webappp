// src/pages/Contactos/ListaContactos.jsx
import React from "react";

function ListaContactos({ contactos, navigate, onVer, onEditar, onEliminar }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Canal</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {contactos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No se encontraron contactos.
                  </td>
                </tr>
              ) : (
                contactos.map((c, i) => (
                  <tr key={i}>
                    {/* NOMBRE */}
                    <td className="fw-semibold">{c.nombre}</td>

                    {/* CANAL */}
                    <td>{c.canal}</td>

                    {/* ESTADO */}
                    <td>
                      <span className={`badge bg-${c.badge}`}>{c.estado}</span>
                    </td>

                    {/* TIPO */}
                    <td>
                      <span className="badge bg-dark">{c.tipoContacto}</span>
                    </td>

                    {/* ACCIONES */}
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">

                        {/* ENVIAR MENSAJE */}
                        <button
                          className="btn btn-sm btn-success d-flex align-items-center gap-1"
                          onClick={() =>
                            navigate(
                              `/mensajes?contacto=${encodeURIComponent(
                                c.nombre
                              )}&canal=${encodeURIComponent(
                                c.canal || "WhatsApp"
                              )}`
                            )
                          }
                        >
                          <i className="bi bi-chat-dots"></i>
                          Enviar
                        </button>

                        {/* VER */}
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => onVer(c)}
                        >
                          Ver
                        </button>

                        {/* EDITAR */}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => onEditar(c)}
                        >
                          Editar
                        </button>

                        {/* ELIMINAR */}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onEliminar(c)}
                        >
                          Eliminar
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default ListaContactos;
