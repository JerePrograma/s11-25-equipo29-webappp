// src/main/java/com/startupcrm/api/cliente/ClienteController.java
package com.startupcrm.api.cliente;

import com.startupcrm.application.cliente.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Contactos",
        description = "Gestión de contactos (leads y clientes) y su recorrido por el funnel comercial."
)
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // =========================================================
    // CUS-05: Crear contacto
    // =========================================================
    @Operation(
            summary = "Crear un nuevo contacto (lead/cliente)",
            description = """
                    CUS-05: Gestionar Contacto (RF-05).
                    
                    Crea una ficha de contacto con datos básicos, etapa del funnel y propietario asignado.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    @PostMapping
    public ClienteResponse crear(
            @Valid @RequestBody ClienteCreateRequest request
    ) {
        return clienteService.crear(request);
    }

    // =========================================================
    // Obtener detalle de contacto
    // =========================================================
    @Operation(
            summary = "Obtener detalle de un contacto",
            description = "Devuelve la ficha completa de un contacto, incluyendo etapa actual y etiquetas."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @GetMapping("/{id}")
    public ClienteResponse obtener(
            @Parameter(description = "ID del cliente", example = "10")
            @PathVariable Long id
    ) {
        return clienteService.obtenerResponsePorId(id);
    }

    // =========================================================
    // Listar contactos
    // =========================================================
    @Operation(
            summary = "Listar todos los contactos",
            description = "Devuelve el listado de contactos registrados en el CRM."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado devuelto correctamente")
    })
    @GetMapping
    public List<ClienteResponse> listarTodos() {
        return clienteService.listarTodosResponse();
    }

    // =========================================================
    // CUS-05: Actualizar contacto
    // =========================================================
    @Operation(
            summary = "Actualizar un contacto existente",
            description = """
                    CUS-05: Gestionar Contacto (RF-05).
                    
                    Permite modificar datos del contacto, etapa del funnel y propietario.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente actualizado correctamente"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @PutMapping("/{id}")
    public ClienteResponse actualizar(
            @Parameter(description = "ID del cliente a actualizar", example = "10")
            @PathVariable Long id,
            @RequestBody ClienteUpdateRequest request
    ) {
        return clienteService.actualizar(id, request);
    }

    // =========================================================
    // CUS-06: Cambiar etapa del funnel
    // =========================================================
    @Operation(
            summary = "Cambiar la etapa del funnel de un contacto",
            description = """
                    CUS-06: Gestionar Etapas del Funnel (RF-06).
                    
                    Se usa típicamente desde la vista Kanban (drag & drop) para mover un contacto
                    entre columnas de etapas comerciales.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Etapa actualizada correctamente"),
            @ApiResponse(responseCode = "404", description = "Cliente, etapa o usuario actor no encontrado")
    })
    @PutMapping("/{id}/etapa-funnel")
    public ClienteResponse cambiarEtapaFunnel(
            @Parameter(description = "ID del cliente", example = "10")
            @PathVariable Long id,
            @RequestBody ClienteCambioEtapaRequest request
    ) {
        return clienteService.cambiarEtapaFunnel(
                id,
                request.etapaFunnelId(),
                request.usuarioActorId()
        );
    }

    // =========================================================
    // Eliminar contacto
    // =========================================================
    @Operation(
            summary = "Eliminar un contacto",
            description = "Elimina un contacto del CRM. Usar con cuidado."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente eliminado"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @DeleteMapping("/{id}")
    public void eliminar(
            @Parameter(description = "ID del cliente a eliminar", example = "10")
            @PathVariable Long id
    ) {
        clienteService.eliminar(id);
    }
}
