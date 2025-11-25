// src/main/java/com/startupcrm/application/cliente/ClienteService.java
package com.startupcrm.application.cliente;

import com.startupcrm.api.cliente.ClienteApiMapper;
import com.startupcrm.api.cliente.ClienteCreateRequest;
import com.startupcrm.api.cliente.ClienteResponse;
import com.startupcrm.api.cliente.ClienteUpdateRequest;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.cliente.ClienteRepository;
import com.startupcrm.domain.cliente.EtapaFunnel;
import com.startupcrm.domain.cliente.EtapaFunnelRepository;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.usuario.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EtapaFunnelRepository etapaFunnelRepository;
    private final UsuarioRepository usuarioRepository;
    private final ClienteApiMapper clienteApiMapper;

    public ClienteService(ClienteRepository clienteRepository,
                          EtapaFunnelRepository etapaFunnelRepository,
                          UsuarioRepository usuarioRepository,
                          ClienteApiMapper clienteApiMapper) {
        this.clienteRepository = clienteRepository;
        this.etapaFunnelRepository = etapaFunnelRepository;
        this.usuarioRepository = usuarioRepository;
        this.clienteApiMapper = clienteApiMapper;
    }

    // ===================== API/DTO =====================

    public ClienteResponse crear(ClienteCreateRequest request) {
        Cliente cliente = new Cliente();
        cliente.setNombre(request.nombre());
        cliente.setEmail(request.email());
        cliente.setTelefono(request.telefono());
        cliente.setTipo(request.tipo());
        cliente.setEstadoGeneral(request.estadoGeneral());
        cliente.setOrigen(request.origen());
        cliente.setCreadoEn(OffsetDateTime.now());

        EtapaFunnel etapa = (request.etapaFunnelId() != null)
                ? etapaFunnelRepository.findById(request.etapaFunnelId())
                .orElseThrow(() -> new NoSuchElementException("Etapa funnel no encontrada: " + request.etapaFunnelId()))
                : etapaFunnelRepository.findByEsDefaultTrue()
                .orElseThrow(() -> new NoSuchElementException("No hay etapa funnel default configurada"));

        Usuario propietario = usuarioRepository.findById(request.propietarioId())
                .orElseThrow(() -> new NoSuchElementException("Usuario propietario no encontrado: " + request.propietarioId()));

        cliente.setEtapaFunnel(etapa);
        cliente.setPropietario(propietario);

        Cliente guardado = clienteRepository.save(cliente);
        return clienteApiMapper.toResponse(guardado, List.of());
    }

    public ClienteResponse actualizar(Long id, ClienteUpdateRequest request) {
        Cliente cliente = obtenerPorId(id);

        cliente.setNombre(request.nombre());
        cliente.setEmail(request.email());
        cliente.setTelefono(request.telefono());
        cliente.setTipo(request.tipo());
        cliente.setEstadoGeneral(request.estadoGeneral());
        cliente.setOrigen(request.origen());

        if (request.etapaFunnelId() != null) {
            EtapaFunnel etapa = etapaFunnelRepository.findById(request.etapaFunnelId())
                    .orElseThrow(() -> new NoSuchElementException("Etapa funnel no encontrada: " + request.etapaFunnelId()));
            cliente.setEtapaFunnel(etapa);
        }

        if (request.propietarioId() != null) {
            Usuario propietario = usuarioRepository.findById(request.propietarioId())
                    .orElseThrow(() -> new NoSuchElementException("Usuario propietario no encontrado: " + request.propietarioId()));
            cliente.setPropietario(propietario);
        }

        Cliente actualizado = clienteRepository.save(cliente);
        return clienteApiMapper.toResponse(actualizado, List.of());
    }

    public ClienteResponse obtenerResponsePorId(Long id) {
        Cliente cliente = obtenerPorId(id);
        return clienteApiMapper.toResponse(cliente, List.of());
    }

    public List<ClienteResponse> listarTodosResponse() {
        return clienteRepository.findAll()
                .stream()
                .map(c -> clienteApiMapper.toResponse(c, List.of()))
                .toList();
    }

    // ===================== Dominio (entidades) =====================

    public Cliente crear(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente actualizar(Cliente cliente) {
        if (cliente.getId() == null) {
            throw new IllegalArgumentException("El id de cliente no puede ser nulo para actualizar.");
        }
        return clienteRepository.save(cliente);
    }

    public Cliente obtenerPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Cliente no encontrado: " + id));
    }

    public Cliente obtenerPorEmail(String email) {
        return clienteRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Cliente no encontrado con email: " + email));
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public List<Cliente> listarPorEstadoGeneral(String estadoGeneral) {
        return clienteRepository.findByEstadoGeneral(estadoGeneral);
    }

    public void eliminar(Long id) {
        clienteRepository.deleteById(id);
    }
}
