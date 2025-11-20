// src/main/java/com/startupcrm/api/mensaje/MensajeController.java
package com.startupcrm.api.mensaje;

import com.startupcrm.application.conversacion.ConversacionService;
import com.startupcrm.application.mensaje.MensajeService;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.mensaje.Mensaje;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
public class MensajeController {

    private final MensajeService mensajeService;
    private final ConversacionService conversacionService;
    private final MensajeApiMapper mapper;

    public MensajeController(MensajeService mensajeService,
                             ConversacionService conversacionService,
                             MensajeApiMapper mapper) {
        this.mensajeService = mensajeService;
        this.conversacionService = conversacionService;
        this.mapper = mapper;
    }

    @PostMapping
    public MensajeResponse enviar(@RequestBody MensajeSendRequest request) {
        Conversacion conversacion = conversacionService.obtenerPorId(request.conversacionId());

        Mensaje m = new Mensaje();
        m.setConversacion(conversacion);
        m.setCanal(conversacion.getCanal());
        m.setDireccion("out");
        m.setContenido(request.contenido());
        m.setFechaEnvio(OffsetDateTime.now());
        m.setEstado("enviado");
        // remitenteUsuario se setea con usuario autenticado (falta Security)

        Mensaje guardado = mensajeService.guardar(m);
        return mapper.toResponse(guardado);
    }

    @GetMapping("/{id}")
    public MensajeResponse obtener(@PathVariable Long id) {
        return mapper.toResponse(mensajeService.obtenerPorId(id));
    }

    @GetMapping("/conversacion/{conversacionId}")
    public List<MensajeResponse> listarPorConversacion(@PathVariable Long conversacionId) {
        Conversacion conversacion = conversacionService.obtenerPorId(conversacionId);
        return mensajeService.listarPorConversacion(conversacion)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
