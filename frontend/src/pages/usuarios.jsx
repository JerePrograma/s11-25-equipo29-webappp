// src/pages/Contactos.jsx
import React, { useState } from "react";

function Contactos() {
  const [busqueda, setBusqueda] = useState("");

  const [contactos, setContactos] = useState([
    {
      nombre: "María Gómez",
      correo: "WhatsApp@gmail.com",
      contraseña: "1234567",
      pais: "España",
    },
    {
      nombre: "Juan Pérez",
      correo: "juan@gmail.com",
      contraseña: "abcdef",
      pais: "México",
    },
  ]);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  // 👁 Estados para ver/ocultar contraseñas
  const [verPassAgregar, setVerPassAgregar] = useState(false);
  const [verPassEditar, setVerPassEditar] = useState(false);

  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    pais: "",
  });

  const [editarContacto, setEditarContacto] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    pais: "",
  });

  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const guardarNuevoContacto = () => {
    setContactos([...contactos, nuevoContacto]);
    setNuevoContacto({ nombre: "", correo: "", contraseña: "", pais: "" });
    setVerPassAgregar(false);
    setModalAgregar(false);
  };

  const guardarEdicion = () => {
    setContactos(
      contactos.map((c) => (c === contactoSeleccionado ? editarContacto : c))
    );
    setVerPassEditar(false);
    setModalEditar(false);
  };

  const eliminarContacto = () => {
    setContactos(contactos.filter((c) => c !== contactoSeleccionado));
    setModalEliminar(false);
  };

  return (
    <div className="container-fluid py-4">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Usuarios</h1>
        <p className="text-muted mb-0">Agrega usuarios a tu trabajo.</p>
      </header>

      <section className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button className="btn btn-dark" onClick={() => setModalAgregar(true)}>
          + Usuario
        </button>
      </section>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>País</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {contactosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                ) : (
                  contactosFiltrados.map((c, i) => (
                    <tr key={i}>
                      <td>{c.nombre}</td>
                      <td>{c.correo}</td>
                      <td>
                        <span className="badge rounded-pill bg-success text-white px-3 py-2 fw-semibold">
                          {c.pais}
                        </span>
                      </td>

                      <td className="text-end">
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

      {/* ============================
          MODAL AGREGAR
      ============================ */}
      {modalAgregar && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Agregar nuevo usuario</h5>
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

                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={nuevoContacto.correo}
                  onChange={(e) =>
                    setNuevoContacto({
                      ...nuevoContacto,
                      correo: e.target.value,
                    })
                  }
                />

                <label className="form-label">Contraseña</label>
                <div className="input-group mb-3">
                  <input
                    type={verPassAgregar ? "text" : "password"}
                    className="form-control"
                    value={nuevoContacto.contraseña}
                    onChange={(e) =>
                      setNuevoContacto({
                        ...nuevoContacto,
                        contraseña: e.target.value,
                      })
                    }
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    style={{ width: "90px" }} // ← ancho fijo
                    onClick={() => setVerPassAgregar(!verPassAgregar)}
                  >
                    {verPassAgregar ? "Ocultar" : "Ver"}
                  </button>
                </div>

                <label className="form-label">País</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoContacto.pais}
                  onChange={(e) =>
                    setNuevoContacto({
                      ...nuevoContacto,
                      pais: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalAgregar(false)}
                >
                  Cancelar
                </button>

                <button className="btn btn-dark" onClick={guardarNuevoContacto}>
                  Guardar Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================
          MODAL VER
      ============================ */}
      {modalVer && contactoSeleccionado && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información del usuario</h5>
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
                  <strong>Correo:</strong> {contactoSeleccionado.correo}
                </p>
                <p>
                  <strong>Contraseña:</strong> {contactoSeleccionado.contraseña}
                </p>
                <p>
                  <strong>País:</strong> {contactoSeleccionado.pais}
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

      {/* ============================
          MODAL EDITAR
      ============================ */}
      {modalEditar && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar usuario</h5>
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

                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={editarContacto.correo}
                  onChange={(e) =>
                    setEditarContacto({
                      ...editarContacto,
                      correo: e.target.value,
                    })
                  }
                />

                <label className="form-label">Contraseña</label>
                <div className="input-group mb-3">
                  <input
                    type={verPassEditar ? "text" : "password"}
                    className="form-control"
                    value={editarContacto.contraseña}
                    onChange={(e) =>
                      setEditarContacto({
                        ...editarContacto,
                        contraseña: e.target.value,
                      })
                    }
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    style={{ width: "90px" }} // ← ancho fijo
                    onClick={() => setVerPassEditar(!verPassEditar)}
                  >
                    {verPassEditar ? "Ocultar" : "Ver"}
                  </button>
                </div>

                <label className="form-label">País</label>
                <input
                  type="text"
                  className="form-control"
                  value={editarContacto.pais}
                  onChange={(e) =>
                    setEditarContacto({
                      ...editarContacto,
                      pais: e.target.value,
                    })
                  }
                />
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

      {/* ============================
          MODAL ELIMINAR
      ============================ */}
      {modalEliminar && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Eliminar usuario</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalEliminar(false)}
                />
              </div>

              <div className="modal-body">
                ¿Seguro que querés eliminar a{" "}
                <strong>{contactoSeleccionado.nombre}</strong>?
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
