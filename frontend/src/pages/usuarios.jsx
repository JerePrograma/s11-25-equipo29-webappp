// src/pages/Contactos.jsx
// Importamos React y el hook useState para manejar estados.
import React, { useState } from "react";

function Contactos() {
  // Estado del buscador
  const [busqueda, setBusqueda] = useState("");

  // Lista de contactos (estado dinámico que puede crecer/disminuir)
  const [contactos, setContactos] = useState([
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
  ]);

  // Estados para controlar qué modal está abierto
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  // Contacto seleccionado (para ver, editar o eliminar)
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  // Estado para el formulario de "Agregar nuevo contacto"
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: "",
    canal: "WhatsApp",
    estado: "Activo",
  });

  // Estado del formulario de edición
  const [editarContacto, setEditarContacto] = useState({
    nombre: "",
    canal: "",
    estado: "",
  });

  // Filtro del buscador
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Guardar nuevo contacto en la lista
  const guardarNuevoContacto = () => {
    setContactos([...contactos, nuevoContacto]);
    setNuevoContacto({ nombre: "", canal: "WhatsApp", estado: "Activo" });
    setModalAgregar(false);
  };

  // Guardar cambios del modal Editar
  const guardarEdicion = () => {
    setContactos(
      contactos.map((c) =>
        c.nombre === contactoSeleccionado.nombre ? editarContacto : c
      )
    );
    setModalEditar(false);
  };

  // Eliminar contacto
  const eliminarContacto = () => {
    setContactos(contactos.filter((c) => c !== contactoSeleccionado));
    setModalEliminar(false);
  };

  return (
    <div className="container-fluid py-4">

      {/* Título */}
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Usuarios</h1>
        <p className="text-muted mb-0">Agrega usuarios a tu trabajo.</p>
      </header>

      {/* Buscador + Botón */}
      <section className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Buscar contacto..."
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Botón para abrir modal Agregar */}
        <button
          className="btn btn-dark"
          onClick={() => setModalAgregar(true)}
        >
          + Usuario
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
                  <th>Correo Electronico</th>
                  <th>Pais</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {contactosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No se encontraron Contactos.
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

                      <td className="text-end">
                        {/* Botón VER */}
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setContactoSeleccionado(c);
                            setModalVer(true);
                          }}
                        >
                          Ver
                        </button>

                        {/* Botón EDITAR */}
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

                        {/* Botón ELIMINAR */}
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

      {/* --------------------------- */}
      {/* MODAL: AGREGAR CONTACTO     */}
      {/* --------------------------- */}
      {modalAgregar && (
        <div className="modal fade show d-block" style={{ background: "#00000090" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">

              <div className="modal-header">
                <h5 className="modal-title">Agregar nuevo contacto</h5>
                <button className="btn-close" onClick={() => setModalAgregar(false)} />
              </div>

              <div className="modal-body">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={nuevoContacto.nombre}
                  onChange={(e) =>
                    setNuevoContacto({ ...nuevoContacto, nombre: e.target.value })
                  }
                />

                <label className="form-label">Canal</label>
                <select
                  className="form-select mb-3"
                  value={nuevoContacto.canal}
                  onChange={(e) =>
                    setNuevoContacto({ ...nuevoContacto, canal: e.target.value })
                  }
                >
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>Instagram</option>
                </select>

                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={nuevoContacto.estado}
                  onChange={(e) =>
                    setNuevoContacto({ ...nuevoContacto, estado: e.target.value })
                  }
                >
                  <option>Activo</option>
                  <option>En seguimiento</option>
                  <option>Pendiente</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalAgregar(false)}>
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

      {/* --------------------------- */}
      {/* MODAL: VER CONTACTO         */}
      {/* --------------------------- */}
      {modalVer && contactoSeleccionado && (
        <div className="modal fade show d-block" style={{ background: "#00000090" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Información del contacto</h5>
                <button className="btn-close" onClick={() => setModalVer(false)} />
              </div>

              <div className="modal-body">
                <p><strong>Nombre:</strong> {contactoSeleccionado.nombre}</p>
                <p><strong>Canal:</strong> {contactoSeleccionado.canal}</p>
                <p><strong>Estado:</strong> {contactoSeleccionado.estado}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-dark" onClick={() => setModalVer(false)}>
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --------------------------- */}
      {/* MODAL: EDITAR CONTACTO      */}
      {/* --------------------------- */}
      {modalEditar && (
        <div className="modal fade show d-block" style={{ background: "#00000090" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Editar contacto</h5>
                <button className="btn-close" onClick={() => setModalEditar(false)} />
              </div>

              <div className="modal-body">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={editarContacto.nombre}
                  onChange={(e) =>
                    setEditarContacto({ ...editarContacto, nombre: e.target.value })
                  }
                />

                <label className="form-label">Canal</label>
                <select
                  className="form-select mb-3"
                  value={editarContacto.canal}
                  onChange={(e) =>
                    setEditarContacto({ ...editarContacto, canal: e.target.value })
                  }
                >
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>Instagram</option>
                </select>

                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={editarContacto.estado}
                  onChange={(e) =>
                    setEditarContacto({ ...editarContacto, estado: e.target.value })
                  }
                >
                  <option>Activo</option>
                  <option>En seguimiento</option>
                  <option>Pendiente</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalEditar(false)}>
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

      {/* --------------------------- */}
      {/* MODAL: ELIMINAR CONTACTO    */}
      {/* --------------------------- */}
      {modalEliminar && (
        <div className="modal fade show d-block" style={{ background: "#00000090" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title text-danger">Eliminar contacto</h5>
                <button className="btn-close" onClick={() => setModalEliminar(false)} />
              </div>

              <div className="modal-body">
                ¿Seguro que querés eliminar a  
                <strong> {contactoSeleccionado.nombre}</strong>?
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>
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
