// src/main/java/com/startupcrm/api/actividad/ActividadController.java
package com.startupcrm.api.actividad;

import com.startupcrm.application.actividad.ActividadService;
import com.startupcrm.application.cliente.ClienteService;
import com.startupcrm.domain.actividad.Actividad;
import com.startupcrm.domain.cliente.Cliente;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

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

    @GetMapping("/cliente/{clienteId}")
    public List<ActividadResponse> listarPorCliente(@PathVariable Long clienteId) {
        Cliente c = clienteService.obtenerPorId(clienteId);
        return actividadService.listarPorCliente(c)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @GetMapping
    public List<ActividadResponse> listarEntreFechas(@RequestParam String desde,
                                                     @RequestParam String hasta) {
        OffsetDateTime d = OffsetDateTime.parse(desde);
        OffsetDateTime h = OffsetDateTime.parse(hasta);
        return actividadService.listarEntreFechas(d, h)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
