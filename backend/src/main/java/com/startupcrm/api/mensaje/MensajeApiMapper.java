// src/main/java/com/startupcrm/api/mensaje/MensajeApiMapper.java
package com.startupcrm.api.mensaje;

import com.startupcrm.domain.mensaje.Mensaje;
import org.springframework.stereotype.Component;

@Component
public class MensajeApiMapper {

    public MensajeResponse toResponse(Mensaje m) {
        return new MensajeResponse(
                m.getId(),
                m.getConversacion() != null ? m.getConversacion().getId() : null,
                m.getCanal(),
                m.getDireccion(),
                m.getContenido(),
                m.getFechaEnvio(),
                m.getEstado(),
                m.getRemitenteUsuario() != null ? m.getRemitenteUsuario().getId() : null,
                m.getRemitenteCliente() != null ? m.getRemitenteCliente().getId() : null,
                m.getCanalMessageId()
        );
    }
}
