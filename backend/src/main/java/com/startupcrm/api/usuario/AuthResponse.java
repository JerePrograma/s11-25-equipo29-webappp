package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "AuthResponse", description = "Respuesta del endpoint de login con tokens JWT")
public record AuthResponse(
        @Schema(description = "JWT de acceso (usar en Authorization: Bearer ...)", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String accessToken,

        @Schema(description = "JWT de refresco para obtener nuevos tokens de acceso", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String refreshToken,

        @Schema(description = "Tiempo de expiración del accessToken en segundos", example = "7200")
        Long expiresIn
) {}
