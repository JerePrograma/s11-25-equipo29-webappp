// src/main/java/com/startupcrm/api/plantilla/PlantillaComunicacionController.java
package com.startupcrm.api.plantilla;

import com.startupcrm.application.plantilla.PlantillaComunicacionService;
import com.startupcrm.domain.plantilla.PlantillaComunicacion;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plantillas")
public class PlantillaComunicacionController {

    private final PlantillaComunicacionService service;
    private final PlantillaComunicacionApiMapper mapper;

    public PlantillaComunicacionController(PlantillaComunicacionService service,
                                           PlantillaComunicacionApiMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public PlantillaResponse crear(@RequestBody PlantillaCreateRequest request) {
        PlantillaComunicacion p = new PlantillaComunicacion();
        p.setCanal(request.canal());
        p.setNombre(request.nombre());
        p.setAsunto(request.asunto());
        p.setCuerpo(request.cuerpo());
        p.setVariablesJson(request.variablesJson());
        PlantillaComunicacion creada = service.crear(p);
        return mapper.toResponse(creada);
    }

    @GetMapping("/{id}")
    public PlantillaResponse obtener(@PathVariable Long id) {
        return mapper.toResponse(service.obtenerPorId(id));
    }

    @GetMapping
    public List<PlantillaResponse> listarPorCanal(@RequestParam String canal) {
        return service.listarPorCanal(canal)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}")
    public PlantillaResponse actualizar(@PathVariable Long id,
                                        @RequestBody PlantillaUpdateRequest request) {
        PlantillaComunicacion p = service.obtenerPorId(id);
        p.setNombre(request.nombre());
        p.setAsunto(request.asunto());
        p.setCuerpo(request.cuerpo());
        p.setVariablesJson(request.variablesJson());
        PlantillaComunicacion actualizada = service.actualizar(p);
        return mapper.toResponse(actualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
