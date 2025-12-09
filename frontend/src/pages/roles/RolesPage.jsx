// src/pages/roles/RolesPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/authcontext.jsx";
import { useRoles } from "../../context/rolescontext.jsx";

import { useRolesFiltrados } from "../../hooks/useRolesFiltrados.js";
import RolesBusquedaBar from "../../components/roles/RolesBusquedaBar.jsx";
import RolesTabla from "../../components/roles/RolesTabla.jsx";
import RolNuevoModal from "../../components/roles/RolNuevoModal.jsx";
import RolEditarModal from "../../components/roles/RolEditarModal.jsx";
import RolEliminarModal from "../../components/roles/RolEliminarModal.jsx";
import { showToast } from "../../utils/toast.js";

/**
 * Page: Roles
 * - Usa RolesContext + AuthContext.
 * - Listado + filtro + ABM de roles (solo admin).
 */
export default function RolesPage() {
  const { user } = useAuth();
  const esAdmin = (user?.role || "").toLowerCase() === "admin";

  const {
    roles,
    loading,
    error,
    crearRol,
    editarRol,
    recargar,
    eliminarRol,
  } = useRoles();

  const [busqueda, setBusqueda] = useState("");
  const [modalNuevo, setModalNuevo] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  /** @type {[import("../../api/types.js").RolResponse | null, Function]} */
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const rolesFiltrados = useRolesFiltrados(roles, busqueda);

  // ---------------------------
  // Handlers
  // ---------------------------

  /**
   * @param {import("../../components/roles/RolNuevoModal.jsx").RolNuevoForm} form
   */
  const handleGuardarNuevoRol = async (form) => {
    try {
      await crearRol({
        nombre: form.nombre,
        descripcion: form.descripcion,
        permisosJson: form.permisosJson,
      });

      showToast("Rol creado correctamente ✔", "success");
      setModalNuevo(false);
    } catch (err) {
      console.error("[Roles] Error creando rol", err);
      showToast("No se pudo crear el rol", "danger");
    }
  };

  /**
   * @param {import("../../components/roles/RolEditarModal.jsx").RolEditarForm} form
   */
  const handleGuardarEdicionRol = async (form) => {
    if (!rolSeleccionado) return;

    try {
      await editarRol(rolSeleccionado.id, {
        descripcion: form.descripcion,
        permisosJson: form.permisosJson,
      });

      showToast("Rol actualizado ✔", "info");
      setModalEditar(false);
      setRolSeleccionado(null);
    } catch (err) {
      console.error("[Roles] Error editando rol", err);
      showToast("No se pudo actualizar el rol", "danger");
    }
  };

  const handleEliminarRol = async () => {
    if (!rolSeleccionado) return;

    try {
      await eliminarRol(rolSeleccionado.id);
      showToast("Rol eliminado ❌", "danger");
      setModalEliminar(false);
      setRolSeleccionado(null);
    } catch (err) {
      console.error("[Roles] Error eliminando rol", err);
      showToast("No se pudo eliminar el rol", "danger");
    }
  };

  // ---------------------------
  // Render
  // ---------------------------

  if (!user) {
    return (
      <div className="container py-4">
        Debes iniciar sesión para ver los roles.
      </div>
    );
  }

  if (!esAdmin) {
    return (
      <div className="container py-4">
        No tenés permisos para administrar roles.
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 animate__animated animate__fadeIn">
      <div
        id="toastContainer"
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 2000 }}
      ></div>

      {/* HEADER */}
      <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
          <div>
            <h1 className="h3 fw-bold">Roles y permisos</h1>
            <p className="text-muted mb-0">
              Define qué puede hacer cada tipo de usuario en el sistema.
            </p>
          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={recargar}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Recargar
          </button>
        </div>

        {error && (
          <div className="alert alert-danger mt-2">{error}</div>
        )}
      </header>

      {/* BARRA DE BÚSQUEDA + BOTÓN */}
      <RolesBusquedaBar
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        puedeCrear={esAdmin}
        onNuevoRol={() => setModalNuevo(true)}
      />

      {/* LISTA / ESTADO */}
      {loading ? (
        <p className="text-muted">Cargando roles…</p>
      ) : (
        <RolesTabla
          roles={rolesFiltrados}
          puedeEditar={esAdmin}
          onEditar={(r) => {
            setRolSeleccionado(r);
            setModalEditar(true);
          }}
          onEliminar={(r) => {
            setRolSeleccionado(r);
            setModalEliminar(true);
          }}
        />
      )}

      {/* MODALES */}
      {modalNuevo && (
        <RolNuevoModal
          onClose={() => setModalNuevo(false)}
          onSave={handleGuardarNuevoRol}
        />
      )}

      {modalEditar && rolSeleccionado && (
        <RolEditarModal
          rol={rolSeleccionado}
          onClose={() => {
            setModalEditar(false);
            setRolSeleccionado(null);
          }}
          onSave={handleGuardarEdicionRol}
        />
      )}

      {modalEliminar && rolSeleccionado && (
        <RolEliminarModal
          rol={rolSeleccionado}
          onClose={() => {
            setModalEliminar(false);
            setRolSeleccionado(null);
          }}
          onDelete={handleEliminarRol}
        />
      )}
    </div>
  );
}
