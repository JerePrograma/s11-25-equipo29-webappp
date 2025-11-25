// src/main/java/com/startupcrm/application/tarea/TareaService.java
package com.startupcrm.application.tarea;

import com.startupcrm.domain.tarea.Tarea;
import com.startupcrm.domain.tarea.TareaRepository;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TareaService {

    private final TareaRepository tareaRepository;

    public TareaService(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    public Tarea crear(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    public Tarea actualizar(Tarea tarea) {
        if (tarea.getId() == null) {
            throw new IllegalArgumentException("El id de tarea no puede ser nulo para actualizar.");
        }
        return tareaRepository.save(tarea);
    }

    public Tarea obtenerPorId(Long id) {
        return tareaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tarea no encontrada: " + id));
    }

    public List<Tarea> listarPendientesPorUsuario(Usuario usuario, List<String> estados) {
        return tareaRepository.findByAsignadoAAndEstadoIn(usuario, estados);
    }

    public List<Tarea> listarVencidasHasta(LocalDate fecha, List<String> estados) {
        return tareaRepository.findByFechaLimiteLessThanEqualAndEstadoIn(fecha, estados);
    }

    public void eliminar(Long id) {
        tareaRepository.deleteById(id);
    }
}