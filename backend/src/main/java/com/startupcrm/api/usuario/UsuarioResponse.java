package com.startupcrm.api.usuario;

import java.time.OffsetDateTime;

public record UsuarioResponse(
        Long   id,
        String nombre,
        String email,
        String telefono,
        String estado,
        Long   rolId,
        String rolNombre,
        OffsetDateTime creadoEn,
        OffsetDateTime ultimoLoginEn
) {}