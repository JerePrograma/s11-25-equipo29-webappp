// src/main/java/com/startupcrm/api/usuario/RolController.java
package com.startupcrm.api.usuario;

import com.startupcrm.application.usuario.RolService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public RolResponse crear(@RequestBody RolCreateRequest request) {
        // Delegás toda la lógica + mapping al servicio
        return rolService.crear(request);
    }

    @GetMapping
    public List<RolResponse> listarTodos() {
        return rolService.listarTodosResponse();
    }

    @GetMapping("/{id}")
    public RolResponse obtener(@PathVariable Long id) {
        return rolService.obtenerResponsePorId(id);
    }

    @PutMapping("/{id}")
    public RolResponse actualizar(@PathVariable Long id,
                                  @RequestBody RolUpdateRequest request) {
        return rolService.actualizar(id, request);
    }
}
