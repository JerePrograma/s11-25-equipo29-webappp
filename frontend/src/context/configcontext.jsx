// src/context/configcontext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ConfigContext = createContext(null);

/**
 * ConfigProvider:
 * - Configuración de UI (canales, etapas, tipos de contacto, etc.).
 * - Usa localStorage para columnas, etiquetas y vistas.
 * - No llama a backend por ahora (no hay /api/config en tu backend).
 */

export function ConfigProvider({ children }) {
  // CONTACTOS CRM
  const [canales, setCanales] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [tiposContacto] = useState(["lead", "cliente"]);
  const [estadosCalor] = useState([
    "Lead frío",
    "Lead tibio",
    "Lead caliente",
  ]);

  // SISTEMA GLOBAL
  const [columnasDisponibles, setColumnasDisponibles] = useState([]);
  const [columnasGlobales, setColumnasGlobales] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [vistas, setVistas] = useState([]);

  // --------------------------------------
  // Carga inicial (defaults + localStorage)
  // --------------------------------------
  useEffect(() => {
    // Defaults
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

    // Columnas globales
    const savedColumnas = localStorage.getItem("columnasGlobales");
    setColumnasGlobales(
      savedColumnas
        ? JSON.parse(savedColumnas)
        : ["nombre", "email", "telefono", "estadoGeneral"]
    );

    // Etiquetas
    const savedEtiquetas = localStorage.getItem("etiquetas");
    setEtiquetas(savedEtiquetas ? JSON.parse(savedEtiquetas) : []);

    // Vistas
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

  // CRUD Etiquetas (solo UI/local)
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

  // CRUD Vistas (solo UI/local)
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

  return (
    <ConfigContext.Provider
      value={{
        // CONTACTOS
        canales,
        etapas,
        tiposContacto,
        estadosCalor,

        // COLUMNAS
        columnasDisponibles,
        columnasGlobales,
        setColumnasGlobales,

        // ETIQUETAS
        etiquetas,
        agregarEtiqueta,
        renombrarEtiqueta,
        eliminarEtiqueta,

        // VISTAS
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
