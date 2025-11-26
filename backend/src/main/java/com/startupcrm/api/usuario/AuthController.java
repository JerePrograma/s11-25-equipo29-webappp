// src/main/java/com/startupcrm/api/usuario/AuthController.java
package com.startupcrm.api.usuario;

import com.startupcrm.application.auth.AuthService;
import com.startupcrm.application.auth.AuthService.LoginResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(
        name = "Autenticación",
        description = """
                CUS-02 / RF-02: Inicio de sesión de usuarios del Startup CRM.
                Provee tokens JWT de acceso y refresco.
                """
)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(
            summary = "Iniciar sesión",
            description = """
                    CUS-02 / RF-02: Permite a un usuario autenticarse mediante email y contraseña.
                    Si las credenciales son válidas, devuelve un accessToken (JWT) y un refreshToken.
                    """,
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Login exitoso. Se devuelven tokens JWT.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = AuthResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Credenciales inválidas o payload incorrecto.",
                            content = @Content
                    )
            }
    )
    public ResponseEntity<AuthResponse> login(@RequestBody AuthLoginRequest request) {
        LoginResult result = authService.login(request.email(), request.password());

        long expiresInSeconds = 2 * 60 * 60L;

        AuthResponse response = new AuthResponse(
                result.accessToken(),
                result.refreshToken(),
                expiresInSeconds
        );

        return ResponseEntity.ok(response);
    }
}
