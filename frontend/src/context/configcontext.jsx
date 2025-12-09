// src/context/configcontext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * @typedef {Object} EtiquetaUI
 * @property {number} id
 * @property {string} nombre
 */

/**
 * @typedef {Object} VistaUI
 * @property {number} id
 * @property {string} nombre
 * @property {string} entidad   // 'cliente','conversacion','tarea' (cuando lo alinees con backend)
 * @property {Object} [extra]   // extensible
 */

const ConfigContext = createContext(
  /** @type {{
    canales: string[];
    etapas: string[];
    tiposContacto: string[];
    estadosCalor: string[];
    columnasDisponibles: string[];
    columnasGlobales: string[];
    setColumnasGlobales: (cols: string[]) => void;
    etiquetas: EtiquetaUI[];
    agregarEtiqueta: (nombre: string) => void;
    renombrarEtiqueta: (id: number, nuevoNombre: string) => void;
    eliminarEtiqueta: (id: number) => void;
    vistas: VistaUI[];
    guardarVista: (vista: Partial<VistaUI>) => void;
    eliminarVista: (id: number) => void;
  } | null} */ (null)
);

/**
 * ConfigProvider:
 * - Configuración de UI (canales, etapas, tipos de contacto, etc.).
 * - Usa localStorage para columnas, etiquetas y vistas.
 * - No llama a backend por ahora.
 */
export function ConfigProvider({ children }) {
  // CONTACTOS CRM
  const [canales, setCanales] = useState(/** @type {string[]} */ ([]));
  const [etapas, setEtapas] = useState(/** @type {string[]} */ ([]));
  const [tiposContacto] = useState(/** @type {string[]} */ (["lead", "cliente"]));
  const [estadosCalor] = useState(
    /** @type {string[]} */ (["Lead frío", "Lead tibio", "Lead caliente"])
  );

  // SISTEMA GLOBAL
  const [columnasDisponibles, setColumnasDisponibles] = useState(
    /** @type {string[]} */ ([])
  );
  const [columnasGlobales, setColumnasGlobales] = useState(
    /** @type {string[]} */ ([])
  );
  const [etiquetas, setEtiquetas] = useState(
    /** @type {EtiquetaUI[]} */ ([])
  );
  const [vistas, setVistas] = useState(
    /** @type {VistaUI[]} */ ([])
  );

  // Carga inicial
  useEffect(() => {
    setCanales(["WhatsApp", "Email", "Instagram"]);
    setEtapas(["Nuevo lead", "Contacto inicial", "En seguimiento", "Cliente"]);
    setColumnasDisponibles([
      "nombre",
      "email",
      "telefono",
      "estadoGeneral",
      "origen",
      "propietarioNombre",
      "ultimoContactoEn",
    ]);

    const savedColumnas = localStorage.getItem("columnasGlobales");
    setColumnasGlobales(
      savedColumnas
        ? JSON.parse(savedColumnas)
        : ["nombre", "email", "telefono", "estadoGeneral"]
    );

    const savedEtiquetas = localStorage.getItem("etiquetas");
    setEtiquetas(savedEtiquetas ? JSON.parse(savedEtiquetas) : []);

    const savedVistas = localStorage.getItem("vistas");
    setVistas(savedVistas ? JSON.parse(savedVistas) : []);
  }, []);

  // Persistencia
  useEffect(() => {
    localStorage.setItem("columnasGlobales", JSON.stringify(columnasGlobales));
  }, [columnasGlobales]);

  useEffect(() => {
    localStorage.setItem("etiquetas", JSON.stringify(etiquetas));
  }, [etiquetas]);

  useEffect(() => {
    localStorage.setItem("vistas", JSON.stringify(vistas));
  }, [vistas]);

  const agregarEtiqueta = (nombre) => {
    setEtiquetas((prev) => [
      ...prev,
      { id: Date.now(), nombre: nombre.trim() },
    ]);
  };

  const renombrarEtiqueta = (id, nuevoNombre) => {
    setEtiquetas((prev) =>
      prev.map((e) => (e.id === id ? { ...e, nombre: nuevoNombre } : e))
    );
  };

  const eliminarEtiqueta = (id) => {
    setEtiquetas((prev) => prev.filter((e) => e.id !== id));
  };

  const guardarVista = (vista) => {
    setVistas((prev) => {
      if (vista.id) {
        return prev.map((v) => (v.id === vista.id ? { ...v, ...vista } : v));
      }
      const nueva = { ...vista, id: Date.now() };
      return [...prev, /** @type {VistaUI} */ (nueva)];
    });
  };

  const eliminarVista = (id) => {
    setVistas((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <ConfigContext.Provider
      value={{
        canales,
        etapas,
        tiposContacto,
        estadosCalor,
        columnasDisponibles,
        columnasGlobales,
        setColumnasGlobales,
        etiquetas,
        agregarEtiqueta,
        renombrarEtiqueta,
        eliminarEtiqueta,
        vistas,
        guardarVista,
        eliminarVista,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error("useConfig debe usarse dentro de ConfigProvider");
  }
  return ctx;
}
