// src/main/java/com/startupcrm/api/usuario/AuthController.java
package com.startupcrm.api.usuario;

import com.startupcrm.application.auth.AuthService;
import com.startupcrm.application.auth.AuthService.LoginResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthLoginRequest request) {
        // Delegás toda la lógica de CUS-02 al servicio de aplicación
        LoginResult result = authService.login(request.email(), request.password());

        // Si querés, podrías derivar expiresIn de la fecha de expiración del JWT.
        // Por ahora dejamos las 2 horas fijas (en segundos) como tenías:
        long expiresInSeconds = 2 * 60 * 60L;

        AuthResponse response = new AuthResponse(
                result.accessToken(),
                result.refreshToken(),
                expiresInSeconds
        );

        return ResponseEntity.ok(response);
    }
}
