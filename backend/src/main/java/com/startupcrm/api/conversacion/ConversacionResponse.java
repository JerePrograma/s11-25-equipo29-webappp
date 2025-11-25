package com.startupcrm.api.conversacion;

import java.time.OffsetDateTime;
import java.util.List;

public record ConversacionResponse(
        Long   id,
        Long   clienteId,
        String clienteNombre,
        String canal,
        Long   canalIntegracionId,
        String canalIntegracionNombre,
        String asunto,
        String estado,
        Long   asignadoAId,
        String asignadoANombre,
        String canalConversationId,
        OffsetDateTime ultimoMensajeEn,
        OffsetDateTime creadoEn,
        List<String> etiquetas        // etiquetas aplicadas a la conversación
) {}