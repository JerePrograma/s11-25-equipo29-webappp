package com.startupcrm.api.etiqueta;

import com.startupcrm.application.etiqueta.EtiquetaService;
import com.startupcrm.domain.etiqueta.Etiqueta;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public EtiquetaResponse crear(@RequestBody EtiquetaCreateRequest request) {
        var creada = etiquetaService.crearEtiqueta(
                request.nombre(),
                request.color(),
                request.aplicaA()
        );
        return mapper.toResponse(creada);
    }

    @GetMapping
    public List<EtiquetaResponse> listarPorAplicaA(@RequestParam String aplicaA) {
        return etiquetaService.listarEtiquetasPorAplicaA(aplicaA)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}")
    public EtiquetaResponse actualizar(@PathVariable Long id,
                                       @RequestBody EtiquetaUpdateRequest request) {
        var actualizada = etiquetaService.actualizarEtiqueta(
                id,
                request.nombre(),
                request.color()
        );
        return mapper.toResponse(actualizada);
    }

    @PostMapping("/clientes/asignar")
    public void asignarEtiquetaACliente(@RequestBody ClienteEtiquetaAssignmentRequest request) {
        etiquetaService.asignarEtiquetaACliente(
                request.clienteId(),
                request.etiquetaId()
        );
    }

    @PostMapping("/conversaciones/asignar")
    public void asignarEtiquetaAConversacion(@RequestBody ConversacionEtiquetaAssignmentRequest request) {
        etiquetaService.asignarEtiquetaAConversacion(
                request.conversacionId(),
                request.etiquetaId()
        );
    }

    @GetMapping("/clientes/{clienteId}")
    public List<EtiquetaResponse> listarEtiquetasDeCliente(@PathVariable Long clienteId) {
        return etiquetaService.listarEtiquetasPorCliente(clienteId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @GetMapping("/conversaciones/{conversacionId}")
    public List<EtiquetaResponse> listarEtiquetasDeConversacion(@PathVariable Long conversacionId) {
        return etiquetaService.listarEtiquetasPorConversacion(conversacionId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
