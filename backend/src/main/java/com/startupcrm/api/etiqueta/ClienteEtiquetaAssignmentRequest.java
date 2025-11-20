package com.startupcrm.api.etiqueta;

public record ClienteEtiquetaAssignmentRequest(
        Long clienteId,
        Long etiquetaId
) {}