// src/pages/contactos/ContactosPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLeads } from "../../context/leadcontext.jsx";
import { useAuth } from "../../context/authcontext.jsx";

import ContactosRecientes from "../../components/contactos/ContactosRecientes.jsx";
import ContactosLista from "../../components/contactos/ContactosLista.jsx";
import ContactoNuevoModal from "../../components/contactos/ContactoNuevoModal.jsx";
import ContactoEditModal from "../../components/contactos/ContactoEditModal.jsx";
import ContactoDeleteModal from "../../components/contactos/ContactoDeleteModal.jsx";
import ContactoEstadoModal from "../../components/contactos/ContactoEstadoModal.jsx";

import { showToast } from "../../utils/toast";

export default function ContactosPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // leads = array de ClienteResponse del backend
  const { leads = [], agregarLead, editarLead, eliminarLead } = useLeads();

  const [busqueda, setBusqueda] = useState("");

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEstado, setModalEstado] = useState(false); // antes "modalEtapa"

  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  // Mientras no tengas user.id, uso 1 como demo
  const propietarioId = user?.id ?? 1;

  // --------------------------------------------
  // FILTRO DE BÚSQUEDA (sobre ClienteResponse)
  // --------------------------------------------
  const leadsFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return leads;

    return leads.filter((c) => {
      const hay = [
        c.nombre,
        c.email,
        c.telefono,
        c.origen,
        c.propietarioNombre,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(texto);
    });
  }, [leads, busqueda]);

  // --------------------------------------------
  // ORDENAR RECIENTES POR creadoEn DESC
  // --------------------------------------------
  const recientesOrdenados = useMemo(
    () =>
      [...leadsFiltrados].sort((a, b) => {
        const fa = a.creadoEn ? new Date(a.creadoEn).getTime() : 0;
        const fb = b.creadoEn ? new Date(b.creadoEn).getTime() : 0;
        return fb - fa;
      }),
    [leadsFiltrados]
  );

  const contactosRecientes = recientesOrdenados;
  const leadsRecientes = recientesOrdenados.filter(
    (c) => c.tipo && c.tipo.toLowerCase() === "lead"
  );

  // --------------------------------------------
  // AGREGAR CONTACTO (ClienteCreateRequest)
  // ContactoNuevoModal → onSave(payloadUI)
  // payloadUI: {nombre,email,telefono,canal,etapa,tipoContacto,estadoCalor,origen,creadoEn,tipo?}
  // --------------------------------------------
  const guardarNuevoContacto = async (nuevoUI) => {
    try {
      const tipoNormalizado =
        nuevoUI.tipoContacto?.toLowerCase() === "cliente"
          ? "cliente"
          : nuevoUI.tipo || "lead";

      await agregarLead({
        nombre: nuevoUI.nombre,
        email: nuevoUI.email,
        telefono: nuevoUI.telefono,
        tipo: tipoNormalizado,
        // Por ahora, estado lógico genérico:
        estadoGeneral: "en_seguimiento",
        // Etapa comercial real (funnel) si la usás en backend:
        etapaFunnelId: null,
        propietarioId,
        origen: nuevoUI.origen || nuevoUI.canal || "manual",
      });

      showToast("Contacto agregado correctamente ✔", "success");
      setModalAgregar(false);
    } catch (error) {
      console.error("[Contactos] Error al crear contacto", error);
      showToast("No se pudo crear el contacto", "danger");
    }
  };

  // --------------------------------------------
  // EDITAR CONTACTO (ClienteUpdateRequest)
  // ContactoEditModal → onSave(form)
  // form: {nombre, canal, etapa, tipoContacto, estadoCalor}
  //
  // Ojo: canal/etapa/estadoCalor son más de UI. Aquí solo actualizo:
  // - nombre
  // - tipo (lead / cliente) según tipoContacto
  // - origen ≈ canal (si querés algo más serio, expandí tu DTO)
  // --------------------------------------------
  const guardarEdicion = async (form) => {
    if (!contactoSeleccionado) return;

    try {
      const tipoNormalizado =
        form.tipoContacto?.toLowerCase() === "cliente"
          ? "cliente"
          : "lead";

      await editarLead(contactoSeleccionado.id, {
        nombre: form.nombre,
        tipo: tipoNormalizado,
        origen: form.canal || contactoSeleccionado.origen,
        // Podrías mapear estadoCalor → estadoGeneral más adelante
        // estadoGeneral: mapEstadoCalor(form.estadoCalor),
      });

      showToast("Contacto editado correctamente ✔", "info");
      setModalEditar(false);
    } catch (error) {
      console.error("[Contactos] Error al editar contacto", error);
      showToast("No se pudo editar el contacto", "danger");
    }
  };

  // --------------------------------------------
  // ELIMINAR CONTACTO
  // ContactoDeleteModal → onDelete()
  // --------------------------------------------
  const eliminarContacto = async () => {
    if (!contactoSeleccionado) return;

    try {
      await eliminarLead(contactoSeleccionado.id);
      showToast("Contacto eliminado ❌", "danger");
      setModalEliminar(false);
    } catch (error) {
      console.error("[Contactos] Error al eliminar contacto", error);
      showToast("No se pudo eliminar el contacto", "danger");
    }
  };

  // --------------------------------------------
  // CAMBIAR ESTADO GENERAL
  // ContactoEstadoModal → onSave(estadoGeneral)
  // estadoGeneral: 'activo' | 'en_seguimiento' | 'perdido'
  // --------------------------------------------
  const guardarEstado = async (nuevoEstadoGeneral) => {
    if (!contactoSeleccionado) return;

    try {
      await editarLead(contactoSeleccionado.id, {
        estadoGeneral: nuevoEstadoGeneral,
      });

      showToast("Estado actualizado ✔", "info");
      setModalEstado(false);
    } catch (error) {
      console.error("[Contactos] Error al actualizar estado", error);
      showToast("No se pudo actualizar el estado", "danger");
    }
  };

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

      {/* BUSCADOR + BOTÓN */}
      <section className="d-flex justify-content-between mb-4">
        <input
          className="form-control w-50"
          type="text"
          placeholder="Buscar por nombre, email, teléfono u origen..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button className="btn btn-dark" onClick={() => setModalAgregar(true)}>
          + Nuevo contacto
        </button>
      </section>

      {/* RECIENTES */}
      <ContactosRecientes
        contactos={contactosRecientes}
        leads={leadsRecientes}
      />

      {/* LISTA GENERAL */}
      <ContactosLista
        contactos={leadsFiltrados}
        navigate={navigate}
        onVer={(c) => navigate(`/contactos/${c.id}`)}
        onEditar={(c) => {
          setContactoSeleccionado(c);
          setModalEditar(true);
        }}
        onEliminar={(c) => {
          setContactoSeleccionado(c);
          setModalEliminar(true);
        }}
        onCambiarEtapa={(c) => {
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
          onDelete={eliminarContacto}
        />
      )}

      {modalEstado && contactoSeleccionado && (
        <ContactoEstadoModal
          contacto={contactoSeleccionado}
          onClose={() => setModalEstado(false)}
          onSave={guardarEstado}
        />
      )}
    </div>
  );
}
