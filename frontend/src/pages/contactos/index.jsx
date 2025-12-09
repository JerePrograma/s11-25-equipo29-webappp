// src/pages/Contactos/index.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/authcontext.jsx";
import { useLeads } from "../../context/leadcontext.jsx";

import { useContactosFiltrados } from "../../hooks/useContactosFiltrados.js";
import { normalizarTipoContacto } from "../../utils/contactos.js";
import { showToast } from "../../utils/toast.js";

import ContactosBusquedaBar from "../../components/contactos/ContactosBusquedaBar.jsx";
import ContactosRecientes from "../../components/contactos/ContactosRecientes.jsx";
import ContactosLista from "../../components/contactos/ContactosLista.jsx";
import ContactoNuevoModal from "../../components/contactos/ContactoNuevoModal.jsx";
import ContactoEditModal from "../../components/contactos/ContactoEditModal.jsx";
import ContactoDeleteModal from "../../components/contactos/ContactoDeleteModal.jsx";
import ContactoEstadoModal from "../../components/contactos/ContactoEstadoModal.jsx";

/**
 * Página principal de contactos (leads + clientes).
 * Orquesta contextos, filtros y modales.
 */
export default function Contactos() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    contactos,
    leads,
    loading,
    error,
    crearContacto,
    actualizarContacto,
    eliminarContacto,
  } = useLeads();

  const [busqueda, setBusqueda] = useState("");

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEstado, setModalEstado] = useState(false);

  /** @type {[import("../../api/types.js").ClienteResponse | null, Function]} */
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  // Mientras no tengas user.id, uso 1 como demo
  const propietarioId = user?.id ?? 1;

  // Filtro de búsqueda
  const contactosFiltrados = useContactosFiltrados(contactos, busqueda);

  // Ordenar por creadoEn DESC para "recientes"
  const recientesOrdenados = useMemo(
    () =>
      [...contactosFiltrados].sort((a, b) => {
        const fa = a.creadoEn ? new Date(a.creadoEn).getTime() : 0;
        const fb = b.creadoEn ? new Date(b.creadoEn).getTime() : 0;
        return fb - fa;
      }),
    [contactosFiltrados],
  );

  const contactosRecientes = recientesOrdenados;
  const leadsRecientes = recientesOrdenados.filter(
    (c) => (c.tipo || "").toLowerCase() === "lead",
  );

  // CREAR CONTACTO
  const guardarNuevoContacto = async (nuevo) => {
    try {
      await crearContacto({
        nombre: nuevo.nombre,
        email: nuevo.email,
        telefono: nuevo.telefono,
        tipo: normalizarTipoContacto(nuevo.tipo),
        estadoGeneral: "en_seguimiento",
        etapaFunnelId: null,
        propietarioId,
        origen: nuevo.origen || nuevo.canal || "manual",
      });

      showToast("Contacto agregado correctamente ✔", "success");
      setModalAgregar(false);
    } catch (errorCrear) {
      console.error("[Contactos] Error al crear contacto", errorCrear);
      showToast("No se pudo crear el contacto", "danger");
    }
  };

  // EDITAR CONTACTO
  const guardarEdicion = async (form) => {
    if (!contactoSeleccionado) return;

    try {
      await actualizarContacto(contactoSeleccionado.id, {
        nombre: form.nombre,
        tipo: normalizarTipoContacto(form.tipoContacto),
        // Podrías mapear canal → origen aquí si lo necesitás.
        // origen: form.canal || contactoSeleccionado.origen,
      });

      showToast("Contacto editado correctamente ✔", "info");
      setModalEditar(false);
    } catch (errorEditar) {
      console.error("[Contactos] Error al editar contacto", errorEditar);
      showToast("No se pudo editar el contacto", "danger");
    }
  };

  // ELIMINAR CONTACTO
  const eliminarContactoHandler = async () => {
    if (!contactoSeleccionado) return;

    try {
      await eliminarContacto(contactoSeleccionado.id);
      showToast("Contacto eliminado ❌", "danger");
      setModalEliminar(false);
    } catch (errorEliminar) {
      console.error("[Contactos] Error al eliminar contacto", errorEliminar);
      showToast("No se pudo eliminar el contacto", "danger");
    }
  };

  // CAMBIAR ESTADO GENERAL
  const guardarEstadoGeneral = async (nuevoEstadoGeneral) => {
    if (!contactoSeleccionado) return;

    try {
      await actualizarContacto(contactoSeleccionado.id, {
        estadoGeneral: nuevoEstadoGeneral,
      });

      showToast("Estado actualizado ✔", "info");
      setModalEstado(false);
    } catch (errorEstado) {
      console.error("[Contactos] Error al actualizar estado", errorEstado);
      showToast("No se pudo actualizar el estado", "danger");
    }
  };

  // Navegación a módulo de mensajes
  const irAConversaciones = (c) => {
    navigate(
      `/mensajes?contacto=${encodeURIComponent(
        c.nombre,
      )}&canal=${encodeURIComponent(c.origen || "WhatsApp")}`,
    );
  };

  if (loading) {
    return <p className="p-4">Cargando contactos…</p>;
  }

  return (
    <div className="container-fluid py-4">
      <div
        id="toastContainer"
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 2000 }}
      ></div>

      <header>
        <h1 className="h3 fw-bold">Contactos</h1>
        <p className="text-muted">Gestión unificada de leads y clientes.</p>
      </header>

      {error && (
        <div className="alert alert-danger my-3">
          {error}
        </div>
      )}

      {/* BUSCADOR + BOTÓN */}
      <ContactosBusquedaBar
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        onNuevoContacto={() => setModalAgregar(true)}
      />

      {/* RECIENTES */}
      <ContactosRecientes
        contactos={contactosRecientes}
        leads={leadsRecientes}
      />

      {/* LISTA GENERAL */}
      <ContactosLista
        contactos={contactosFiltrados}
        onVer={(c) => navigate(`/contactos/${c.id}`)}
        onEditar={(c) => {
          setContactoSeleccionado(c);
          setModalEditar(true);
        }}
        onEliminar={(c) => {
          setContactoSeleccionado(c);
          setModalEliminar(true);
        }}
        onEnviarMensaje={(c) => irAConversaciones(c)}
        onCambiarEstado={(c) => {
          setContactoSeleccionado(c);
          setModalEstado(true);
        }}
      />

      {/* MODALES */}
      {modalAgregar && (
        <ContactoNuevoModal
          onClose={() => setModalAgregar(false)}
          onSave={guardarNuevoContacto}
        />
      )}

      {modalEditar && contactoSeleccionado && (
        <ContactoEditModal
          contacto={contactoSeleccionado}
          onClose={() => setModalEditar(false)}
          onSave={guardarEdicion}
        />
      )}

      {modalEliminar && contactoSeleccionado && (
        <ContactoDeleteModal
          contacto={contactoSeleccionado}
          onClose={() => setModalEliminar(false)}
          onDelete={eliminarContactoHandler}
        />
      )}

      {modalEstado && contactoSeleccionado && (
        <ContactoEstadoModal
          contacto={contactoSeleccionado}
          onClose={() => setModalEstado(false)}
          onSave={guardarEstadoGeneral}
        />
      )}
    </div>
  );
}
