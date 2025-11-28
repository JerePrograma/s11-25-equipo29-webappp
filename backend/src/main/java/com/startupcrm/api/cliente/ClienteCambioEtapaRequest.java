// src/main/java/com/startupcrm/api/cliente/ClienteCambioEtapaRequest.java
package com.startupcrm.api.cliente;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Payload para cambiar la etapa del funnel de un cliente")
public record ClienteCambioEtapaRequest(

        @Schema(description = "ID de la nueva etapa del funnel", example = "3")
        Long etapaFunnelId,

        @Schema(description = "ID del usuario que realiza el cambio", example = "1")
        Long usuarioActorId
) {}
