// src/main/java/com/startupcrm/api/vista/VistaGuardadaController.java
package com.startupcrm.api.vista;

import com.startupcrm.application.usuario.UsuarioService;
import com.startupcrm.application.vista.VistaGuardadaService;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.vista.VistaGuardada;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vistas")
public class VistaGuardadaController {

    private final VistaGuardadaService service;
    private final UsuarioService usuarioService;
    private final VistaGuardadaApiMapper mapper;

    public VistaGuardadaController(VistaGuardadaService service,
                                   UsuarioService usuarioService,
                                   VistaGuardadaApiMapper mapper) {
        this.service = service;
        this.usuarioService = usuarioService;
        this.mapper = mapper;
    }

    @PostMapping
    public VistaGuardadaResponse crear(@RequestBody VistaGuardadaCreateRequest request,
                                       @RequestParam Long usuarioId) {
        Usuario u = usuarioService.obtenerPorId(usuarioId);
        VistaGuardada v = new VistaGuardada();
        v.setUsuario(u);
        v.setEntidad(request.entidad());
        v.setNombre(request.nombre());
        v.setFiltrosJson(request.filtrosJson());
        v.setColumnasJson(request.columnasJson());
        v.setEsPublica(request.esPublica());
        VistaGuardada creada = service.crear(v);
        return mapper.toResponse(creada);
    }

    @GetMapping("/{id}")
    public VistaGuardadaResponse obtener(@PathVariable Long id) {
        return mapper.toResponse(service.obtenerPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<VistaGuardadaResponse> listarPorUsuario(@PathVariable Long usuarioId) {
        Usuario u = usuarioService.obtenerPorId(usuarioId);
        return service.listarPorUsuario(u)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @GetMapping("/publicas")
    public List<VistaGuardadaResponse> listarPublicas() {
        return service.listarPublicas()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}")
    public VistaGuardadaResponse actualizar(@PathVariable Long id,
                                            @RequestBody VistaGuardadaUpdateRequest request) {
        VistaGuardada v = service.obtenerPorId(id);
        v.setNombre(request.nombre());
        v.setFiltrosJson(request.filtrosJson());
        v.setColumnasJson(request.columnasJson());
        v.setEsPublica(request.esPublica());
        VistaGuardada actualizada = service.actualizar(v);
        return mapper.toResponse(actualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
