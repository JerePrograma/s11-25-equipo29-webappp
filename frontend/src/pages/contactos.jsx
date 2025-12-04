// src/pages/Contactos.jsx
import React, { useState } from "react";
import { useLeads } from "../context/leadcontext";
import { useNavigate } from "react-router-dom";

function Contactos() {
  const [busqueda, setBusqueda] = useState("");

  const [contactos, setContactos] = useState([
    {
      nombre: "María Gómez",
      canal: "WhatsApp",
      estado: "Lead activo",
      tipoContacto: "Lead",
      badge: "success", // verde
      ultima: "Hace 2 horas",
    },
    {
      nombre: "Juan Pérez",
      canal: "Email",
      estado: "En seguimiento",
      tipoContacto: "Lead",
      badge: "warning text-dark", // amarillo
      ultima: "Ayer",
    },
    {
      nombre: "Ana López",
      canal: "WhatsApp",
      estado: "Respuesta pendiente",
      tipoContacto: "Cliente",
      badge: "danger", // rojo
      ultima: "Hace 3 días",
    },
  ]);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: "",
    canal: "WhatsApp",
    estado: "Lead activo",
    tipoContacto: "Lead",
  });

  const [editarContacto, setEditarContacto] = useState({
    nombre: "",
    canal: "",
    estado: "",
    tipoContacto: "",
  });

  // 👉 Leads desde el contexto
  const { leads } = useLeads();

  // 👉 Navegación para ir a Mensajes (CUS-08)
  const navigate = useNavigate();

  // 👉 MISMO mapa que en LeadContext
  const mapEstadoToBadge = (estado) => {
    const mapa = {
      "Lead activo": "success",
      "En seguimiento": "warning text-dark",
      "Respuesta pendiente": "danger",
    };
    return mapa[estado] || "secondary";
  };

  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const leadsFiltrados = leads.filter((l) =>
    l.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Recientes (primeros 3 de cada lista)
  const contactosRecientes = contactosFiltrados.slice(0, 3);
  const leadsRecientes = leadsFiltrados.slice(0, 3);

  // *** AGREGAR CONTACTO ***
  const guardarNuevoContacto = () => {
    if (!nuevoContacto.nombre.trim()) {
      alert("El nombre del contacto es obligatorio");
      return;
    }

    const contactoFormateado = {
      nombre: nuevoContacto.nombre,
      canal: nuevoContacto.canal,
      estado: nuevoContacto.estado,
      tipoContacto: nuevoContacto.tipoContacto,
      badge: mapEstadoToBadge(nuevoContacto.estado),
      ultima: "Justo ahora",
    };

    setContactos((prev) => [...prev, contactoFormateado]);

    setNuevoContacto({
      nombre: "",
      canal: "WhatsApp",
      estado: "Lead activo",
      tipoContacto: "Lead",
    });

    setModalAgregar(false);
  };

  // *** EDITAR CONTACTO ***
  const guardarEdicion = () => {
    setContactos(
      contactos.map((c) =>
        c.nombre === contactoSeleccionado.nombre
          ? {
              ...c,
              ...editarContacto,
              badge: mapEstadoToBadge(editarContacto.estado),
            }
          : c
      )
    );
    setModalEditar(false);
  };

  // *** ELIMINAR CONTACTO ***
  const eliminarContacto = () => {
    setContactos(contactos.filter((c) => c !== contactoSeleccionado));
    setModalEliminar(false);
  };

  return (
    <div className="container-fluid py-4">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Contactos</h1>
        <p className="text-muted mb-0">Gestioná tus leads y conversaciones.</p>
      </header>

      <section className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Buscar contacto..."
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button className="btn btn-dark" onClick={() => setModalAgregar(true)}>
          + Nuevo contacto
        </button>
      </section>

      {/* ========== RECIENTES ========== */}
      <section className="row mb-4">
        {/* Contactos recientes */}
        <div className="col-md-6 mb-3">
          <h5 className="mb-3">Contactos recientes</h5>
          {contactosRecientes.length === 0 ? (
            <p className="text-muted small">No hay contactos que coincidan.</p>
          ) : (
            contactosRecientes.map((c, i) => (
              <div key={i} className="card mb-2 shadow-sm border-0">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{c.nombre}</h6>
                    <small className="text-muted">
                      {c.canal} · {c.ultima}
                    </small>
                  </div>

                  {/* 👉 MISMOS BADGES QUE EN LA TABLA */}
                  <div className="d-flex gap-2">
                    <span className={`badge bg-${c.badge}`}>{c.estado}</span>
                    <span className="badge bg-dark">{c.tipoContacto}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Leads recientes */}
        <div className="col-md-6 mb-3">
          <h5 className="mb-3">Leads recientes</h5>
          {leadsRecientes.length === 0 ? (
            <p className="text-muted small">No hay leads que coincidan.</p>
          ) : (
            leadsRecientes.map((lead) => (
              <div key={lead.id} className="card mb-2 shadow-sm border-0">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{lead.nombre}</h6>
                    <small className="text-muted">
                      {lead.canal} · {lead.ultima}
                    </small>
                  </div>

                  {/* 👉 MISMOS BADGES: estado + tipo Lead en negro */}
                  <div className="d-flex gap-2">
                    <span className={`badge bg-${lead.badge}`}>
                      {lead.estado}
                    </span>
                    <span className="badge bg-dark">Lead</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ========== TABLA ========== */}
      <div className="card shadow-sm border-0">
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
                        <span className={`badge bg-${c.badge}`}>
                          {c.estado}
                        </span>
                      </td>

                      {/* Tipo de contacto: pill negra */}
                      <td>
                        <span className="badge bg-dark">{c.tipoContacto}</span>
                      </td>

                      <td className="text-end">
                        {/* 👉 CUS-08: Iniciar conversación desde el CRM */}
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() =>
                            navigate(
                              `/mensajes?contacto=${encodeURIComponent(
                                c.nombre
                              )}&canal=${encodeURIComponent(c.canal || "WhatsApp")}`
                            )
                          }
                        >
                          Enviar mensaje →
                        </button>

                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setContactoSeleccionado(c);
                            setModalVer(true);
                          }}
                        >
                          Ver
                        </button>

                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => {
                            setContactoSeleccionado(c);
                            setEditarContacto(c);
                            setModalEditar(true);
                          }}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setContactoSeleccionado(c);
                            setModalEliminar(true);
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= MODALES ================= */}

      {/* MODAL AGREGAR */}
      {modalAgregar && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Agregar nuevo contacto</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalAgregar(false)}
                />
              </div>

              <div className="modal-body">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={nuevoContacto.nombre}
                  onChange={(e) =>
                    setNuevoContacto({
                      ...nuevoContacto,
                      nombre: e.target.value,
                    })
                  }
                />

                <label className="form-label">Canal</label>
                <select
                  className="form-select mb-3"
                  value={nuevoContacto.canal}
                  onChange={(e) =>
                    setNuevoContacto({
                      ...nuevoContacto,
                      canal: e.target.value,
                    })
                  }
                >
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>Instagram</option>
                </select>

                <label className="form-label">Tipo de contacto</label>
                <select
                  className="form-select mb-3"
                  value={nuevoContacto.tipoContacto}
                  onChange={(e) =>
                    setNuevoContacto({
                      ...nuevoContacto,
                      tipoContacto: e.target.value,
                    })
                  }
                >
                  <option>Lead</option>
                  <option>Cliente</option>
                </select>

                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={nuevoContacto.estado}
                  onChange={(e) =>
                    setNuevoContacto({
                      ...nuevoContacto,
                      estado: e.target.value,
                    })
                  }
                >
                  <option>Lead activo</option>
                  <option>En seguimiento</option>
                  <option>Respuesta pendiente</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalAgregar(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-dark" onClick={guardarNuevoContacto}>
                  Guardar contacto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VER */}
      {modalVer && contactoSeleccionado && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información del contacto</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalVer(false)}
                />
              </div>

              <div className="modal-body">
                <p>
                  <strong>Nombre:</strong> {contactoSeleccionado.nombre}
                </p>
                <p>
                  <strong>Canal:</strong> {contactoSeleccionado.canal}
                </p>
                <p>
                  <strong>Estado:</strong> {contactoSeleccionado.estado}
                </p>
                <p>
                  <strong>Tipo:</strong> {contactoSeleccionado.tipoContacto}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-dark"
                  onClick={() => setModalVer(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {modalEditar && contactoSeleccionado && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar contacto</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalEditar(false)}
                />
              </div>

              <div className="modal-body">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={editarContacto.nombre}
                  onChange={(e) =>
                    setEditarContacto({
                      ...editarContacto,
                      nombre: e.target.value,
                    })
                  }
                />

                <label className="form-label">Canal</label>
                <select
                  className="form-select mb-3"
                  value={editarContacto.canal}
                  onChange={(e) =>
                    setEditarContacto({
                      ...editarContacto,
                      canal: e.target.value,
                    })
                  }
                >
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>Instagram</option>
                </select>

                <label className="form-label">Tipo de contacto</label>
                <select
                  className="form-select mb-3"
                  value={editarContacto.tipoContacto}
                  onChange={(e) =>
                    setEditarContacto({
                      ...editarContacto,
                      tipoContacto: e.target.value,
                    })
                  }
                >
                  <option>Lead</option>
                  <option>Cliente</option>
                </select>

                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={editarContacto.estado}
                  onChange={(e) =>
                    setEditarContacto({
                      ...editarContacto,
                      estado: e.target.value,
                    })
                  }
                >
                  <option>Lead activo</option>
                  <option>En seguimiento</option>
                  <option>Respuesta pendiente</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalEditar(false)}
                >
                  Cancelar
                </button>

                <button className="btn btn-dark" onClick={guardarEdicion}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {modalEliminar && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Eliminar contacto</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalEliminar(false)}
                />
              </div>

              <div className="modal-body">
                ¿Seguro que querés eliminar a{" "}
                <strong>{contactoSeleccionado?.nombre}</strong>?
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalEliminar(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={eliminarContacto}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contactos;
