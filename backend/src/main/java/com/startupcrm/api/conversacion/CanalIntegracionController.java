// src/main/java/com/startupcrm/api/conversacion/CanalIntegracionController.java
package com.startupcrm.api.conversacion;

import com.startupcrm.application.conversacion.CanalIntegracionService;
import com.startupcrm.domain.conversacion.CanalIntegracion;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/canales-integracion")
public class CanalIntegracionController {

    private final CanalIntegracionService service;
    private final CanalIntegracionApiMapper mapper;

    public CanalIntegracionController(CanalIntegracionService service,
                                      CanalIntegracionApiMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public CanalIntegracionResponse crear(@RequestBody CanalIntegracionCreateRequest request) {
        CanalIntegracion c = new CanalIntegracion();
        c.setTipo(request.tipo());
        c.setNombre(request.nombre());
        c.setConfigJson(request.configJson());
        c.setActivo(request.activo());
        CanalIntegracion creado = service.crear(c);
        return mapper.toResponse(creado);
    }

    @GetMapping
    public List<CanalIntegracionResponse> listarTodos() {
        return service.listarTodos()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public CanalIntegracionResponse obtener(@PathVariable Long id) {
        return mapper.toResponse(service.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public CanalIntegracionResponse actualizar(@PathVariable Long id,
                                               @RequestBody CanalIntegracionUpdateRequest request) {
        CanalIntegracion c = service.obtenerPorId(id);
        c.setNombre(request.nombre());
        c.setConfigJson(request.configJson());
        c.setActivo(request.activo());
        CanalIntegracion actualizado = service.actualizar(c);
        return mapper.toResponse(actualizado);
    }
}
