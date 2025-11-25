package com.startupcrm.api.cliente;

import java.util.List;

public record ClienteFilterRequest(
        String search,                 // texto libre (nombre/email/teléfono)
        String tipo,                   // 'lead','cliente'
        String estadoGeneral,
        List<Long> etapasFunnelIds,
        Long       propietarioId,
        List<Long> etiquetaIds,
        int page,
        int size
) {}