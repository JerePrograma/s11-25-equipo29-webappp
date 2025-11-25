package com.startupcrm.api.cliente;

public record ClienteUpdateRequest(
        String nombre,
        String email,
        String telefono,
        String tipo,
        String estadoGeneral,
        Long   etapaFunnelId,
        Long   propietarioId,
        String origen
) {}