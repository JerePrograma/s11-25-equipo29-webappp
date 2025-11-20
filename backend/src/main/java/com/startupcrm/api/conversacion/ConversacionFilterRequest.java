package com.startupcrm.api.conversacion;

import java.util.List;

public record ConversacionFilterRequest(
        Long       clienteId,
        String     canal,
        String     estado,
        Long       asignadoAId,
        List<Long> etiquetaIds,
        int        page,
        int        size
) {}
