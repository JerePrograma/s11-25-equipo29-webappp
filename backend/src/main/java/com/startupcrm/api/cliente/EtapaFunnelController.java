// src/main/java/com/startupcrm/api/cliente/EtapaFunnelController.java
package com.startupcrm.api.cliente;

import com.startupcrm.application.cliente.EtapaFunnelService;
import com.startupcrm.domain.cliente.EtapaFunnel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etapas-funnel")
public class EtapaFunnelController {

    private final EtapaFunnelService service;
    private final EtapaFunnelApiMapper mapper;

    public EtapaFunnelController(EtapaFunnelService service, EtapaFunnelApiMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public EtapaFunnelResponse crear(@RequestBody EtapaFunnelCreateRequest request) {
        EtapaFunnel e = new EtapaFunnel();
        e.setNombre(request.nombre());
        e.setOrden(request.orden());
        e.setEsDefault(request.esDefault());
        EtapaFunnel creada = service.crear(e);
        return mapper.toResponse(creada);
    }

    @GetMapping
    public List<EtapaFunnelResponse> listarTodas() {
        return service.listarTodas()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public EtapaFunnelResponse obtener(@PathVariable Long id) {
        return mapper.toResponse(service.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public EtapaFunnelResponse actualizar(@PathVariable Long id,
                                          @RequestBody EtapaFunnelUpdateRequest request) {
        EtapaFunnel e = service.obtenerPorId(id);
        e.setNombre(request.nombre());
        e.setOrden(request.orden());
        e.setEsDefault(request.esDefault());
        EtapaFunnel actualizada = service.actualizar(e);
        return mapper.toResponse(actualizada);
    }
}
