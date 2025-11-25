package com.startupcrm.api.mensaje;

public record MensajeFilterRequest(
        Long conversacionId,
        int  page,
        int  size
) {}