package com.startupcrm.application.etiqueta;

import com.startupcrm.application.cliente.ClienteService;
import com.startupcrm.application.conversacion.ConversacionService;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.etiqueta.ClienteEtiqueta;
import com.startupcrm.domain.etiqueta.ConversacionEtiqueta;
import com.startupcrm.domain.etiqueta.Etiqueta;
import com.startupcrm.domain.etiqueta.EtiquetaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EtiquetaService {

    // Repositorio de Etiqueta (persistencia)
    private final EtiquetaRepository etiquetaRepository;

    // Otros servicios de aplicación
    private final ClienteService clienteService;
    private final ConversacionService conversacionService;
    private final ClienteEtiquetaService clienteEtiquetaService;
    private final ConversacionEtiquetaService conversacionEtiquetaService;

    public EtiquetaService(EtiquetaRepository etiquetaRepository,
                           ClienteService clienteService,
                           ConversacionService conversacionService,
                           ClienteEtiquetaService clienteEtiquetaService,
                           ConversacionEtiquetaService conversacionEtiquetaService) {
        this.etiquetaRepository = etiquetaRepository;
        this.clienteService = clienteService;
        this.conversacionService = conversacionService;
        this.clienteEtiquetaService = clienteEtiquetaService;
        this.conversacionEtiquetaService = conversacionEtiquetaService;
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

    // ========= Casos de uso de alto nivel para el Controller =========

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
}
