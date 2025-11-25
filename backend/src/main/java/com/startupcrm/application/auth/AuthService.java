// src/main/java/com/startupcrm/application/auth/AuthService.java
package com.startupcrm.application.auth;

import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.usuario.UsuarioRepository;
import com.startupcrm.infrastructure.config.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthService(UsuarioRepository usuarioRepository,
                       AuthenticationManager authenticationManager,
                       TokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    // =========================================================
    // CUS-02: Inicio de Sesión (RF-02)
    // =========================================================
    @Transactional
    public LoginResult login(String email, String rawPassword) {
        try {
            var authToken = new UsernamePasswordAuthenticationToken(email, rawPassword);
            var authentication = authenticationManager.authenticate(authToken);

            Usuario usuario = (Usuario) authentication.getPrincipal();

            String accessToken = tokenService.generarAccessToken(usuario);
            String refreshToken = tokenService.generarRefreshToken(usuario);

            usuario.setUltimoLoginEn(OffsetDateTime.now());
            usuarioRepository.save(usuario);

            String rolNombre = (usuario.getRol() != null) ? usuario.getRol().getNombre() : null;

            return new LoginResult(
                    usuario.getId(),
                    usuario.getNombre(),
                    usuario.getEmail(),
                    rolNombre,
                    accessToken,
                    refreshToken
            );
        } catch (BadCredentialsException ex) {
            throw new IllegalArgumentException("Credenciales inválidas.");
        }
    }

    // =========================================================
    // CUS-03: Cierre de Sesión (RF-03)
    // =========================================================
    @Transactional
    public void logout(String accessToken) {
        // Hook para implementar invalidación server-side si querés.
        // Por ahora, expiración natural del JWT + el front descarta el token.
    }

    // Resultado de login (se mantiene igual)
    public record LoginResult(
            Long   usuarioId,
            String nombre,
            String email,
            String rolNombre,
            String accessToken,
            String refreshToken
    ) {}
}
