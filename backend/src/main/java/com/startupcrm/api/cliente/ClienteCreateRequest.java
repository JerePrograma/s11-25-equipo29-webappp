// src/main/java/com/startupcrm/api/cliente/ClienteDtos.java
package com.startupcrm.api.cliente;

import java.time.OffsetDateTime;
import java.util.List;

public record ClienteCreateRequest(
        String nombre,
        String email,
        String telefono,
        String tipo,              // 'lead' o 'cliente'
        String estadoGeneral,     // 'activo','en_seguimiento','perdido'
        Long   etapaFunnelId,
        Long   propietarioId,
        String origen             // 'landing','referido','manual','import'
) {}