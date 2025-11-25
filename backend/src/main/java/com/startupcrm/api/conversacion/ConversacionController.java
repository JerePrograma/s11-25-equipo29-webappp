// src/main/java/com/startupcrm/api/conversacion/ConversacionController.java
package com.startupcrm.api.conversacion;

import com.startupcrm.application.cliente.ClienteService;
import com.startupcrm.application.conversacion.CanalIntegracionService;
import com.startupcrm.application.conversacion.ConversacionService;
import com.startupcrm.application.etiqueta.ConversacionEtiquetaService;
import com.startupcrm.application.usuario.UsuarioService;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.conversacion.CanalIntegracion;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.etiqueta.ConversacionEtiqueta;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversaciones")
public class ConversacionController {

    private final ConversacionService conversacionService;
    private final ClienteService clienteService;
    private final CanalIntegracionService canalIntegracionService;
    private final UsuarioService usuarioService;
    private final ConversacionEtiquetaService conversacionEtiquetaService;
    private final ConversacionApiMapper mapper;

    public ConversacionController(ConversacionService conversacionService,
                                  ClienteService clienteService,
                                  CanalIntegracionService canalIntegracionService,
                                  UsuarioService usuarioService,
                                  ConversacionEtiquetaService conversacionEtiquetaService,
                                  ConversacionApiMapper mapper) {
        this.conversacionService = conversacionService;
        this.clienteService = clienteService;
        this.canalIntegracionService = canalIntegracionService;
        this.usuarioService = usuarioService;
        this.conversacionEtiquetaService = conversacionEtiquetaService;
        this.mapper = mapper;
    }

    @PostMapping
    public ConversacionResponse crear(@RequestBody ConversacionCreateRequest request) {
        Cliente cliente = clienteService.obtenerPorId(request.clienteId());
        CanalIntegracion canal = canalIntegracionService.obtenerPorId(request.canalIntegracionId());
        Usuario asignado = usuarioService.obtenerPorId(request.asignadoAId());

        Conversacion c = new Conversacion();
        c.setCliente(cliente);
        c.setCanal(request.canal());
        c.setCanalIntegracion(canal);
        c.setAsunto(request.asunto());
        c.setEstado("abierta");
        c.setAsignadoA(asignado);

        Conversacion creada = conversacionService.crear(c);
        List<String> etiquetas = conversacionEtiquetaService
                .listarPorConversacion(creada)
                .stream()
                .map(ConversacionEtiqueta::getEtiqueta)
                .map(e -> e.getNombre())
                .toList();

        return mapper.toResponse(creada, etiquetas);
    }

    @GetMapping("/{id}")
    public ConversacionResponse obtener(@PathVariable Long id) {
        Conversacion c = conversacionService.obtenerPorId(id);
        List<String> etiquetas = conversacionEtiquetaService
                .listarPorConversacion(c)
                .stream()
                .map(ConversacionEtiqueta::getEtiqueta)
                .map(e -> e.getNombre())
                .toList();
        return mapper.toResponse(c, etiquetas);
    }

    @GetMapping
    public List<ConversacionResponse> listarTodas() {
        return conversacionService.listarTodas()
                .stream()
                .map(c -> mapper.toResponse(c, List.of()))
                .toList();
    }

    @PutMapping("/{id}")
    public ConversacionResponse actualizar(@PathVariable Long id,
                                           @RequestBody ConversacionUpdateRequest request) {
        Conversacion c = conversacionService.obtenerPorId(id);
        c.setEstado(request.estado());
        if (request.asignadoAId() != null) {
            c.setAsignadoA(usuarioService.obtenerPorId(request.asignadoAId()));
        }
        Conversacion actualizada = conversacionService.actualizar(c);
        return mapper.toResponse(actualizada, List.of());
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        conversacionService.eliminar(id);
    }
}
