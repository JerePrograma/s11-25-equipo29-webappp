package com.startupcrm.api.vista;

public record VistaGuardadaUpdateRequest(
        String nombre,
        String filtrosJson,
        String columnasJson,
        boolean esPublica
) {}