// src/main/java/com/startupcrm/api/etiqueta/EtiquetaDtos.java
package com.startupcrm.api.etiqueta;

public record EtiquetaCreateRequest(
        String nombre,
        String color,
        String aplicaA      // 'cliente','conversacion','tarea'
) {}