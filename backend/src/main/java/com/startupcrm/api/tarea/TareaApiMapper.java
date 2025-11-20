// src/main/java/com/startupcrm/api/tarea/TareaApiMapper.java
package com.startupcrm.api.tarea;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.tarea.Tarea;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.stereotype.Component;

@Component
public class TareaApiMapper {

    public TareaResponse toResponse(Tarea t) {
        Cliente cliente = t.getCliente();
        Usuario asignado = t.getAsignadoA();

        return new TareaResponse(
                t.getId(),
                t.getTitulo(),
                t.getDescripcion(),
                cliente != null ? cliente.getId() : null,
                cliente != null ? cliente.getNombre() : null,
                t.getConversacion() != null ? t.getConversacion().getId() : null,
                asignado != null ? asignado.getId() : null,
                asignado != null ? asignado.getNombre() : null,
                t.getEstado(),
                t.getPrioridad(),
                t.getFechaLimite(),
                t.getRecordatorioEn(),
                t.getCreadoEn(),
                t.getCompletadaEn()
        );
    }
}
