// src/context/taskcontext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authcontext.jsx";
import {
  listTareasPorUsuario,
  createTarea,
  updateTarea,
  deleteTarea,
} from "../api/tareaApi.js";

/**
 * TaskContext:
 * - Trabaja con TareaResponse del backend.
 * - Lista tareas para el usuario actual (asignadoAId).
 * - Permite crear/actualizar/completar/eliminar.
 */

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarTareas = async () => {
    if (!user?.logged || !user?.id) {
      setTareas([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await listTareasPorUsuario(user.id);
      setTareas(data);
    } catch (err) {
      console.error("Error al cargar tareas", err);
      setError("No se pudieron cargar las tareas.");
      setTareas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTareas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  /**
   * crearTarea:
   * espera un objeto compatible con TareaCreateRequest:
   * { titulo, descripcion, clienteId?, conversacionId?, fechaLimite?, prioridad? }
   * asignadoAId se completa con user.id.
   */
  const crearTarea = async (input) => {
    if (!user?.id) {
      throw new Error("No hay usuario autenticado para asignar la tarea.");
    }

    const payload = {
      titulo: input.titulo,
      descripcion: input.descripcion || "",
      clienteId: input.clienteId ?? null,
      conversacionId: input.conversacionId ?? null,
      asignadoAId: user.id,
      fechaLimite: input.fechaLimite ?? null,
      prioridad: input.prioridad || "media",
    };

    const creada = await createTarea(payload);
    setTareas((prev) => [...prev, creada]);
    return creada;
  };

  const actualizarTarea = async (id, cambios) => {
    const original = tareas.find((t) => t.id === id);
    if (!original) return;

    const payload = {
      titulo: cambios.titulo ?? original.titulo,
      descripcion: cambios.descripcion ?? original.descripcion,
      estado: cambios.estado ?? original.estado,
      prioridad: cambios.prioridad ?? original.prioridad,
      fechaLimite: cambios.fechaLimite ?? original.fechaLimite,
      asignadoAId:
        cambios.asignadoAId ?? original.asignadoAId ?? user?.id ?? null,
      recordatorioEn: cambios.recordatorioEn ?? original.recordatorioEn,
    };

    const actualizada = await updateTarea(id, payload);
    setTareas((prev) => prev.map((t) => (t.id === id ? actualizada : t)));
    return actualizada;
  };

  const completarTarea = async (id) => {
    return actualizarTarea(id, { estado: "completada" });
  };

  const eliminarTarea = async (id) => {
    await deleteTarea(id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tareas,
        loading,
        error,
        cargarTareas,
        crearTarea,
        actualizarTarea,
        completarTarea,
        eliminarTarea,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
