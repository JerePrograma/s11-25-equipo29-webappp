package com.startupcrm.api.cliente;

import java.time.OffsetDateTime;
import java.util.List;

public record ClienteResponse(
        Long   id,
        String nombre,
        String email,
        String telefono,
        String tipo,
        String estadoGeneral,
        Long   etapaFunnelId,
        String etapaFunnelNombre,
        Long   propietarioId,
        String propietarioNombre,
        String origen,
        OffsetDateTime ultimoContactoEn,
        OffsetDateTime creadoEn,
        List<String> etiquetas      // nombres de etiquetas aplicadas al cliente
) {}