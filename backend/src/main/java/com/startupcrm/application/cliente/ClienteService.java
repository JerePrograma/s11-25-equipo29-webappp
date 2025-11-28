// src/main/java/com/startupcrm/application/cliente/ClienteService.java
package com.startupcrm.application.cliente;

import com.startupcrm.api.cliente.ClienteApiMapper;
import com.startupcrm.api.cliente.ClienteCreateRequest;
import com.startupcrm.api.cliente.ClienteResponse;
import com.startupcrm.api.cliente.ClienteUpdateRequest;
import com.startupcrm.application.actividad.ActividadService;
import com.startupcrm.domain.actividad.Actividad;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.cliente.ClienteRepository;
import com.startupcrm.domain.cliente.EtapaFunnel;
import com.startupcrm.domain.cliente.EtapaFunnelRepository;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.usuario.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EtapaFunnelRepository etapaFunnelRepository;
    private final UsuarioRepository usuarioRepository;
    private final ClienteApiMapper clienteApiMapper;
    private final ActividadService actividadService;

    public ClienteService(ClienteRepository clienteRepository,
                          EtapaFunnelRepository etapaFunnelRepository,
                          UsuarioRepository usuarioRepository,
                          ClienteApiMapper clienteApiMapper,
                          ActividadService actividadService) {
        this.clienteRepository = clienteRepository;
        this.etapaFunnelRepository = etapaFunnelRepository;
        this.usuarioRepository = usuarioRepository;
        this.clienteApiMapper = clienteApiMapper;
        this.actividadService = actividadService;
    }

    // =========================================================
    // CUS-05: Gestionar Contacto (Lead/Cliente) - CREAR
    // RF-05
    // =========================================================
    @Transactional
    public ClienteResponse crear(ClienteCreateRequest request) {
        validarDatosBasicos(request.nombre(), request.email(), request.telefono());

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

        // Auditoría: cliente_creado
        registrarActividadCliente(
                guardado,
                propietario,                // actor = propietario (simple; se puede refinar luego)
                "cliente_creado",
                null
        );

        return clienteApiMapper.toResponse(guardado, List.of());
    }

    // =========================================================
    // CUS-05: Gestionar Contacto (Lead/Cliente) - ACTUALIZAR
    // RF-05
    // =========================================================
    @Transactional
    public ClienteResponse actualizar(Long id, ClienteUpdateRequest request) {
        Cliente cliente = obtenerPorId(id);

        validarDatosBasicos(request.nombre(), request.email(), request.telefono());

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

        // Auditoría: cliente_actualizado
        Usuario actor = (cliente.getPropietario() != null)
                ? cliente.getPropietario()
                : null;

        registrarActividadCliente(
                actualizado,
                actor,
                "cliente_actualizado",
                null
        );

        return clienteApiMapper.toResponse(actualizado, List.of());
    }

    // =========================================================
    // CUS-06: Gestionar Etapas del Funnel
    // RF-06
    // =========================================================
    /**
     * Cambia la etapa del funnel de un cliente y registra una actividad.
     *
     * @param clienteId     id del cliente
     * @param nuevaEtapaId  id de la nueva etapa de funnel
     * @param usuarioActorId id del usuario que realiza el cambio (para auditoría)
     */
    @Transactional
    public ClienteResponse cambiarEtapaFunnel(Long clienteId, Long nuevaEtapaId, Long usuarioActorId) {
        Cliente cliente = obtenerPorId(clienteId);
        EtapaFunnel etapaAnterior = cliente.getEtapaFunnel();

        EtapaFunnel nuevaEtapa = etapaFunnelRepository.findById(nuevaEtapaId)
                .orElseThrow(() -> new NoSuchElementException("Etapa funnel no encontrada: " + nuevaEtapaId));

        // Si la etapa no cambia, devolvemos tal cual (idempotencia suave)
        if (etapaAnterior != null && etapaAnterior.getId().equals(nuevaEtapaId)) {
            return clienteApiMapper.toResponse(cliente, List.of());
        }

        cliente.setEtapaFunnel(nuevaEtapa);
        Cliente actualizado = clienteRepository.save(cliente);

        Usuario actor = usuarioRepository.findById(usuarioActorId)
                .orElseThrow(() -> new NoSuchElementException("Usuario actor no encontrado: " + usuarioActorId));

        // Auditoría: cliente_etapa_actualizada
        String metadataJson = String.format(
                "{\"clienteId\": %d, \"etapaAnterior\": \"%s\", \"nuevaEtapa\": \"%s\"}",
                cliente.getId(),
                etapaAnterior != null ? etapaAnterior.getNombre() : null,
                nuevaEtapa.getNombre()
        );

        registrarActividadCliente(
                actualizado,
                actor,
                "cliente_etapa_actualizada",
                metadataJson
        );

        return clienteApiMapper.toResponse(actualizado, List.of());
    }

    // ===================== API/DTO de lectura =====================

    @Transactional(readOnly = true)
    public ClienteResponse obtenerResponsePorId(Long id) {
        Cliente cliente = obtenerPorId(id);
        return clienteApiMapper.toResponse(cliente, List.of());
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listarTodosResponse() {
        return clienteRepository.findAll()
                .stream()
                .map(c -> clienteApiMapper.toResponse(c, List.of()))
                .toList();
    }

    // ===================== Dominio (entidades) =====================

    @Transactional
    public Cliente crear(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Transactional
    public Cliente actualizar(Cliente cliente) {
        if (cliente.getId() == null) {
            throw new IllegalArgumentException("El id de cliente no puede ser nulo para actualizar.");
        }
        return clienteRepository.save(cliente);
    }

    @Transactional(readOnly = true)
    public Cliente obtenerPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Cliente no encontrado: " + id));
    }

    @Transactional(readOnly = true)
    public Cliente obtenerPorEmail(String email) {
        return clienteRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Cliente no encontrado con email: " + email));
    }

    @Transactional(readOnly = true)
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Cliente> listarPorEstadoGeneral(String estadoGeneral) {
        return clienteRepository.findByEstadoGeneral(estadoGeneral);
    }

    @Transactional
    public void eliminar(Long id) {
        clienteRepository.deleteById(id);
    }

    // ===================== Helpers internos =====================

    private void validarDatosBasicos(String nombre, String email, String telefono) {
        if (nombre == null || nombre.isBlank()) {
            throw new IllegalArgumentException("El nombre del cliente es obligatorio.");
        }
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("El email del cliente es obligatorio.");
        }
        // Podés agregar validación de formato de email si querés, similar a AuthService.
        if (telefono == null || telefono.isBlank()) {
            throw new IllegalArgumentException("El teléfono del cliente es obligatorio.");
        }
    }

    private void registrarActividadCliente(Cliente cliente,
                                           Usuario actor,
                                           String tipo,
                                           String metadataJson) {
        Actividad actividad = new Actividad();
        actividad.setCliente(cliente);
        actividad.setUsuario(actor);
        actividad.setTipo(tipo);
        actividad.setFecha(OffsetDateTime.now());
        actividad.setMetadataJson(metadataJson);

        actividadService.registrar(actividad);
    }
}
