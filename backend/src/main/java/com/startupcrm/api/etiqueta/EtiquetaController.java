// src/main/java/com/startupcrm/api/etiqueta/EtiquetaController.java
package com.startupcrm.api.etiqueta;

import com.startupcrm.application.cliente.ClienteService;
import com.startupcrm.application.conversacion.ConversacionService;
import com.startupcrm.application.etiqueta.ClienteEtiquetaService;
import com.startupcrm.application.etiqueta.ConversacionEtiquetaService;
import com.startupcrm.application.etiqueta.EtiquetaService;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.etiqueta.ClienteEtiqueta;
import com.startupcrm.domain.etiqueta.ConversacionEtiqueta;
import com.startupcrm.domain.etiqueta.Etiqueta;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etiquetas")
public class EtiquetaController {

    private final EtiquetaService etiquetaService;
    private final ClienteEtiquetaService clienteEtiquetaService;
    private final ConversacionEtiquetaService conversacionEtiquetaService;
    private final ClienteService clienteService;
    private final ConversacionService conversacionService;
    private final EtiquetaApiMapper mapper;

    public EtiquetaController(EtiquetaService etiquetaService,
                              ClienteEtiquetaService clienteEtiquetaService,
                              ConversacionEtiquetaService conversacionEtiquetaService,
                              ClienteService clienteService,
                              ConversacionService conversacionService,
                              EtiquetaApiMapper mapper) {
        this.etiquetaService = etiquetaService;
        this.clienteEtiquetaService = clienteEtiquetaService;
        this.conversacionEtiquetaService = conversacionEtiquetaService;
        this.clienteService = clienteService;
        this.conversacionService = conversacionService;
        this.mapper = mapper;
    }

    @PostMapping
    public EtiquetaResponse crear(@RequestBody EtiquetaCreateRequest request) {
        Etiqueta e = new Etiqueta();
        e.setNombre(request.nombre());
        e.setColor(request.color());
        e.setAplicaA(request.aplicaA());
        Etiqueta creada = etiquetaService.crear(e);
        return mapper.toResponse(creada);
    }

    @GetMapping
    public List<EtiquetaResponse> listarPorAplicaA(@RequestParam String aplicaA) {
        return etiquetaService.listarPorAplicaA(aplicaA)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}")
    public EtiquetaResponse actualizar(@PathVariable Long id,
                                       @RequestBody EtiquetaUpdateRequest request) {
        Etiqueta e = etiquetaService.obtenerPorId(id);
        e.setNombre(request.nombre());
        e.setColor(request.color());
        Etiqueta actualizada = etiquetaService.actualizar(e);
        return mapper.toResponse(actualizada);
    }

    @PostMapping("/clientes/asignar")
    public void asignarEtiquetaACliente(@RequestBody ClienteEtiquetaAssignmentRequest request) {
        Cliente cliente = clienteService.obtenerPorId(request.clienteId());
        Etiqueta etiqueta = etiquetaService.obtenerPorId(request.etiquetaId());
        clienteEtiquetaService.asignarEtiquetaACliente(cliente, etiqueta);
    }

    @PostMapping("/conversaciones/asignar")
    public void asignarEtiquetaAConversacion(@RequestBody ConversacionEtiquetaAssignmentRequest request) {
        Conversacion conversacion = conversacionService.obtenerPorId(request.conversacionId());
        Etiqueta etiqueta = etiquetaService.obtenerPorId(request.etiquetaId());
        conversacionEtiquetaService.asignarEtiquetaAConversacion(conversacion, etiqueta);
    }

    @GetMapping("/clientes/{clienteId}")
    public List<EtiquetaResponse> listarEtiquetasDeCliente(@PathVariable Long clienteId) {
        Cliente cliente = clienteService.obtenerPorId(clienteId);
        return clienteEtiquetaService.listarPorCliente(cliente)
                .stream()
                .map(ClienteEtiqueta::getEtiqueta)
                .map(mapper::toResponse)
                .toList();
    }

    @GetMapping("/conversaciones/{conversacionId}")
    public List<EtiquetaResponse> listarEtiquetasDeConversacion(@PathVariable Long conversacionId) {
        Conversacion conversacion = conversacionService.obtenerPorId(conversacionId);
        return conversacionEtiquetaService.listarPorConversacion(conversacion)
                .stream()
                .map(ConversacionEtiqueta::getEtiqueta)
                .map(mapper::toResponse)
                .toList();
    }
}
