// src/context/taskcontext.jsx
import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tareas, setTareas] = useState([
    // Ejemplos iniciales
    {
      id: 1,
      titulo: "Llamar a María sobre presupuesto",
      descripcion: "Confirmar si recibió la propuesta y si tiene dudas.",
      contacto: "María Gómez",
      canal: "WhatsApp",
      tipo: "Llamada",
      vencimiento: "2025-12-05T15:00",
      estado: "Pendiente", // Pendiente | Completada
      creadaEn: "2025-12-03T12:00",
    },
  ]);

  const crearTarea = (nuevaTarea) => {
    const tareaConId = {
      ...nuevaTarea,
      id: Date.now(),
      estado: "Pendiente",
      creadaEn: new Date().toISOString(),
    };
    setTareas((prev) => [...prev, tareaConId]);
  };

  const completarTarea = (id) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, estado: "Completada" } : t
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tareas, crearTarea, completarTarea }}>
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
