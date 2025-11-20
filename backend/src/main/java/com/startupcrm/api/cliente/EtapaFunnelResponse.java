package com.startupcrm.api.cliente;

public record EtapaFunnelResponse(
        Long    id,
        String  nombre,
        Integer orden,
        boolean esDefault
) {}