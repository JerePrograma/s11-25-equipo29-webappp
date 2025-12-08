import React, { useState } from "react";
import { useAuth } from "../context/authcontext.jsx";
import { useLeads } from "../context/leadcontext.jsx";
import { useTasks } from "../context/taskcontext.jsx";

export default function PerfilVendedor() {
  const { user, logout } = useAuth();
  const { leads } = useLeads();
  const { tareas } = useTasks();

  const [editModal, setEditModal] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(user?.nombre || "");

  // Métricas simples
  const leadsActivos = leads.filter(l => l.estado === "Lead activo").length;
  const tareasPendientes = tareas.filter(t => !t.completada).length;

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-2">Mi Perfil</h2>
      <p className="text-muted mb-4">Información personal y actividad básica</p>

      {/* Info principal */}
      <div className="card shadow-sm p-4 d-flex flex-row gap-4 align-items-center mb-4">

        {/* Foto */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          width="100"
          className="rounded-circle border"
          alt="perfil"
        />

        {/* Datos */}
        <div>
          <h3 className="fw-bold mb-1">{user?.nombre}</h3>
          <p className="text-muted mb-1">{user?.email}</p>
          <span className="badge bg-primary">{user?.role}</span>

          <div className="mt-3 d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setEditModal(true)}
            >
              Editar perfil
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Métricas pequeñas */}
      <div className="row text-center">

        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">Leads activos</h6>
            <h3 className="fw-bold">{leadsActivos}</h3>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">Tareas pendientes</h6>
            <h3 className="fw-bold">{tareasPendientes}</h3>
          </div>
        </div>

      </div>

      {/* MODAL EDITAR */}
      {editModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Editar perfil</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditModal(false)}
                >
                  Cancelar
                </button>

                <button
                  className="btn btn-dark"
                  onClick={() => {
                    user.nombre = nuevoNombre;
                    setEditModal(false);
                  }}
                >
                  Guardar cambios
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
