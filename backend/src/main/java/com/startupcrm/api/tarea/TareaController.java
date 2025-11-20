// src/main/java/com/startupcrm/api/tarea/TareaController.java
package com.startupcrm.api.tarea;

import com.startupcrm.application.cliente.ClienteService;
import com.startupcrm.application.conversacion.ConversacionService;
import com.startupcrm.application.tarea.TareaService;
import com.startupcrm.application.usuario.UsuarioService;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.tarea.Tarea;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    private final TareaService tareaService;
    private final ClienteService clienteService;
    private final ConversacionService conversacionService;
    private final UsuarioService usuarioService;
    private final TareaApiMapper mapper;

    public TareaController(TareaService tareaService,
                           ClienteService clienteService,
                           ConversacionService conversacionService,
                           UsuarioService usuarioService,
                           TareaApiMapper mapper) {
        this.tareaService = tareaService;
        this.clienteService = clienteService;
        this.conversacionService = conversacionService;
        this.usuarioService = usuarioService;
        this.mapper = mapper;
    }

    @PostMapping
    public TareaResponse crear(@RequestBody TareaCreateRequest request) {
        Cliente cliente = request.clienteId() != null
                ? clienteService.obtenerPorId(request.clienteId()) : null;
        Conversacion conversacion = request.conversacionId() != null
                ? conversacionService.obtenerPorId(request.conversacionId()) : null;
        Usuario asignado = usuarioService.obtenerPorId(request.asignadoAId());

        Tarea t = new Tarea();
        t.setTitulo(request.titulo());
        t.setDescripcion(request.descripcion());
        t.setCliente(cliente);
        t.setConversacion(conversacion);
        t.setAsignadoA(asignado);
        t.setFechaLimite(request.fechaLimite());
        t.setPrioridad(request.prioridad());
        t.setEstado("pendiente");

        Tarea creada = tareaService.crear(t);
        return mapper.toResponse(creada);
    }

    @GetMapping("/{id}")
    public TareaResponse obtener(@PathVariable Long id) {
        return mapper.toResponse(tareaService.obtenerPorId(id));
    }

    @GetMapping
    public List<TareaResponse> listarPorUsuario(@RequestParam Long asignadoAId) {
        Usuario u = usuarioService.obtenerPorId(asignadoAId);
        List<String> estados = List.of("pendiente", "en_progreso");
        return tareaService.listarPendientesPorUsuario(u, estados)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}")
    public TareaResponse actualizar(@PathVariable Long id,
                                    @RequestBody TareaUpdateRequest request) {
        Tarea t = tareaService.obtenerPorId(id);
        t.setTitulo(request.titulo());
        t.setDescripcion(request.descripcion());
        t.setEstado(request.estado());
        t.setPrioridad(request.prioridad());
        t.setFechaLimite(request.fechaLimite());
        t.setRecordatorioEn(request.recordatorioEn());
        if (request.asignadoAId() != null) {
            t.setAsignadoA(usuarioService.obtenerPorId(request.asignadoAId()));
        }
        Tarea actualizada = tareaService.actualizar(t);
        return mapper.toResponse(actualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        tareaService.eliminar(id);
    }
}
