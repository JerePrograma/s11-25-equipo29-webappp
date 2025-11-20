// src/main/java/com/startupcrm/api/usuario/RolController.java
package com.startupcrm.api.usuario;

import com.startupcrm.application.usuario.RolService;
import com.startupcrm.domain.usuario.Rol;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    private final RolService rolService;
    private final RolApiMapper mapper;

    public RolController(RolService rolService, RolApiMapper mapper) {
        this.rolService = rolService;
        this.mapper = mapper;
    }

    @PostMapping
    public RolResponse crear(@RequestBody RolCreateRequest request) {
        Rol rol = new Rol();
        rol.setNombre(request.nombre());
        rol.setDescripcion(request.descripcion());
        rol.setPermisosJson(request.permisosJson());
        Rol creado = rolService.crear(rol);
        return mapper.toResponse(creado);
    }

    @GetMapping
    public List<RolResponse> listarTodos() {
        return rolService.listarTodos()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public RolResponse obtener(@PathVariable Long id) {
        return mapper.toResponse(rolService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public RolResponse actualizar(@PathVariable Long id,
                                  @RequestBody RolUpdateRequest request) {
        Rol rol = rolService.obtenerPorId(id);
        mapper.updateEntity(rol, request);
        Rol actualizado = rolService.actualizar(rol);
        return mapper.toResponse(actualizado);
    }
}
