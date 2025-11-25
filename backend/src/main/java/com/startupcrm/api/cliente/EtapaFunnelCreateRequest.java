// src/main/java/com/startupcrm/api/cliente/EtapaFunnelDtos.java
package com.startupcrm.api.cliente;

public record EtapaFunnelCreateRequest(
        String nombre,
        Integer orden,
        boolean esDefault
) {}