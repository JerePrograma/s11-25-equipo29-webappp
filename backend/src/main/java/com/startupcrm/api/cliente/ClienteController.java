// src/main/java/com/startupcrm/api/cliente/ClienteController.java
package com.startupcrm.api.cliente;

import com.startupcrm.application.cliente.ClienteService;
import com.startupcrm.application.cliente.EtapaFunnelService;
import com.startupcrm.application.etiqueta.ClienteEtiquetaService;
import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.cliente.EtapaFunnel;
import com.startupcrm.domain.etiqueta.ClienteEtiqueta;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.application.usuario.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;
    private final EtapaFunnelService etapaFunnelService;
    private final UsuarioService usuarioService;
    private final ClienteEtiquetaService clienteEtiquetaService;
    private final ClienteApiMapper mapper;

    public ClienteController(ClienteService clienteService,
                             EtapaFunnelService etapaFunnelService,
                             UsuarioService usuarioService,
                             ClienteEtiquetaService clienteEtiquetaService,
                             ClienteApiMapper mapper) {
        this.clienteService = clienteService;
        this.etapaFunnelService = etapaFunnelService;
        this.usuarioService = usuarioService;
        this.clienteEtiquetaService = clienteEtiquetaService;
        this.mapper = mapper;
    }

    @PostMapping
    public ClienteResponse crear(@RequestBody ClienteCreateRequest request) {
        EtapaFunnel etapa = request.etapaFunnelId() != null
                ? etapaFunnelService.obtenerPorId(request.etapaFunnelId())
                : etapaFunnelService.obtenerDefault();

        Usuario propietario = usuarioService.obtenerPorId(request.propietarioId());

        Cliente c = new Cliente();
        c.setNombre(request.nombre());
        c.setEmail(request.email());
        c.setTelefono(request.telefono());
        c.setTipo(request.tipo());
        c.setEstadoGeneral(request.estadoGeneral());
        c.setEtapaFunnel(etapa);
        c.setPropietario(propietario);
        c.setOrigen(request.origen());

        Cliente creado = clienteService.crear(c);
        List<String> etiquetas = clienteEtiquetaService
                .listarPorCliente(creado)
                .stream()
                .map(ClienteEtiqueta::getEtiqueta)
                .map(e -> e.getNombre())
                .toList();

        return mapper.toResponse(creado, etiquetas);
    }

    @GetMapping("/{id}")
    public ClienteResponse obtener(@PathVariable Long id) {
        Cliente c = clienteService.obtenerPorId(id);
        List<String> etiquetas = clienteEtiquetaService
                .listarPorCliente(c)
                .stream()
                .map(ClienteEtiqueta::getEtiqueta)
                .map(e -> e.getNombre())
                .toList();
        return mapper.toResponse(c, etiquetas);
    }

    @GetMapping
    public List<ClienteResponse> listarTodos() {
        return clienteService.listarTodos()
                .stream()
                .map(c -> mapper.toResponse(c, List.of()))
                .toList();
    }

    @PutMapping("/{id}")
    public ClienteResponse actualizar(@PathVariable Long id,
                                      @RequestBody ClienteUpdateRequest request) {
        Cliente c = clienteService.obtenerPorId(id);
        c.setNombre(request.nombre());
        c.setEmail(request.email());
        c.setTelefono(request.telefono());
        c.setTipo(request.tipo());
        c.setEstadoGeneral(request.estadoGeneral());
        c.setOrigen(request.origen());

        if (request.etapaFunnelId() != null) {
            c.setEtapaFunnel(etapaFunnelService.obtenerPorId(request.etapaFunnelId()));
        }
        if (request.propietarioId() != null) {
            c.setPropietario(usuarioService.obtenerPorId(request.propietarioId()));
        }

        Cliente actualizado = clienteService.actualizar(c);
        return mapper.toResponse(actualizado, List.of());
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        clienteService.eliminar(id);
    }
}
