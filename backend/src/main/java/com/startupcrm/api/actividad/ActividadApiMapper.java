// src/main/java/com/startupcrm/api/actividad/ActividadApiMapper.java
package com.startupcrm.api.actividad;

import com.startupcrm.domain.actividad.Actividad;
import org.springframework.stereotype.Component;

@Component
public class ActividadApiMapper {

    public ActividadResponse toResponse(Actividad a) {
        Long clienteId = (a.getCliente() != null) ? a.getCliente().getId() : null;
        Long usuarioId = (a.getUsuario() != null) ? a.getUsuario().getId() : null;

        return new ActividadResponse(
                a.getId(),
                clienteId,
                usuarioId,
                a.getTipo(),
                a.getFecha(),
                a.getMetadataJson()
        );
    }
}
