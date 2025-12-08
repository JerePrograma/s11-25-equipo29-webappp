import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function TaskProvider({ children }) {
  const [tareas, setTareas] = useState([]);

  // ⭐ Cargar tareas (pero sin backend no crashea)
  useEffect(() => {
    async function cargar() {
      try {
        // Si NO hay backend → devolvemos []
        if (!API_URL) {
          console.warn("⚠️ No hay backend → usando []");
          setTareas([]);
          return;
        }

        const res = await fetch(`${API_URL}/tareas`);
        if (!res.ok) throw new Error("No hay backend todavía");

        const data = await res.json();
        setTareas(data);
      } catch (err) {
        console.warn("⚠️ Backend no disponible → usando []");
        setTareas([]); // 💎 ACÁ ES DONDE ENGAÑAMOS
      }
    }

    cargar();
  }, []);

  // ⭐ Crear tarea (guarda solo en memoria)
  const crearTarea = (tarea) => {
    const nueva = {
      ...tarea,
      id: Date.now(),
      completada: false,
      creadaEn: new Date().toISOString(),
    };

    setTareas((prev) => [...prev, nueva]); // en memoria
  };

  const completarTarea = (id) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completada: true } : t
      )
    );
  };

  const actualizarTarea = (id, datos) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...datos } : t
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tareas, crearTarea, completarTarea, actualizarTarea }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
