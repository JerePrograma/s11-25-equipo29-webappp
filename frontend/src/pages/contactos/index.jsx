// src/pages/Contactos/index.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLeads } from "../../context/leadcontext";
import { useAuth } from "../../context/authcontext.jsx";

import Recientes from "./Recientes";
import ListaContactos from "./ListaContactos";
import ModalAgregar from "./modalAgregar";
import ModalEditar from "./ModalEditar";
import ModalEliminar from "./ModalEliminar";
import ModalEtapa from "./ModalEtapa";

import { showToast } from "../../utils/toast";

function Contactos() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // leads = array de ClienteResponse del backend
  const { leads = [], agregarLead, editarLead, eliminarLead } = useLeads();

  const [busqueda, setBusqueda] = useState("");

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEtapa, setModalEtapa] = useState(false);

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
  // Espera que ModalAgregar pase: {nombre,email,telefono,tipo?,estadoGeneral?,etapaFunnelId?,origen?}
  // --------------------------------------------
  const guardarNuevoContacto = async (nuevo) => {
    try {
      await agregarLead({
        nombre: nuevo.nombre,
        email: nuevo.email,
        telefono: nuevo.telefono,
        tipo: nuevo.tipo || "lead",
        estadoGeneral: nuevo.estadoGeneral || "en_seguimiento",
        etapaFunnelId: nuevo.etapaFunnelId ?? null,
        propietarioId,
        origen: nuevo.origen || nuevo.canal || "manual",
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
  // ModalEditar debería recibir y devolver campos compatibles
  // --------------------------------------------
  const guardarEdicion = async (editado) => {
    if (!contactoSeleccionado) return;

    try {
      await editarLead(contactoSeleccionado.id, {
        nombre: editado.nombre,
        email: editado.email,
        telefono: editado.telefono,
        tipo: editado.tipo,
        estadoGeneral: editado.estadoGeneral,
        etapaFunnelId: editado.etapaFunnelId,
        propietarioId: editado.propietarioId ?? propietarioId,
        origen: editado.origen,
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
  // CAMBIAR ESTADO GENERAL (en lugar de 'etapa' inventada)
  // ModalEtapa debería devolver: 'activo' | 'en_seguimiento' | 'perdido'
  // --------------------------------------------
  const guardarEtapa = async (nuevoEstadoGeneral) => {
    if (!contactoSeleccionado) return;

    try {
      await editarLead(contactoSeleccionado.id, {
        estadoGeneral: nuevoEstadoGeneral,
      });

      showToast("Estado actualizado ✔", "info");
      setModalEtapa(false);
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

      {/* RECIENTES (usa ClienteResponse tal cual) */}
      <Recientes contactos={contactosRecientes} leads={leadsRecientes} />

      {/* LISTA GENERAL */}
      <ListaContactos
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
          setModalEtapa(true);
        }}
      />

      {/* MODALES */}
      {modalAgregar && (
        <ModalAgregar
          onClose={() => setModalAgregar(false)}
          onSave={guardarNuevoContacto}
        />
      )}

      {modalEditar && contactoSeleccionado && (
        <ModalEditar
          contacto={contactoSeleccionado}
          onClose={() => setModalEditar(false)}
          onSave={guardarEdicion}
        />
      )}

      {modalEliminar && contactoSeleccionado && (
        <ModalEliminar
          contacto={contactoSeleccionado}
          onClose={() => setModalEliminar(false)}
          onDelete={eliminarContacto}
        />
      )}

      {modalEtapa && contactoSeleccionado && (
        <ModalEtapa
          contacto={contactoSeleccionado}
          onClose={() => setModalEtapa(false)}
          onSave={guardarEtapa}
        />
      )}
    </div>
  );
}

export default Contactos;
