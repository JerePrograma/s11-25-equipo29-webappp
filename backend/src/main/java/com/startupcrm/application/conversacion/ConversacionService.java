// src/main/java/com/startupcrm/application/conversacion/ConversacionService.java
package com.startupcrm.application.conversacion;

import com.startupcrm.api.conversacion.ConversacionApiMapper;
import com.startupcrm.api.conversacion.ConversacionCreateRequest;
import com.startupcrm.api.conversacion.ConversacionResponse;
import com.startupcrm.api.conversacion.ConversacionUpdateRequest;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.cliente.ClienteRepository;
import com.startupcrm.domain.conversacion.CanalIntegracion;
import com.startupcrm.domain.conversacion.CanalIntegracionRepository;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.conversacion.ConversacionRepository;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.usuario.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ConversacionService {

    private final ConversacionRepository conversacionRepository;
    private final ClienteRepository clienteRepository;
    private final CanalIntegracionRepository canalIntegracionRepository;
    private final UsuarioRepository usuarioRepository;
    private final ConversacionApiMapper conversacionApiMapper;

    public ConversacionService(ConversacionRepository conversacionRepository,
                               ClienteRepository clienteRepository,
                               CanalIntegracionRepository canalIntegracionRepository,
                               UsuarioRepository usuarioRepository,
                               ConversacionApiMapper conversacionApiMapper) {
        this.conversacionRepository = conversacionRepository;
        this.clienteRepository = clienteRepository;
        this.canalIntegracionRepository = canalIntegracionRepository;
        this.usuarioRepository = usuarioRepository;
        this.conversacionApiMapper = conversacionApiMapper;
    }

    // ===================== API/DTO =====================

    public ConversacionResponse crear(ConversacionCreateRequest request) {
        Cliente cliente = clienteRepository.findById(request.clienteId())
                .orElseThrow(() -> new NoSuchElementException("Cliente no encontrado: " + request.clienteId()));

        CanalIntegracion canalIntegracion = canalIntegracionRepository.findById(request.canalIntegracionId())
                .orElseThrow(() -> new NoSuchElementException("CanalIntegracion no encontrado: " + request.canalIntegracionId()));

        Usuario asignadoA = usuarioRepository.findById(request.asignadoAId())
                .orElseThrow(() -> new NoSuchElementException("Usuario asignado no encontrado: " + request.asignadoAId()));

        Conversacion conversacion = new Conversacion();
        conversacion.setCliente(cliente);
        conversacion.setCanal(request.canal());
        conversacion.setCanalIntegracion(canalIntegracion);
        conversacion.setAsunto(request.asunto());
        conversacion.setEstado("abierta");
        conversacion.setAsignadoA(asignadoA);
        conversacion.setCreadoEn(OffsetDateTime.now());

        Conversacion creada = conversacionRepository.save(conversacion);
        return conversacionApiMapper.toResponse(creada, List.of());
    }

    public ConversacionResponse actualizar(Long id, ConversacionUpdateRequest request) {
        Conversacion conversacion = obtenerPorId(id);
        conversacion.setEstado(request.estado());

        if (request.asignadoAId() != null) {
            Usuario asignado = usuarioRepository.findById(request.asignadoAId())
                    .orElseThrow(() -> new NoSuchElementException("Usuario asignado no encontrado: " + request.asignadoAId()));
            conversacion.setAsignadoA(asignado);
        }

        Conversacion actualizada = conversacionRepository.save(conversacion);
        return conversacionApiMapper.toResponse(actualizada, List.of());
    }

    public ConversacionResponse obtenerResponsePorId(Long id) {
        Conversacion c = obtenerPorId(id);
        return conversacionApiMapper.toResponse(c, List.of());
    }

    public List<ConversacionResponse> listarTodasResponse() {
        return conversacionRepository.findAll()
                .stream()
                .map(c -> conversacionApiMapper.toResponse(c, List.of()))
                .toList();
    }

    // ===================== Dominio (entidades) =====================

    public Conversacion crear(Conversacion conversacion) {
        return conversacionRepository.save(conversacion);
    }

    public Conversacion actualizar(Conversacion conversacion) {
        if (conversacion.getId() == null) {
            throw new IllegalArgumentException("El id de conversacion no puede ser nulo para actualizar.");
        }
        return conversacionRepository.save(conversacion);
    }

    public Conversacion obtenerPorId(Long id) {
        return conversacionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Conversacion no encontrada: " + id));
    }

    public Conversacion obtenerPorCanalConversationId(String canalConversationId) {
        return conversacionRepository.findByCanalConversationId(canalConversationId)
                .orElseThrow(() -> new NoSuchElementException("Conversacion no encontrada para canalConversationId: " + canalConversationId));
    }

    public List<Conversacion> listarPorCliente(Cliente cliente) {
        return conversacionRepository.findByCliente(cliente);
    }

    public List<Conversacion> listarPorEstado(String estado) {
        return conversacionRepository.findByEstado(estado);
    }

    public List<Conversacion> listarTodas() {
        return conversacionRepository.findAll();
    }

    public void eliminar(Long id) {
        conversacionRepository.deleteById(id);
    }
}
