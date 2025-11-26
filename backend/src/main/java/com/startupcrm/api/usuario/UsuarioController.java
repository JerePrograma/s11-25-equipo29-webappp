// src/main/java/com/startupcrm/api/usuario/UsuarioController.java
package com.startupcrm.api.usuario;

import com.startupcrm.application.usuario.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@Tag(
        name = "Usuarios",
        description = """
                CUS-01 / RF-01: Registro de usuarios.
                Además, gestión de usuarios (consulta, actualización, eliminación).
                """
)
@SecurityRequirement(name = "bearerAuth")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    @Operation(
            summary = "Registrar un nuevo usuario",
            description = """
                    CUS-01 / RF-01: Crea un nuevo usuario del CRM.
                    Validaciones:
                    - Email único.
                    - Formato de email válido.
                    - Contraseña con longitud mínima definida.
                    """,
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Usuario creado correctamente.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = UsuarioResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Datos inválidos (email duplicado, formato inválido, etc.).",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "No autenticado (si se restringe a admin).",
                            content = @Content
                    )
            }
    )
    public UsuarioResponse crear(@RequestBody UsuarioCreateRequest request) {
        return usuarioService.registrar(request);
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Obtener un usuario por id",
            description = "Devuelve los datos de un usuario específico.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Usuario encontrado.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = UsuarioResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Usuario no encontrado.",
                            content = @Content
                    )
            }
    )
    public UsuarioResponse obtener(@PathVariable Long id) {
        return usuarioService.obtenerResponsePorId(id);
    }

    @GetMapping
    @Operation(
            summary = "Listar todos los usuarios",
            description = "Devuelve el listado de usuarios registrados en el CRM.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Listado de usuarios.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = UsuarioResponse.class)
                            )
                    )
            }
    )
    public List<UsuarioResponse> listarTodos() {
        return usuarioService.listarTodosResponse();
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Actualizar un usuario",
            description = "Permite modificar los datos de un usuario existente (nombre, teléfono, rol, estado).",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Usuario actualizado correctamente.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = UsuarioResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Usuario no encontrado.",
                            content = @Content
                    )
            }
    )
    public UsuarioResponse actualizar(@PathVariable Long id,
                                      @RequestBody UsuarioUpdateRequest request) {
        return usuarioService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Eliminar un usuario",
            description = "Elimina lógicamente o físicamente un usuario (según implementación de servicio).",
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Usuario eliminado correctamente (sin contenido).",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Usuario no encontrado.",
                            content = @Content
                    )
            }
    )
    public void eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
    }
}
