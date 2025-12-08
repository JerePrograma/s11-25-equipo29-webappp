  // src/pages/Contactos/index.jsx
  import React, { useState } from "react";
  import { useLeads } from "../../context/leadcontext";
  import { useNavigate } from "react-router-dom";

  import Recientes from "./Recientes";
  import ListaContactos from "./ListaContactos";
  import ModalAgregar from "./modalAgregar";
  import ModalEditar from "./ModalEditar";
  import ModalEliminar from "./ModalEliminar";
  import ModalEtapa from "./ModalEtapa";

  import { showToast } from "../../utils/toast";

  function Contactos() {
    const navigate = useNavigate();

    const { leads, agregarLead, editarLead, eliminarLead } = useLeads();

    const [busqueda, setBusqueda] = useState("");

    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalEtapa, setModalEtapa] = useState(false);

    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

    // FILTRO DE BÚSQUEDA
    const leadsFiltrados = leads.filter((l) =>
      l.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // ORDENAR RECIENTES
    const recientesOrdenados = [...leadsFiltrados].sort(
      (a, b) => b.creadoEn - a.creadoEn
    );

    // AGREGAR CONTACTO (usa el normalizador del contexto)
    const guardarNuevoContacto = (nuevo) => {
      agregarLead({
        nombre: nuevo.nombre,
        canal: nuevo.canal,
        etapa: nuevo.etapa || "Nuevo lead",
        tipoContacto: nuevo.tipoContacto || "Lead",
        estadoCalor: nuevo.estadoCalor || "Lead frío",
        ultima: "Justo ahora",
      });

      showToast("Contacto agregado correctamente ✔", "success");
    };

    // EDITAR CONTACTO
    const guardarEdicion = (editado) => {
      editarLead(contactoSeleccionado.id, {
        nombre: editado.nombre,
        canal: editado.canal,
        etapa: editado.etapa, // el normalizador genera estado y badge
        tipoContacto: editado.tipoContacto,
        estadoCalor: editado.estadoCalor,
      });

      showToast("Contacto editado correctamente ✔", "info");
    };

    // ELIMINAR CONTACTO
    const eliminarContacto = () => {
      eliminarLead(contactoSeleccionado.id);
      showToast("Contacto eliminado ❌", "danger");
    };

    // CAMBIAR ETAPA
    const guardarEtapa = (nuevaEtapa) => {
      editarLead(contactoSeleccionado.id, {
        etapa: nuevaEtapa,
        tipoContacto: nuevaEtapa === "Cliente" ? "Cliente" : "Lead",
      });

      showToast("Etapa actualizada ✔", "info");
    };

    return (
      <div className="container-fluid py-4">
        <div
          id="toastContainer"
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 2000 }}
        ></div>

        <header>
          <h1 className="h3 fw-bold">Contactos</h1>
          <p className="text-muted">Gestión unificada de leads y clientes.</p>
        </header>

        {/* BUSCADOR + BOTÓN */}
        <section className="d-flex justify-content-between mb-4">
          <input
            className="form-control w-50"
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <button className="btn btn-dark" onClick={() => setModalAgregar(true)}>
            + Nuevo contacto
          </button>
        </section>

        {/* RECIENTES */}
        <Recientes contactos={recientesOrdenados} />

        {/* LISTA GENERAL */}
        <ListaContactos
          contactos={leadsFiltrados}
          navigate={navigate}
          onVer={(c) => navigate(`/contactos/${c.id}`)}
          onEditar={(c) => {
            setContactoSeleccionado(c);
            setModalEditar(true);
          }}
          onEliminar={(c) => {
            setContactoSeleccionado(c);
            setModalEliminar(true);
          }}
          onCambiarEtapa={(c) => {
            setContactoSeleccionado(c);
            setModalEtapa(true);
          }}
        />

        {/* MODALES */}
        {modalAgregar && (
          <ModalAgregar
            onClose={() => setModalAgregar(false)}
            onSave={guardarNuevoContacto}
          />
        )}

        {modalEditar && contactoSeleccionado && (
          <ModalEditar
            contacto={contactoSeleccionado}
            onClose={() => setModalEditar(false)}
            onSave={guardarEdicion}
          />
        )}

        {modalEliminar && contactoSeleccionado && (
          <ModalEliminar
            contacto={contactoSeleccionado}
            onClose={() => setModalEliminar(false)}
            onDelete={eliminarContacto}
          />
        )}

        {modalEtapa && contactoSeleccionado && (
          <ModalEtapa
            contacto={contactoSeleccionado}
            onClose={() => setModalEtapa(false)}
            onSave={(etapa) => {
              guardarEtapa(etapa);
              setModalEtapa(false);
            }}
          />
        )}
      </div>
    );
  }

  export default Contactos;
