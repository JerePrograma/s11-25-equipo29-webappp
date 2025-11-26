// src/main/java/com/startupcrm/api/usuario/RolController.java
package com.startupcrm.api.usuario;

import com.startupcrm.application.usuario.RolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@Tag(
        name = "Roles",
        description = """
                CUS-04 / RF-04: Gestión de roles y permisos.
                Permite crear, listar, obtener y actualizar roles del sistema.
                Requiere rol ADMIN.
                """
)
@SecurityRequirement(name = "bearerAuth")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    @Operation(
            summary = "Crear un nuevo rol",
            description = "Crea un rol con nombre, descripción y permisos JSON.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Rol creado correctamente.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = RolResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "No autenticado.",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "No autorizado (se requiere rol ADMIN).",
                            content = @Content
                    )
            }
    )
    public RolResponse crear(@RequestBody RolCreateRequest request) {
        return rolService.crear(request);
    }

    @GetMapping
    @Operation(
            summary = "Listar todos los roles",
            description = "Devuelve el listado completo de roles configurados en el sistema.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Listado de roles.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = RolResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "No autenticado.",
                            content = @Content
                    )
            }
    )
    public List<RolResponse> listarTodos() {
        return rolService.listarTodosResponse();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Obtener un rol por id",
            description = "Devuelve el detalle de un rol específico.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Rol encontrado.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = RolResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Rol no encontrado.",
                            content = @Content
                    )
            }
    )
    public RolResponse obtener(@PathVariable Long id) {
        return rolService.obtenerResponsePorId(id);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Actualizar un rol existente",
            description = "Permite modificar la descripción y los permisos de un rol.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Rol actualizado correctamente.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = RolResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Rol no encontrado.",
                            content = @Content
                    )
            }
    )
    public RolResponse actualizar(@PathVariable Long id,
                                  @RequestBody RolUpdateRequest request) {
        return rolService.actualizar(id, request);
    }
}
