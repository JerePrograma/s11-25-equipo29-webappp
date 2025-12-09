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
 * @typedef {import("../api/types.js").TareaResponse} TareaResponse
 * @typedef {import("../api/types.js").TareaCreateRequest} TareaCreateRequest
 * @typedef {import("../api/types.js").TareaUpdateRequest} TareaUpdateRequest
 */

/**
 * @typedef {Object} NuevaTareaInput
 * @property {string} titulo
 * @property {string} [descripcion]
 * @property {number | null | undefined} [clienteId]
 * @property {number | null | undefined} [conversacionId]
 * @property {string | null | undefined} [fechaLimite] // 'YYYY-MM-DD'
 * @property {"baja" | "media" | "alta"} [prioridad]
 */

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { user } = useAuth();

  const [tareas, setTareas] = useState(
    /** @type {TareaResponse[]} */ ([]),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(/** @type {string | null} */ (null));

  const cargarTareas = async () => {
    if (!user?.logged || !user?.id) {
      setTareas([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await listTareasPorUsuario(user.id);
      setTareas(Array.isArray(data) ? data : []);
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
   * Crear tarea asignada al usuario actual.
   * @param {NuevaTareaInput} input
   * @returns {Promise<TareaResponse>}
   */
  const crearTareaHandler = async (input) => {
    if (!user?.id) {
      throw new Error("No hay usuario autenticado para asignar la tarea.");
    }

    /** @type {TareaCreateRequest} */
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

  /**
   * Actualizar tarea.
   * @param {number} id
   * @param {Partial<TareaUpdateRequest>} cambios
   * @returns {Promise<TareaResponse | undefined>}
   */
  const actualizarTareaHandler = async (id, cambios) => {
    const original = tareas.find((t) => t.id === id);
    if (!original) return;

    /** @type {TareaUpdateRequest} */
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

  /**
   * Completar tarea (estado = 'completada').
   * @param {number} id
   */
  const completarTareaHandler = async (id) => {
    return actualizarTareaHandler(id, { estado: "completada" });
  };

  /**
   * Eliminar tarea.
   * @param {number} id
   */
  const eliminarTareaHandler = async (id) => {
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
        crearTarea: crearTareaHandler,
        actualizarTarea: actualizarTareaHandler,
        completarTarea: completarTareaHandler,
        eliminarTarea: eliminarTareaHandler,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks debe usarse dentro de <TaskProvider>");
  }
  return ctx;
}
