// src/main/java/com/startupcrm/api/etiqueta/ClienteEtiquetasUpdateRequest.java
package com.startupcrm.api.etiqueta;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Payload para actualizar el conjunto de etiquetas de un cliente")
public record ClienteEtiquetasUpdateRequest(

        @ArraySchema(schema = @Schema(
                description = "Lista de IDs de etiquetas que deben quedar asociadas al cliente",
                example = "[1, 2, 5]"
        ))
        List<Long> etiquetaIds,

        @Schema(description = "ID del usuario que realiza la acción", example = "1")
        Long usuarioActorId
) {}
