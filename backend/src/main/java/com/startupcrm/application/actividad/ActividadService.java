// src/main/java/com/startupcrm/application/actividad/ActividadService.java
package com.startupcrm.application.actividad;

import com.startupcrm.domain.actividad.Actividad;
import com.startupcrm.domain.actividad.ActividadRepository;
import com.startupcrm.domain.cliente.Cliente;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;

    public ActividadService(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
    }

    public Actividad registrar(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    public List<Actividad> listarPorCliente(Cliente cliente) {
        return actividadRepository.findByClienteOrderByFechaDesc(cliente);
    }

    public List<Actividad> listarEntreFechas(OffsetDateTime desde, OffsetDateTime hasta) {
        return actividadRepository.findByFechaBetween(desde, hasta);
    }
}