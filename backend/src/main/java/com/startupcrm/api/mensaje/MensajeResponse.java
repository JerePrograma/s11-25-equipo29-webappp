package com.startupcrm.api.mensaje;

import java.time.OffsetDateTime;

public record MensajeResponse(
        Long            id,
        Long            conversacionId,
        String          canal,
        String          direccion,           // 'in' o 'out'
        String          contenido,
        OffsetDateTime fechaEnvio,
        String          estado,
        Long            remitenteUsuarioId,
        Long            remitenteClienteId,
        String          canalMessageId
) {}