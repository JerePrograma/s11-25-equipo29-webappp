// src/main/java/com/startupcrm/api/usuario/UsuarioController.java
package com.startupcrm.api.usuario;

import com.startupcrm.application.usuario.UsuarioService;
import com.startupcrm.domain.usuario.Rol;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.application.usuario.RolService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final RolService rolService;
    private final UsuarioApiMapper mapper;

    public UsuarioController(UsuarioService usuarioService,
                             RolService rolService,
                             UsuarioApiMapper mapper) {
        this.usuarioService = usuarioService;
        this.rolService = rolService;
        this.mapper = mapper;
    }

    @PostMapping
    public UsuarioResponse crear(@RequestBody UsuarioCreateRequest request) {
        Rol rol = rolService.obtenerPorId(request.rolId());

        Usuario u = new Usuario();
        u.setNombre(request.nombre());
        u.setEmail(request.email());
        u.setPasswordHash("TODO_ENCODE"); // acá iría el AuthService / PasswordEncoder
        u.setTelefono(request.telefono());
        u.setRol(rol);
        u.setEstado("activo");

        Usuario guardado = usuarioService.crear(u);
        return mapper.toResponse(guardado);
    }

    @GetMapping("/{id}")
    public UsuarioResponse obtener(@PathVariable Long id) {
        Usuario u = usuarioService.obtenerPorId(id);
        return mapper.toResponse(u);
    }

    @GetMapping
    public List<UsuarioResponse> listarTodos() {
        return usuarioService.listarTodos()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}")
    public UsuarioResponse actualizar(@PathVariable Long id,
                                      @RequestBody UsuarioUpdateRequest request) {
        Usuario u = usuarioService.obtenerPorId(id);
        mapper.updateEntity(u, request);
        if (request.rolId() != null) {
            Rol rol = rolService.obtenerPorId(request.rolId());
            u.setRol(rol);
        }
        Usuario actualizado = usuarioService.actualizar(u);
        return mapper.toResponse(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
    }
}
