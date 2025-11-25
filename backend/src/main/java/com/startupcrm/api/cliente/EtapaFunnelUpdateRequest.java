package com.startupcrm.api.cliente;

public record EtapaFunnelUpdateRequest(
        String nombre,
        Integer orden,
        boolean esDefault
) {}