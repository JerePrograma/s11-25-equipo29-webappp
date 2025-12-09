// src/pages/Tareas.jsx
import React, { useState } from "react";
import { useAuth } from "../context/authcontext.jsx";
import { useTasks } from "../context/taskcontext.jsx";
import { useLeads } from "../context/leadcontext.jsx";

import { useTareasFiltradas } from "../hooks/useTareasFiltradas.js";
import TareasResumenMetrics from "../components/tareas/TareasResumenMetrics.jsx";
import TareasFiltros from "../components/tareas/TareasFiltros.jsx";
import TareaNuevaForm from "../components/tareas/TareaNuevaForm.jsx";
import TareasLista from "../components/tareas/TareasLista.jsx";
import TareaEditModal from "../components/tareas/TareaEditModal.jsx";

/**
 * Page de Tareas: orquesta contextos + componentes de UI.
 */
export default function Tareas() {
  const { user } = useAuth();
  const isExterno = user?.role === "externo";

  const {
    tareas,
    loading: tareasLoading,
    error: tareasError,
    crearTarea,
    actualizarTarea,
    completarTarea,
    eliminarTarea,
  } = useTasks();

  const {
    leads,
    loading: leadsLoading,
    error: leadsError,
  } = useLeads();

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState("pendientes");
  const [filtroFecha, setFiltroFecha] = useState("todas");
  const [filtroPrioridad, setFiltroPrioridad] = useState("todas");

  const tareasFiltradas = useTareasFiltradas(tareas, {
    estado: filtroEstado,
    fecha: filtroFecha,
    prioridad: filtroPrioridad,
  });

  // Modal edición
  const [editando, setEditando] =
    useState /** @type {import("../api/types.js").TareaResponse | null} */(null);

  const errorCarga = tareasError || leadsError;

  const handleCrearTarea = async (input) => {
    if (!user) {
      alert("Debes iniciar sesión.");
      return;
    }
    try {
      await crearTarea(input);
    } catch (err) {
      console.error("Error creando tarea:", err);
      alert("Error creando la tarea.");
    }
  };

  const handleCompletar = async (id) => {
    try {
      await completarTarea(id);
    } catch (err) {
      console.error("Error completando tarea:", err);
      alert("Error al completar la tarea.");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await eliminarTarea(id);
    } catch (err) {
      console.error("Error eliminando tarea:", err);
      alert("Error al eliminar la tarea.");
    }
  };

  const handleAbrirEditar = (tarea) => {
    setEditando({ ...tarea });
  };

  const handleEditarChange = (changes) => {
    setEditando((prev) => (prev ? { ...prev, ...changes } : prev));
  };

  const handleGuardarEdicion = async () => {
    if (!editando) return;

    try {
      await actualizarTarea(editando.id, {
        titulo: editando.titulo,
        descripcion: editando.descripcion,
        estado: editando.estado,
        prioridad: editando.prioridad,
        fechaLimite: editando.fechaLimite,
        asignadoAId: editando.asignadoAId,
        recordatorioEn: editando.recordatorioEn,
      });
      setEditando(null);
    } catch (err) {
      console.error("Error actualizando tarea:", err);
      alert("Error guardando cambios de la tarea.");
    }
  };

  if (!user) {
    return <p className="p-4">Debes iniciar sesión para ver tus tareas.</p>;
  }

  if (tareasLoading || leadsLoading) {
    return <p className="p-4">Cargando tareas y contactos…</p>;
  }

  return (
    <div className="container py-4">

      {/* AVISO VISITANTE */}
      {isExterno && (
        <div className="alert alert-warning text-center fw-bold mb-4">
          🔒 Estás en <strong>modo visitante</strong>. Solo puedes ver tareas — no
          puedes editar ni completar.
        </div>
      )}

      {errorCarga && (
        <div className="alert alert-danger">{errorCarga}</div>
      )}

      {/* MÉTRICAS */}
      <TareasResumenMetrics tareas={tareas} />

      {/* FORM NUEVA TAREA (solo internos) */}
      {!isExterno && (
        <TareaNuevaForm leads={leads} onCrear={handleCrearTarea} />
      )}

      {/* FILTROS */}
      <TareasFiltros
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        filtroFecha={filtroFecha}
        setFiltroFecha={setFiltroFecha}
        filtroPrioridad={filtroPrioridad}
        setFiltroPrioridad={setFiltroPrioridad}
      />

      {/* LISTADO */}
      <h4 className="fw-bold mb-3">Tareas</h4>
      <TareasLista
        tareas={tareasFiltradas}
        isExterno={isExterno}
        onCompletar={handleCompletar}
        onEditarClick={handleAbrirEditar}
        onEliminar={handleEliminar}
      />

      {/* MODAL EDITAR */}
      {editando && !isExterno && (
        <TareaEditModal
          tarea={editando}
          onChange={handleEditarChange}
          onClose={() => setEditando(null)}
          onSave={handleGuardarEdicion}
        />
      )}
    </div>
  );
}
