// src/main/java/com/startupcrm/api/actividad/ActividadController.java
package com.startupcrm.api.actividad;

import com.startupcrm.application.actividad.ActividadService;
import com.startupcrm.application.cliente.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@Tag(
        name = "Actividades",
        description = "Registro de eventos y actividades asociadas a contactos, tareas y conversaciones."
)
@RestController
@RequestMapping("/api/actividades")
public class ActividadController {

    private final ActividadService actividadService;
    private final ClienteService clienteService;
    private final ActividadApiMapper mapper;

    public ActividadController(ActividadService actividadService,
                               ClienteService clienteService,
                               ActividadApiMapper mapper) {
        this.actividadService = actividadService;
        this.clienteService = clienteService;
        this.mapper = mapper;
    }

    @Operation(
            summary = "Listar actividades de un cliente",
            description = """
                    Devuelve el histórico de actividades asociadas a un cliente,
                    ordenadas de más reciente a más antigua.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado devuelto correctamente"),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    })
    @GetMapping("/cliente/{clienteId}")
    public List<ActividadResponse> listarPorCliente(
            @Parameter(description = "ID del cliente", example = "10")
            @PathVariable Long clienteId
    ) {
        var c = clienteService.obtenerPorId(clienteId);
        return actividadService.listarPorCliente(c)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Operation(
            summary = "Listar actividades entre fechas",
            description = """
                    Devuelve actividades registradas en un rango temporal.
                    Formato de fechas esperado: ISO-8601 (ej: 2025-11-20T00:00:00Z).
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado devuelto correctamente")
    })
    @GetMapping
    public List<ActividadResponse> listarEntreFechas(
            @Parameter(description = "Fecha/hora desde (incluida) en formato ISO-8601",
                    example = "2025-11-20T00:00:00Z")
            @RequestParam String desde,
            @Parameter(description = "Fecha/hora hasta (incluida) en formato ISO-8601",
                    example = "2025-11-21T00:00:00Z")
            @RequestParam String hasta
    ) {
        OffsetDateTime d = OffsetDateTime.parse(desde);
        OffsetDateTime h = OffsetDateTime.parse(hasta);
        return actividadService.listarEntreFechas(d, h)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
