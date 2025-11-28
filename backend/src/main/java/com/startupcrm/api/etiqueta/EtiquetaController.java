// src/main/java/com/startupcrm/api/etiqueta/EtiquetaController.java
package com.startupcrm.api.etiqueta;

import com.startupcrm.application.etiqueta.EtiquetaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Etiquetas",
        description = "Gestión de etiquetas aplicables a clientes, conversaciones y tareas."
)
@RestController
@RequestMapping("/api/etiquetas")
public class EtiquetaController {

    private final EtiquetaService etiquetaService;
    private final EtiquetaApiMapper mapper;

    public EtiquetaController(EtiquetaService etiquetaService,
                              EtiquetaApiMapper mapper) {
        this.etiquetaService = etiquetaService;
        this.mapper = mapper;
    }

    // =========================================================
    // Crear etiqueta
    // =========================================================
    @Operation(
            summary = "Crear una nueva etiqueta",
            description = """
                    Crea una etiqueta reutilizable en el CRM.
                    
                    Ejemplos de uso:
                    - Etiquetas para clientes: 'Lead caliente', 'Cliente enterprise'.
                    - Etiquetas para conversaciones: 'Respuesta pendiente'.
                    - Etiquetas para tareas: 'Prioridad alta'.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Etiqueta creada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    @PostMapping
    public EtiquetaResponse crear(
            @Valid @RequestBody EtiquetaCreateRequest request
    ) {
        var creada = etiquetaService.crearEtiqueta(
                request.nombre(),
                request.color(),
                request.aplicaA()
        );
        return mapper.toResponse(creada);
    }

    // =========================================================
    // Listar por aplicaA
    // =========================================================
    @Operation(
            summary = "Listar etiquetas por contexto",
            description = """
                    Devuelve todas las etiquetas definidas para un contexto específico.
                    
                    Contextos soportados:
                    - cliente
                    - conversacion
                    - tarea
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado devuelto correctamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    @GetMapping
    public List<EtiquetaResponse> listarPorAplicaA(
            @Parameter(description = "Contexto de aplicación de las etiquetas", example = "cliente")
            @RequestParam String aplicaA
    ) {
        return etiquetaService.listarEtiquetasPorAplicaA(aplicaA)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    // =========================================================
    // Actualizar etiqueta
    // =========================================================
    @Operation(
            summary = "Actualizar una etiqueta existente",
            description = "Permite modificar nombre y/o color de una etiqueta ya registrada."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Etiqueta actualizada correctamente"),
            @ApiResponse(responseCode = "404", description = "Etiqueta no encontrada")
    })
    @PutMapping("/{id}")
    public EtiquetaResponse actualizar(
            @Parameter(description = "ID de la etiqueta a actualizar", example = "1")
            @PathVariable Long id,
            @RequestBody EtiquetaUpdateRequest request
    ) {
        var actualizada = etiquetaService.actualizarEtiqueta(
                id,
                request.nombre(),
                request.color()
        );
        return mapper.toResponse(actualizada);
    }

    // =========================================================
    // Asignar etiqueta puntual a cliente
    // =========================================================
    @Operation(
            summary = "Asignar una etiqueta puntual a un cliente",
            description = """
                    Asigna una etiqueta específica a un cliente.
                    Útil para acciones rápidas desde la UI (ej. click en chip).
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Etiqueta asignada al cliente"),
            @ApiResponse(responseCode = "404", description = "Cliente o etiqueta no encontrados")
    })
    @PostMapping("/clientes/asignar")
    public void asignarEtiquetaACliente(
            @RequestBody ClienteEtiquetaAssignmentRequest request
    ) {
        etiquetaService.asignarEtiquetaACliente(
                request.clienteId(),
                request.etiquetaId()
        );
    }

    // =========================================================
    // Asignar etiqueta puntual a conversación
    // =========================================================
    @Operation(
            summary = "Asignar una etiqueta puntual a una conversación",
            description = "Asocia una etiqueta específica a una conversación."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Etiqueta asignada a la conversación"),
            @ApiResponse(responseCode = "404", description = "Conversación o etiqueta no encontradas")
    })
    @PostMapping("/conversaciones/asignar")
    public void asignarEtiquetaAConversacion(
            @RequestBody ConversacionEtiquetaAssignmentRequest request
    ) {
        etiquetaService.asignarEtiquetaAConversacion(
                request.conversacionId(),
                request.etiquetaId()
        );
    }

    // =========================================================
    // Listar etiquetas de un cliente
    // =========================================================
    @Operation(
            summary = "Listar etiquetas asociadas a un cliente",
            description = "Devuelve todas las etiquetas actualmente asociadas a un cliente."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado devuelto correctamente"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @GetMapping("/clientes/{clienteId}")
    public List<EtiquetaResponse> listarEtiquetasDeCliente(
            @Parameter(description = "ID del cliente", example = "10")
            @PathVariable Long clienteId
    ) {
        return etiquetaService.listarEtiquetasPorCliente(clienteId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    // =========================================================
    // CUS-07: actualizar conjunto de etiquetas de un cliente
    // =========================================================
    @Operation(
            summary = "Actualizar el conjunto de etiquetas de un cliente",
            description = """
                    Reemplaza el conjunto de etiquetas de un cliente por la lista enviada.
                    
                    CUS-07: Gestionar Etiquetas de Contacto (RF-07).
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Etiquetas del cliente actualizadas"),
            @ApiResponse(responseCode = "404", description = "Cliente, usuario actor o alguna etiqueta no encontrada")
    })
    @PutMapping("/clientes/{clienteId}")
    public void actualizarEtiquetasDeCliente(
            @Parameter(description = "ID del cliente", example = "10")
            @PathVariable Long clienteId,
            @RequestBody ClienteEtiquetasUpdateRequest request
    ) {
        etiquetaService.actualizarEtiquetasDeCliente(
                clienteId,
                request.etiquetaIds(),
                request.usuarioActorId()
        );
    }

    // =========================================================
    // Listar etiquetas de una conversación
    // =========================================================
    @Operation(
            summary = "Listar etiquetas asociadas a una conversación",
            description = "Devuelve todas las etiquetas actualmente asociadas a una conversación."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado devuelto correctamente"),
            @ApiResponse(responseCode = "404", description = "Conversación no encontrada")
    })
    @GetMapping("/conversaciones/{conversacionId}")
    public List<EtiquetaResponse> listarEtiquetasDeConversacion(
            @Parameter(description = "ID de la conversación", example = "5")
            @PathVariable Long conversacionId
    ) {
        return etiquetaService.listarEtiquetasPorConversacion(conversacionId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
