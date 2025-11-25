package com.startupcrm.api.usuario;

public record UsuarioUpdateRequest(
        String nombre,
        String telefono,
        Long   rolId,
        String estado       // 'activo','inactivo'
) {}