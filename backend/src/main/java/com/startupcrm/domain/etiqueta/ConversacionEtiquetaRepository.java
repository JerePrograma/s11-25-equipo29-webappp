// ------------------------------------------
// src/main/java/com/startupcrm/domain/etiqueta/ConversacionEtiquetaRepository.java
// ------------------------------------------
package com.startupcrm.domain.etiqueta;

import com.startupcrm.domain.conversacion.Conversacion;

import java.util.List;

public interface ConversacionEtiquetaRepository {

    ConversacionEtiqueta save(ConversacionEtiqueta conversacionEtiqueta);

    List<ConversacionEtiqueta> findByConversacion(Conversacion conversacion);

    void delete(ConversacionEtiqueta conversacionEtiqueta);

    void deleteByConversacion(Conversacion conversacion);
}