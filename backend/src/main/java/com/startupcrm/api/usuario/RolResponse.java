package com.startupcrm.api.usuario;

public record RolResponse(
        Long   id,
        String nombre,
        String descripcion,
        String permisosJson
) {}