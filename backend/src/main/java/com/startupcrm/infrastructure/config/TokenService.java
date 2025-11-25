// src/main/java/com/startupcrm/infrastructure/config/TokenService.java
package com.startupcrm.infrastructure.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    public String generarAccessToken(Usuario usuario) {
        return generarToken(usuario, 2, "ACCESS");
    }

    public String generarRefreshToken(Usuario usuario) {
        return generarToken(usuario, 24 * 7, "REFRESH");
    }

    private String generarToken(Usuario usuario, int horas, String tipo) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("startupcrm")
                    .withSubject(usuario.getEmail())           // SUBJECT = EMAIL
                    .withClaim("id", usuario.getId())
                    .withClaim("type", tipo)
                    .withClaim("rol", usuario.getRol() != null
                            ? usuario.getRol().getNombre()
                            : null)
                    .withExpiresAt(generarFechaExpiracion(horas))
                    .sign(algorithm);
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el token", e);
        }
    }

    public String getSubject(String token) {
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("El token es nulo o vacío");
        }
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT verifier = JWT.require(algorithm)
                    .withIssuer("startupcrm")
                    .build()
                    .verify(token);
            return verifier.getSubject(); // email
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Token inválido o expirado", e);
        }
    }

    public String getRolFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT verifier = JWT.require(algorithm)
                    .withIssuer("startupcrm")
                    .build()
                    .verify(token);
            return verifier.getClaim("rol").asString();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Error al obtener el rol del token", e);
        }
    }

    private Instant generarFechaExpiracion(int horas) {
        return LocalDateTime.now().plusHours(horas).toInstant(ZoneOffset.of("-03:00"));
    }

    public String getTokenType(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT verifier = JWT.require(algorithm)
                    .withIssuer("startupcrm")
                    .build()
                    .verify(token);
            return verifier.getClaim("type").asString();
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Error al obtener el tipo de token", e);
        }
    }
}
