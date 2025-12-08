// src/context/configcontext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ConfigContext = createContext();

// 🌐 URL real (cuando exista backend)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function ConfigProvider({ children }) {
  // CONTACTOS CRM
  const [canales, setCanales] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [tiposContacto, setTiposContacto] = useState([]);
  const [estadosCalor, setEstadosCalor] = useState([]);

  // SISTEMA GLOBAL
  const [columnasDisponibles, setColumnasDisponibles] = useState([]);
  const [columnasGlobales, setColumnasGlobales] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [vistas, setVistas] = useState([]);

  // --------------------------------------------------------------------------------
  // ⭐ CARGAR CONFIGURACIÓN — intenta backend / si falla, usa defaults
  // --------------------------------------------------------------------------------
  useEffect(() => {
    async function loadConfig() {
      try {
        if (!API_BASE_URL) throw new Error("Backend no configurado");

        const res = await fetch(`${API_BASE_URL}/api/config`);
        if (!res.ok) throw new Error("Backend no disponible");

        const data = await res.json();

        // CONTACTOS
        setCanales(data.canales || []);
        setEtapas(data.etapas || []);
        setTiposContacto(data.tiposContacto || []);
        setEstadosCalor(data.estadosCalor || []);

        // COLUMNAS
        setColumnasDisponibles(data.columnasDisponibles || []);

        const savedColumnas = localStorage.getItem("columnasGlobales");
        setColumnasGlobales(
          savedColumnas
            ? JSON.parse(savedColumnas)
            : data.columnasDisponibles?.slice(0, 4) || []
        );

        // ETIQUETAS
        const savedEtiquetas = localStorage.getItem("etiquetas");
        setEtiquetas(savedEtiquetas ? JSON.parse(savedEtiquetas) : data.etiquetas || []);

        // VISTAS
        const savedVistas = localStorage.getItem("vistas");
        setVistas(savedVistas ? JSON.parse(savedVistas) : data.vistas || []);

      } catch (err) {
        console.warn("⚠️ No hay backend → usando configuración por defecto");

        // CONTACTOS DEFAULTS
        setCanales(["WhatsApp", "Email", "Instagram"]);
        setEtapas(["Nuevo lead", "Contacto inicial", "En seguimiento", "Cliente"]);
        setTiposContacto(["Lead", "Cliente"]);
        setEstadosCalor(["Lead frío", "Lead tibio", "Lead caliente"]);

        // COLUMNAS
        setColumnasDisponibles(["titulo", "canal", "estado", "contacto", "creadaEn"]);

        const savedColumnas = localStorage.getItem("columnasGlobales");
        setColumnasGlobales(
          savedColumnas
            ? JSON.parse(savedColumnas)
            : ["titulo", "canal", "estado", "contacto"]
        );

        // ETIQUETAS
        const savedEtiquetas = localStorage.getItem("etiquetas");
        setEtiquetas(savedEtiquetas ? JSON.parse(savedEtiquetas) : []);

        // VISTAS
        const savedVistas = localStorage.getItem("vistas");
        setVistas(savedVistas ? JSON.parse(savedVistas) : []);
      }
    }

    loadConfig();
  }, []);

  // --------------------------------------------------------------------------------
  // ⭐ GUARDAR EN LOCALSTORAGE
  // --------------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("columnasGlobales", JSON.stringify(columnasGlobales));
  }, [columnasGlobales]);

  useEffect(() => {
    localStorage.setItem("etiquetas", JSON.stringify(etiquetas));
  }, [etiquetas]);

  useEffect(() => {
    localStorage.setItem("vistas", JSON.stringify(vistas));
  }, [vistas]);

  // --------------------------------------------------------------------------------
  // ⭐ CRUD ETIQUETAS
  // --------------------------------------------------------------------------------
  const agregarEtiqueta = (nombre) => {
    setEtiquetas((prev) => [...prev, { id: Date.now(), nombre }]);
  };

  const renombrarEtiqueta = (id, nuevoNombre) => {
    setEtiquetas((prev) =>
      prev.map((e) => (e.id === id ? { ...e, nombre: nuevoNombre } : e))
    );
  };

  const eliminarEtiqueta = (id) => {
    setEtiquetas((prev) => prev.filter((e) => e.id !== id));
  };

  // --------------------------------------------------------------------------------
  // ⭐ CRUD VISTAS
  // --------------------------------------------------------------------------------
  const guardarVista = (vista) => {
    if (vista.id) {
      setVistas((prev) => prev.map((v) => (v.id === vista.id ? vista : v)));
    } else {
      setVistas((prev) => [...prev, { ...vista, id: Date.now() }]);
    }
  };

  const eliminarVista = (id) => {
    setVistas((prev) => prev.filter((v) => v.id !== id));
  };

  // --------------------------------------------------------------------------------
  // EXPORTAR CONTEXTO
  // --------------------------------------------------------------------------------
  return (
    <ConfigContext.Provider
      value={{
        API_BASE_URL,

        // CONTACTOS CRM
        canales,
        etapas,
        tiposContacto,
        estadosCalor,

        // SISTEMA GLOBAL
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
  return useContext(ConfigContext);
}
