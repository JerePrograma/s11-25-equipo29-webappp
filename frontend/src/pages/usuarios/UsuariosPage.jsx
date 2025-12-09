// src/pages/usuarios/UsuariosPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/authcontext.jsx";
import { useUsers } from "../../context/usercontext.jsx";
import { useRoles } from "../../context/rolescontext.jsx";

import { useUsuariosFiltrados } from "../../hooks/useUsuariosFiltrados.js";
import UsuariosBusquedaBar from "../../components/usuarios/UsuariosBusquedaBar.jsx";
import UsuariosTabla from "../../components/usuarios/UsuariosTabla.jsx";
import UsuarioNuevoModal from "../../components/usuarios/UsuarioNuevoModal.jsx";
import UsuarioEditarModal from "../../components/usuarios/UsuarioEditarModal.jsx";
import UsuarioEliminarModal from "../../components/usuarios/UsuarioEliminarModal.jsx";
import { showToast } from "../../utils/toast.js";

/**
 * Page: Usuarios del sistema
 * - Usa UserContext + RolesContext + AuthContext.
 * - Listado + búsqueda + ABM usuarios (solo admin).
 */
export default function UsuariosPage() {
  const { user } = useAuth();
  const esAdmin = (user?.role || "").toLowerCase() === "admin";

  const {
    users,
    loading: loadingUsuarios,
    error: errorUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
  } = useUsers();

  const { loading: loadingRoles, error: errorRoles } = useRoles();

  const [busqueda, setBusqueda] = useState("");
  const [modalNuevo, setModalNuevo] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  /** @type {[import("../../api/types.js").UsuarioResponse | null, Function]} */
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const usuariosFiltrados = useUsuariosFiltrados(users, busqueda);

  // ---------------------------
  // Handlers
  // ---------------------------

  /**
   * @param {import("../../components/usuarios/UsuarioNuevoModal.jsx").UsuarioNuevoForm} form
   */
  const handleGuardarNuevoUsuario = async (form) => {
    try {
      await crearUsuario({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        password: form.password,
        rolId: Number(form.rolId),
      });

      showToast("Usuario creado correctamente ✔", "success");
      setModalNuevo(false);
    } catch (err) {
      console.error("[Usuarios] Error creando usuario", err);
      showToast("No se pudo crear el usuario", "danger");
    }
  };

  /**
   * @param {import("../../components/usuarios/UsuarioEditarModal.jsx").UsuarioEditarForm} form
   */
  const handleGuardarEdicionUsuario = async (form) => {
    if (!usuarioSeleccionado) return;

    try {
      await editarUsuario(usuarioSeleccionado.id, {
        nombre: form.nombre,
        telefono: form.telefono,
        rolId: Number(form.rolId),
        estado: form.estado,
      });

      showToast("Usuario actualizado ✔", "info");
      setModalEditar(false);
      setUsuarioSeleccionado(null);
    } catch (err) {
      console.error("[Usuarios] Error editando usuario", err);
      showToast("No se pudo actualizar el usuario", "danger");
    }
  };

  const handleEliminarUsuario = async () => {
    if (!usuarioSeleccionado) return;

    try {
      await eliminarUsuario(usuarioSeleccionado.id);
      showToast("Usuario eliminado ❌", "danger");
      setModalEliminar(false);
      setUsuarioSeleccionado(null);
    } catch (err) {
      console.error("[Usuarios] Error eliminando usuario", err);
      showToast("No se pudo eliminar el usuario", "danger");
    }
  };

  // ---------------------------
  // Render
  // ---------------------------

  if (!user) {
    return (
      <div className="container py-4">
        Debes iniciar sesión para ver los usuarios.
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
        <h1 className="h3 fw-bold">Usuarios del sistema</h1>
        <p className="text-muted">
          Administra vendedores, externos y administradores.
        </p>

        {errorUsuarios && (
          <div className="alert alert-danger mt-2">{errorUsuarios}</div>
        )}
        {errorRoles && (
          <div className="alert alert-warning mt-2">
            {errorRoles} (algunos combos de rol pueden no estar disponibles).
          </div>
        )}
      </header>

      {/* BARRA DE BÚSQUEDA + BOTÓN */}
      <UsuariosBusquedaBar
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        puedeCrear={esAdmin}
        onNuevoUsuario={() => setModalNuevo(true)}
      />

      {/* ESTADO DE CARGA */}
      {loadingUsuarios || loadingRoles ? (
        <p className="text-muted">Cargando usuarios y roles…</p>
      ) : (
        <UsuariosTabla
          usuarios={usuariosFiltrados}
          esAdmin={esAdmin}
          onEditar={(u) => {
            setUsuarioSeleccionado(u);
            setModalEditar(true);
          }}
          onEliminar={(u) => {
            setUsuarioSeleccionado(u);
            setModalEliminar(true);
          }}
        />
      )}

      {/* MODALES */}
      {modalNuevo && esAdmin && (
        <UsuarioNuevoModal
          onClose={() => setModalNuevo(false)}
          onSave={handleGuardarNuevoUsuario}
        />
      )}

      {modalEditar && esAdmin && usuarioSeleccionado && (
        <UsuarioEditarModal
          usuario={usuarioSeleccionado}
          onClose={() => {
            setModalEditar(false);
            setUsuarioSeleccionado(null);
          }}
          onSave={handleGuardarEdicionUsuario}
        />
      )}

      {modalEliminar && esAdmin && usuarioSeleccionado && (
        <UsuarioEliminarModal
          usuario={usuarioSeleccionado}
          onClose={() => {
            setModalEliminar(false);
            setUsuarioSeleccionado(null);
          }}
          onDelete={handleEliminarUsuario}
        />
      )}
    </div>
  );
}
