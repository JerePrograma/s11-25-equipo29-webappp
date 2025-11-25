// ------------------------------------------
// src/main/java/com/startupcrm/domain/actividad/ActividadRepository.java
// ------------------------------------------
package com.startupcrm.domain.actividad;

import com.startupcrm.domain.cliente.Cliente;

import java.time.OffsetDateTime;
import java.util.List;

public interface ActividadRepository {

    Actividad save(Actividad actividad);

    List<Actividad> findByClienteOrderByFechaDesc(Cliente cliente);

    List<Actividad> findByFechaBetween(OffsetDateTime desde, OffsetDateTime hasta);
}
