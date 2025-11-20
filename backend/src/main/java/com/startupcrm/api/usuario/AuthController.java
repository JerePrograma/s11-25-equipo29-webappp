// src/main/java/com/startupcrm/api/usuario/AuthController.java
package com.startupcrm.api.usuario;

import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.infrastructure.config.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder; // por si querés usarlo en registro, etc.

    public AuthController(AuthenticationManager authenticationManager,
                          TokenService tokenService,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthLoginRequest request) {
        // El "username" de Spring Security es nuestro email
        var authToken = new UsernamePasswordAuthenticationToken(
                request.email(), request.password()
        );

        Authentication authentication = authenticationManager.authenticate(authToken);
        Usuario usuario = (Usuario) authentication.getPrincipal();

        String accessToken = tokenService.generarAccessToken(usuario);
        String refreshToken = tokenService.generarRefreshToken(usuario);

        // Expiración del access token en segundos (2 horas -> 7200)
        AuthResponse response = new AuthResponse(
                accessToken,
                refreshToken,
                2 * 60 * 60L
        );

        return ResponseEntity.ok(response);
    }
}
