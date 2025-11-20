// src/main/java/com/startupcrm/api/actividad/ActividadApiMapper.java
package com.startupcrm.api.actividad;

import com.startupcrm.domain.actividad.Actividad;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.stereotype.Component;

@Component
public class ActividadApiMapper {

    public ActividadResponse toResponse(Actividad a) {
        Cliente cliente = a.getCliente();
        Usuario usuario = a.getUsuario();

        return new ActividadResponse(
                a.getId(),
                cliente != null ? cliente.getId() : null,
                cliente != null ? cliente.getNombre() : null,
                usuario != null ? usuario.getId() : null,
                usuario != null ? usuario.getNombre() : null,
                a.getConversacion() != null ? a.getConversacion().getId() : null,
                a.getTarea() != null ? a.getTarea().getId() : null,
                a.getTipo(),
                a.getFecha(),
                a.getMetadataJson()
        );
    }
}
