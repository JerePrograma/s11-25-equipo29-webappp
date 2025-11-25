package com.startupcrm.api.etiqueta;

public record ConversacionEtiquetaAssignmentRequest(
        Long conversacionId,
        Long etiquetaId
) {}