import React, { useMemo } from "react";
import ContactCard from "./ContactCard.jsx";

/**
 * @typedef {import("../api/types.js").ClienteResponse} ClienteResponse
 */

/**
 * @param {{
 *   contactos: ClienteResponse[];
 *   filtro?: string;
 *   estado?: "todos" | "activo" | "en_seguimiento" | "perdido";
 *   onSelect?: (c: ClienteResponse) => void;
 * }} props
 */
function ContactList({
  contactos = [],
  filtro = "",
  estado = "todos",
  onSelect,
}) {
  const data = useMemo(() => {
    const texto = filtro.trim().toLowerCase();

    let resultado = contactos;

    if (estado !== "todos") {
      resultado = resultado.filter(
        (c) => (c.estadoGeneral || "en_seguimiento") === estado
      );
    }

    if (texto) {
      resultado = resultado.filter((c) => {
        const hay = [
          c.nombre,
          c.email,
          c.telefono,
          c.origen,
          c.propietarioNombre,
          ...(c.etiquetas || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return hay.includes(texto);
      });
    }

    return [...resultado].sort((a, b) =>
      (a.nombre || "").localeCompare(b.nombre || "")
    );
  }, [contactos, filtro, estado]);

  if (!contactos.length) {
    return (
      <div
        className="alert alert-light border d-flex align-items-center"
        role="alert"
      >
        <span className="me-2">👥</span>
        Aún no hay contactos. Crea el primero para comenzar.
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="alert alert-warning" role="alert">
        No hay resultados para tu búsqueda/estado.
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-2 gap-2">
        <h6 className="mb-0 text-muted">
          Contactos encontrados: <strong>{data.length}</strong>
        </h6>
      </div>

      {data.map((c) => (
        <ContactCard
          key={c.id}
          cliente={c}
          onClick={onSelect ? () => onSelect(c) : undefined}
        />
      ))}
    </div>
  );
}

export default ContactList;
