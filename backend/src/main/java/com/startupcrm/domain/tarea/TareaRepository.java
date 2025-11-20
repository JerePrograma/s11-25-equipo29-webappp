// ------------------------------------------
// src/main/java/com/startupcrm/domain/tarea/TareaRepository.java
// ------------------------------------------
package com.startupcrm.domain.tarea;

import com.startupcrm.domain.usuario.Usuario;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TareaRepository {

    Tarea save(Tarea tarea);

    Optional<Tarea> findById(Long id);

    List<Tarea> findByAsignadoAAndEstadoIn(Usuario asignadoA, List<String> estados);

    List<Tarea> findByFechaLimiteLessThanEqualAndEstadoIn(LocalDate fecha, List<String> estados);

    void deleteById(Long id);
}