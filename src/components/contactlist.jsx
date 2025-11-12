import React, { useMemo } from "react";
import ContactCard from "./contactcard.jsx";

/**
 * ContactList
 * props:
 * - items: [{ id, nombre, email, telefono?, empresa?, estado? }]
 * - filtro: string para buscar por nombre/email/empresa (opcional)
 * - estado: "todos" | "activo" | "seguimiento" | "inactivo" | "perdido" (opcional)
 * - onSelect: fn(contact) al hacer click en una tarjeta (opcional)
 */
function ContactList({ items = [], filtro = "", estado = "todos", onSelect }) {
  const data = useMemo(() => {
    const texto = filtro.trim().toLowerCase();

    let resultado = items;

    if (estado !== "todos") {
      resultado = resultado.filter((c) => (c.estado || "activo") === estado);
    }

    if (texto) {
      resultado = resultado.filter((c) => {
        const hay = [
          c.nombre,
          c.email,
          c.empresa,
          c.telefono,
          c.estado,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(texto);
      });
    }

    // orden alfabético por nombre
    resultado = [...resultado].sort((a, b) =>
      (a.nombre || "").localeCompare(b.nombre || "")
    );

    return resultado;
  }, [items, filtro, estado]);

  if (!items.length) {
    return (
      <div className="alert alert-light border d-flex align-items-center" role="alert">
        <span className="me-2">👥</span>
        Aún no hay contactos. Agregá el primero para comenzar.
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
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 text-muted">Contactos encontrados: {data.length}</h6>
      </div>

      {data.map((c) => (
        <div
          key={c.id || c.email}
          role={onSelect ? "button" : undefined}
          onClick={onSelect ? () => onSelect(c) : undefined}
          className={onSelect ? "cursor-pointer" : ""}
        >
          <ContactCard
            nombre={c.nombre}
            email={c.email}
            telefono={c.telefono}
            empresa={c.empresa}
            estado={c.estado}
          />
        </div>
      ))}
    </div>
  );
}

export default ContactList;

