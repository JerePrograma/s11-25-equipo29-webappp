// src/pages/usuarios.jsx
import React, { useState } from "react";
import { useAuth } from "../context/authcontext.jsx";

function Usuarios() {
  const { user } = useAuth();
  const esAdmin = user?.role === "admin";

  const [busqueda, setBusqueda] = useState("");

  const [contactos, setContactos] = useState([
    { nombre: "María Gómez", correo: "WhatsApp@gmail.com", contraseña: "1234567", pais: "España", role: "vendedor" },
    { nombre: "Juan Pérez", correo: "juan@gmail.com", contraseña: "abcdef", pais: "México", role: "externo" },
  ]);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [verPassAgregar, setVerPassAgregar] = useState(false);
  const [verPassEditar, setVerPassEditar] = useState(false);

  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    pais: "",
    role: "vendedor",
  });

  const [editarContacto, setEditarContacto] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    pais: "",
    role: "vendedor",
  });

  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const guardarNuevoContacto = () => {
    setContactos([...contactos, nuevoContacto]);
    setNuevoContacto({ nombre: "", correo: "", contraseña: "", pais: "", role: "vendedor" });
    setVerPassAgregar(false);
    setModalAgregar(false);
  };

  const guardarEdicion = () => {
    setContactos(contactos.map((c) => (c === contactoSeleccionado ? editarContacto : c)));
    setVerPassEditar(false);
    setModalEditar(false);
  };

  const eliminarContacto = () => {
    setContactos(contactos.filter((c) => c !== contactoSeleccionado));
    setModalEliminar(false);
  };

  return (
    <div className="container-fluid py-4 animate__animated animate__fadeIn">

      {/* HEADER */}
      <header className="mb-4">
        <h1 className="h3 fw-bold">Usuarios del sistema</h1>
        <p className="text-muted">Administra vendedores, externos y administradores.</p>
      </header>

      {/* BUSCADOR + BOTÓN */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="form-control w-50 shadow-sm"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {esAdmin && (
          <button className="btn btn-dark shadow-sm" onClick={() => setModalAgregar(true)}>
            <i className="bi bi-person-plus me-2"></i>
            Nuevo Usuario
          </button>
        )}
      </div>

      {/* TABLA */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>País</th>
                {esAdmin && <th className="text-end">Acciones</th>}
              </tr>
            </thead>

            <tbody>
              {contactosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    <i className="bi bi-search"></i> No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                contactosFiltrados.map((c, i) => (
                  <tr key={i}>
                    <td>{c.nombre}</td>
                    <td>{c.correo}</td>

                    <td>
                      <span className="badge bg-info text-dark fw-semibold px-3 py-2">
                        {c.role}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-success rounded-pill fw-semibold px-3 py-2">
                        {c.pais}
                      </span>
                    </td>

                    {esAdmin && (
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setContactoSeleccionado(c);
                            setModalEditar(true);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setContactoSeleccionado(c);
                            setModalEliminar(true);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================ MODAL AGREGAR ============================ */}
      {modalAgregar && (
        <div className="modal fade show d-block" style={{ background: "#00000090" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Agregar usuario</h5>
                <button className="btn-close btn-close-white" onClick={() => setModalAgregar(false)}></button>
              </div>

              <div className="modal-body">

                <label className="form-label fw-semibold">Nombre</label>
                <input type="text" className="form-control mb-3 shadow-sm"
                  value={nuevoContacto.nombre}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, nombre: e.target.value })}
                />

                <label className="form-label fw-semibold">Correo electrónico</label>
                <input type="email" className="form-control mb-3 shadow-sm"
                  value={nuevoContacto.correo}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, correo: e.target.value })}
                />

                <label className="form-label fw-semibold">Contraseña</label>
                <input type="password" className="form-control mb-3 shadow-sm"
                  value={nuevoContacto.contraseña}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, contraseña: e.target.value })}
                />

                <label className="form-label fw-semibold">País</label>
                <input type="text" className="form-control mb-3 shadow-sm"
                  value={nuevoContacto.pais}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, pais: e.target.value })}
                />

                <label className="form-label fw-semibold">Rol</label>
                <select className="form-select shadow-sm"
                  value={nuevoContacto.role}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, role: e.target.value })}
                >
                  <option value="admin">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="externo">Externo</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalAgregar(false)}>
                  Cancelar
                </button>

                <button className="btn btn-dark" onClick={guardarNuevoContacto}>
                  Guardar usuario
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Usuarios;
