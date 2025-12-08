// src/pages/FunnelMini.jsx
import React, { useEffect, useState } from "react";
import { useConfig } from "../context/configcontext.jsx";

export default function FunnelMini() {
  const { API_BASE_URL } = useConfig();
  const [leads, setLeads] = useState([]);

  // 🔥 FETCH SENCILLO (como pediste)
  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/leads`);
        if (!res.ok) throw new Error("No se pudo cargar leads");
        const data = await res.json();
        setLeads(data);
      } catch {
        setLeads([]); // fallback suave
      }
    }

    cargar();
  }, [API_BASE_URL]);

  // 💛 --- TU LÓGICA ORIGINAL, INTACTA ---
  const nuevoLead = leads.filter((l) => l.etapa === "Nuevo lead").length;
  const enSeguimiento = leads.filter((l) => l.etapa === "En seguimiento").length;
  const respuestaPendiente = leads.filter(
    (l) => l.etapa === "Respuesta pendiente"
  ).length;
  const clientes = leads.filter((l) => l.tipoContacto === "Cliente").length;

  // 💛 COLORES ORIGINALES — NO LOS TOCO
  const boxes = [
    { label: "Nuevo lead", value: nuevoLead, badge: "primary" },
    { label: "En seguimiento", value: enSeguimiento, badge: "warning text-dark" },
    { label: "Respuesta pendiente", value: respuestaPendiente, badge: "danger" },
    { label: "Clientes", value: clientes, badge: "success" },
  ];

  return (
    <div className="mt-3">
      <h5 className="fw-bold mb-3">Embudo rápido</h5>

      <div className="row g-2">
        {boxes.map((box) => (
          <div key={box.label} className="col-6 col-md-3">
            <div className="card shadow-sm text-center p-2">

              {/* 💛 COLORES ORIGINALES */}
              <span className={`badge bg-${box.badge} mb-1`}>
                {box.label}
              </span>

              <h4 className="fw-bold">{box.value}</h4>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
