package com.startupcrm.api.usuario;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        long   expiresInSeconds
) {}