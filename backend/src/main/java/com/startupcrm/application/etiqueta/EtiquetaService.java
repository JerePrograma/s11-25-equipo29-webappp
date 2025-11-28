// src/main/java/com/startupcrm/application/etiqueta/EtiquetaService.java
package com.startupcrm.application.etiqueta;

import com.startupcrm.application.actividad.ActividadService;
import com.startupcrm.application.cliente.ClienteService;
import com.startupcrm.application.conversacion.ConversacionService;
import com.startupcrm.domain.actividad.Actividad;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.etiqueta.ClienteEtiqueta;
import com.startupcrm.domain.etiqueta.ConversacionEtiqueta;
import com.startupcrm.domain.etiqueta.Etiqueta;
import com.startupcrm.domain.etiqueta.EtiquetaRepository;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.usuario.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class EtiquetaService {

    // Repositorio de Etiqueta (persistencia)
    private final EtiquetaRepository etiquetaRepository;

    // Otros servicios de aplicación
    private final ClienteService clienteService;
    private final ConversacionService conversacionService;
    private final ClienteEtiquetaService clienteEtiquetaService;
    private final ConversacionEtiquetaService conversacionEtiquetaService;
    private final ActividadService actividadService;
    private final UsuarioRepository usuarioRepository;

    public EtiquetaService(EtiquetaRepository etiquetaRepository,
                           ClienteService clienteService,
                           ConversacionService conversacionService,
                           ClienteEtiquetaService clienteEtiquetaService,
                           ConversacionEtiquetaService conversacionEtiquetaService,
                           ActividadService actividadService,
                           UsuarioRepository usuarioRepository) {
        this.etiquetaRepository = etiquetaRepository;
        this.clienteService = clienteService;
        this.conversacionService = conversacionService;
        this.clienteEtiquetaService = clienteEtiquetaService;
        this.conversacionEtiquetaService = conversacionEtiquetaService;
        this.actividadService = actividadService;
        this.usuarioRepository = usuarioRepository;
    }

    // ========= CRUD / operaciones base sobre Etiqueta =========

    @Transactional
    public Etiqueta crear(Etiqueta etiqueta) {
        return etiquetaRepository.save(etiqueta);
    }

    @Transactional
    public Etiqueta actualizar(Etiqueta etiqueta) {
        if (etiqueta.getId() == null) {
            throw new IllegalArgumentException("El id de etiqueta no puede ser nulo para actualizar.");
        }
        return etiquetaRepository.save(etiqueta);
    }

    @Transactional(readOnly = true)
    public Etiqueta obtenerPorId(Long id) {
        return etiquetaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Etiqueta no encontrada: " + id));
    }

    @Transactional(readOnly = true)
    public Etiqueta obtenerPorNombreYAplicaA(String nombre, String aplicaA) {
        return etiquetaRepository.findByNombreAndAplicaA(nombre, aplicaA)
                .orElseThrow(() -> new NoSuchElementException(
                        "Etiqueta no encontrada: " + nombre + " (" + aplicaA + ")"));
    }

    @Transactional(readOnly = true)
    public List<Etiqueta> listarPorAplicaA(String aplicaA) {
        return etiquetaRepository.findByAplicaA(aplicaA);
    }

    @Transactional
    public void eliminar(Long id) {
        etiquetaRepository.deleteById(id);
    }

    // ========= Casos de uso de alto nivel (para controllers) =========

    @Transactional
    public Etiqueta crearEtiqueta(String nombre, String color, String aplicaA) {
        Etiqueta e = new Etiqueta();
        e.setNombre(nombre);
        e.setColor(color);
        e.setAplicaA(aplicaA);
        return crear(e);
    }

    @Transactional
    public Etiqueta actualizarEtiqueta(Long id, String nombre, String color) {
        Etiqueta e = obtenerPorId(id);
        e.setNombre(nombre);
        e.setColor(color);
        return actualizar(e);
    }

    @Transactional(readOnly = true)
    public List<Etiqueta> listarEtiquetasPorAplicaA(String aplicaA) {
        return listarPorAplicaA(aplicaA);
    }

    // ========= Relaciones con Cliente / Conversacion =========

    @Transactional
    public void asignarEtiquetaACliente(Long clienteId, Long etiquetaId) {
        Cliente cliente = clienteService.obtenerPorId(clienteId);
        Etiqueta etiqueta = obtenerPorId(etiquetaId);
        clienteEtiquetaService.asignarEtiquetaACliente(cliente, etiqueta);
    }

    @Transactional
    public void asignarEtiquetaAConversacion(Long conversacionId, Long etiquetaId) {
        Conversacion conversacion = conversacionService.obtenerPorId(conversacionId);
        Etiqueta etiqueta = obtenerPorId(etiquetaId);
        conversacionEtiquetaService.asignarEtiquetaAConversacion(conversacion, etiqueta);
    }

    @Transactional(readOnly = true)
    public List<Etiqueta> listarEtiquetasPorCliente(Long clienteId) {
        Cliente cliente = clienteService.obtenerPorId(clienteId);
        return clienteEtiquetaService.listarPorCliente(cliente)
                .stream()
                .map(ClienteEtiqueta::getEtiqueta)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<Etiqueta> listarEtiquetasPorConversacion(Long conversacionId) {
        Conversacion conversacion = conversacionService.obtenerPorId(conversacionId);
        return conversacionEtiquetaService.listarPorConversacion(conversacion)
                .stream()
                .map(ConversacionEtiqueta::getEtiqueta)
                .toList();
    }

    // =========================================================
    // CUS-07: Gestionar Etiquetas de Contacto
    // RF-07
    // =========================================================

    /**
     * Reemplaza el conjunto de etiquetas de un cliente por las provistas
     * y registra una actividad de auditoría.
     *
     * @param clienteId      id del contacto (cliente/lead)
     * @param etiquetaIds    ids de etiquetas a dejar asociadas
     * @param usuarioActorId id del usuario que realiza la acción
     */
    @Transactional
    public void actualizarEtiquetasDeCliente(Long clienteId,
                                             List<Long> etiquetaIds,
                                             Long usuarioActorId) {
        Cliente cliente = clienteService.obtenerPorId(clienteId);

        // 1) Limpiar etiquetas actuales del cliente
        clienteEtiquetaService.eliminarPorCliente(cliente);

        // 2) Asignar nuevas etiquetas
        List<Etiqueta> etiquetas = etiquetaIds.stream()
                .map(this::obtenerPorId)
                .toList();

        for (Etiqueta etiqueta : etiquetas) {
            clienteEtiquetaService.asignarEtiquetaACliente(cliente, etiqueta);
        }

        // 3) Registrar actividad (si tenemos actor)
        if (usuarioActorId != null) {
            Usuario actor = usuarioRepository.findById(usuarioActorId)
                    .orElseThrow(() -> new NoSuchElementException("Usuario actor no encontrado: " + usuarioActorId));

            Actividad actividad = new Actividad();
            actividad.setCliente(cliente);
            actividad.setUsuario(actor);
            actividad.setTipo("cliente_etiquetas_actualizadas");
            actividad.setFecha(OffsetDateTime.now());

            String etiquetasNombres = etiquetas.stream()
                    .map(Etiqueta::getNombre)
                    .collect(Collectors.joining("\",\"", "[\"", "\"]"));

            String metadataJson = String.format(
                    "{\"clienteId\": %d, \"etiquetas\": %s}",
                    cliente.getId(),
                    etiquetasNombres
            );

            actividad.setMetadataJson(metadataJson);

            actividadService.registrar(actividad);
        }
    }
}
