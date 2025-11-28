// src/main/java/com/startupcrm/application/actividad/ActividadService.java
package com.startupcrm.application.actividad;

import com.startupcrm.api.actividad.ActividadApiMapper;
import com.startupcrm.api.actividad.ActividadResponse;
import com.startupcrm.domain.actividad.Actividad;
import com.startupcrm.domain.actividad.ActividadRepository;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.cliente.ClienteRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;
    private final ClienteRepository clienteRepository;
    private final ActividadApiMapper actividadApiMapper;

    public ActividadService(ActividadRepository actividadRepository,
                            ClienteRepository clienteRepository,
                            ActividadApiMapper actividadApiMapper) {
        this.actividadRepository = actividadRepository;
        this.clienteRepository = clienteRepository;
        this.actividadApiMapper = actividadApiMapper;
    }

    // ===================== Dominio (entidad) =====================

    public Actividad registrar(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    public List<Actividad> listarPorClienteEntidad(Cliente cliente) {
        return actividadRepository.findByClienteOrderByFechaDesc(cliente);
    }

    public List<Actividad> listarEntreFechasEntidad(OffsetDateTime desde, OffsetDateTime hasta) {
        return actividadRepository.findByFechaBetween(desde, hasta);
    }

    // ===================== API/DTO (para controllers) =====================

    /**
     * Devuelve las actividades de un cliente en forma de DTO.
     * Se encarga de:
     * - Buscar al cliente por ID.
     * - Consultar el repositorio.
     * - Mapear a ActividadResponse.
     */
    public List<ActividadResponse> listarPorCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new NoSuchElementException("Cliente no encontrado: " + clienteId));

        return actividadRepository.findByClienteOrderByFechaDesc(cliente)
                .stream()
                .map(actividadApiMapper::toResponse)
                .toList();
    }

    /**
     * Devuelve actividades entre fechas en forma de DTO.
     * Recibe fechas como String ISO-8601 (para que el controller solo las pase).
     */
    public List<ActividadResponse> listarEntreFechas(String desdeIso, String hastaIso) {
        OffsetDateTime desde = OffsetDateTime.parse(desdeIso);
        OffsetDateTime hasta = OffsetDateTime.parse(hastaIso);

        return actividadRepository.findByFechaBetween(desde, hasta)
                .stream()
                .map(actividadApiMapper::toResponse)
                .toList();
    }
}
