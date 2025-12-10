// src/pages/roles/RolesPage.jsx
import React, { useMemo, useState } from "react";
import { useAuth } from "../../context/authcontext.jsx";
import { useRoles } from "../../context/rolescontext.jsx";
import { showToast } from "../../utils/toast";

/**
 * Administración de roles:
 * - Lista roles (RolResponse).
 * - Crear rol.
 * - Editar descripción/permisos.
 * - Eliminar rol.
 */
export default function RolesPage() {
  const { user: authUser } = useAuth();
  const esAdmin = (authUser?.role || "").toLowerCase() === "admin";

  const {
    roles,
    loading,
    error,
    crearRol,
    editarRol,
    eliminarRol,
  } = useRoles();

  const [busqueda, setBusqueda] = useState("");

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const [nuevoRol, setNuevoRol] = useState({
    nombre: "",
    descripcion: "",
    permisosJson: "{}",
  });

  const [editarForm, setEditarForm] = useState({
    descripcion: "",
    permisosJson: "",
  });

  if (!esAdmin) {
    return (
      <div className="container py-4">
        <h1 className="h4 fw-bold mb-2">Roles</h1>
        <p className="text-muted">
          No tenés permisos para administrar roles.
        </p>
      </div>
    );
  }

  const rolesFiltrados = useMemo(() => {
    const txt = busqueda.trim().toLowerCase();
    if (!txt) return roles;

    return roles.filter((r) => {
      const hay = `${r.nombre || ""} ${r.descripcion || ""}`.toLowerCase();
      return hay.includes(txt);
    });
  }, [roles, busqueda]);

  const abrirModalAgregar = () => {
    setNuevoRol({
      nombre: "",
      descripcion: "",
      permisosJson: "{}",
    });
    setModalAgregar(true);
  };

  const guardarNuevoRol = async () => {
    try {
      if (!nuevoRol.nombre.trim()) {
        alert("El nombre del rol es obligatorio");
        return;
      }

      await crearRol({
        nombre: nuevoRol.nombre.trim(),
        descripcion: nuevoRol.descripcion.trim(),
        permisosJson: nuevoRol.permisosJson || "{}",
      });

      showToast("Rol creado correctamente ✔", "success");
      setModalAgregar(false);
    } catch (err) {
      console.error("[Roles] Error creando rol", err);
      showToast("No se pudo crear el rol", "danger");
    }
  };

  const abrirModalEditar = (rol) => {
    setRolSeleccionado(rol);
    setEditarForm({
      descripcion: rol.descripcion || "",
      permisosJson: rol.permisosJson || "{}",
    });
    setModalEditar(true);
  };

  const guardarEdicionRol = async () => {
    if (!rolSeleccionado) return;

    try {
      await editarRol(rolSeleccionado.id, {
        descripcion: editarForm.descripcion.trim(),
        permisosJson: editarForm.permisosJson || "{}",
      });

      showToast("Rol actualizado ✔", "info");
      setModalEditar(false);
    } catch (err) {
      console.error("[Roles] Error actualizando rol", err);
      showToast("No se pudo actualizar el rol", "danger");
    }
  };

  const abrirModalEliminar = (rol) => {
    setRolSeleccionado(rol);
    setModalEliminar(true);
  };

  const confirmarEliminarRol = async () => {
    if (!rolSeleccionado) return;

    try {
      await eliminarRol(rolSeleccionado.id);
      showToast("Rol eliminado ❌", "danger");
      setModalEliminar(false);
    } catch (err) {
      console.error("[Roles] Error eliminando rol", err);
      showToast("No se pudo eliminar el rol", "danger");
    }
  };

  const resumenPermisos = (permisosJson) => {
    if (!permisosJson) return "Sin permisos";
    try {
      const obj = JSON.parse(permisosJson);
      const keys = Object.keys(obj);
      if (keys.length === 0) return "Sin permisos";
      return `${keys.length} módulo(s)`;
    } catch {
      return "JSON inválido";
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* HEADER */}
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h3 fw-bold">Roles y permisos</h1>
          <p className="text-muted">
            Definí qué puede hacer cada tipo de usuario en el CRM.
          </p>
        </div>

        <button className="btn btn-dark" onClick={abrirModalAgregar}>
          <i className="bi bi-shield-lock me-2" />
          Nuevo rol
        </button>
      </header>

      {/* BUSCADOR */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar rol por nombre o descripción..."
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* ESTADO DE CARGA / ERROR */}
      {loading && <p>Cargando roles…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* TABLA */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Permisos</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rolesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted">
                    No se encontraron roles.
                  </td>
                </tr>
              ) : (
                rolesFiltrados.map((r) => (
                  <tr key={r.id}>
                    <td>{r.nombre}</td>
                    <td>{r.descripcion || "—"}</td>
                    <td>{resumenPermisos(r.permisosJson)}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => abrirModalEditar(r)}
                      >
                        <i className="bi bi-pencil" />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => abrirModalEliminar(r)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL AGREGAR */}
      {modalAgregar && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Nuevo rol</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setModalAgregar(false)}
                ></button>
              </div>

              <div className="modal-body">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={nuevoRol.nombre}
                  onChange={(e) =>
                    setNuevoRol((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                />

                <label className="form-label fw-semibold">Descripción</label>
                <textarea
                  className="form-control mb-3"
                  value={nuevoRol.descripcion}
                  onChange={(e) =>
                    setNuevoRol((prev) => ({
                      ...prev,
                      descripcion: e.target.value,
                    }))
                  }
                />

                <label className="form-label fw-semibold">
                  Permisos (JSON)
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={nuevoRol.permisosJson}
                  onChange={(e) =>
                    setNuevoRol((prev) => ({
                      ...prev,
                      permisosJson: e.target.value,
                    }))
                  }
                />
                <small className="text-muted">
                  Ejemplo: {"{ \"contactos\": [\"ver\",\"editar\"], \"tareas\": [\"crear\"] }"}
                </small>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalAgregar(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-dark" onClick={guardarNuevoRol}>
                  Guardar rol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {modalEditar && rolSeleccionado && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Editar rol</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalEditar(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  <strong>Rol:</strong> {rolSeleccionado.nombre}
                </p>

                <label className="form-label fw-semibold">Descripción</label>
                <textarea
                  className="form-control mb-3"
                  value={editarForm.descripcion}
                  onChange={(e) =>
                    setEditarForm((prev) => ({
                      ...prev,
                      descripcion: e.target.value,
                    }))
                  }
                />

                <label className="form-label fw-semibold">
                  Permisos (JSON)
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={editarForm.permisosJson}
                  onChange={(e) =>
                    setEditarForm((prev) => ({
                      ...prev,
                      permisosJson: e.target.value,
                    }))
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
                <button
                  className="btn btn-primary"
                  onClick={guardarEdicionRol}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {modalEliminar && rolSeleccionado && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Eliminar rol</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalEliminar(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  ¿Seguro que querés eliminar el rol{" "}
                  <strong>{rolSeleccionado.nombre}</strong>?
                </p>
                <p className="text-muted small mb-0">
                  Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalEliminar(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={confirmarEliminarRol}
                >
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
