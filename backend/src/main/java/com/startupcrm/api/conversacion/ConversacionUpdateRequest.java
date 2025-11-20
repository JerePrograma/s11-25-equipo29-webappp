package com.startupcrm.api.conversacion;

public record ConversacionUpdateRequest(
        String estado,              // 'abierta','cerrada','pendiente'
        Long   asignadoAId
) {}