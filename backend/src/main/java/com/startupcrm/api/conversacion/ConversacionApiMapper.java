// src/main/java/com/startupcrm/api/conversacion/ConversacionApiMapper.java
package com.startupcrm.api.conversacion;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.conversacion.CanalIntegracion;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ConversacionApiMapper {

    public ConversacionResponse toResponse(Conversacion c, List<String> etiquetas) {
        Cliente cliente = c.getCliente();
        Usuario asignadoA = c.getAsignadoA();
        CanalIntegracion canalIntegracion = c.getCanalIntegracion();

        return new ConversacionResponse(
                c.getId(),
                cliente != null ? cliente.getId() : null,
                cliente != null ? cliente.getNombre() : null,
                c.getCanal(),
                canalIntegracion != null ? canalIntegracion.getId() : null,
                canalIntegracion != null ? canalIntegracion.getNombre() : null,
                c.getAsunto(),
                c.getEstado(),
                asignadoA != null ? asignadoA.getId() : null,
                asignadoA != null ? asignadoA.getNombre() : null,
                c.getCanalConversationId(),
                c.getUltimoMensajeEn(),
                c.getCreadoEn(),
                etiquetas
        );
    }
}
