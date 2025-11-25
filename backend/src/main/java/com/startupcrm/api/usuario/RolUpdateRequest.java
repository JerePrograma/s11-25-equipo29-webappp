package com.startupcrm.api.usuario;

public record RolUpdateRequest(
        String descripcion,
        String permisosJson
) {}