package com.startupcrm.api.conversacion;

public record CanalIntegracionUpdateRequest(
        String nombre,
        String configJson,
        boolean activo
) {}