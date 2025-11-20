// src/main/java/com/startupcrm/application/etiqueta/ConversacionEtiquetaService.java
package com.startupcrm.application.etiqueta;

import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.etiqueta.ConversacionEtiqueta;
import com.startupcrm.domain.etiqueta.ConversacionEtiquetaRepository;
import com.startupcrm.domain.etiqueta.Etiqueta;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversacionEtiquetaService {

    private final ConversacionEtiquetaRepository conversacionEtiquetaRepository;

    public ConversacionEtiquetaService(ConversacionEtiquetaRepository conversacionEtiquetaRepository) {
        this.conversacionEtiquetaRepository = conversacionEtiquetaRepository;
    }

    public ConversacionEtiqueta asignarEtiquetaAConversacion(Conversacion conversacion, Etiqueta etiqueta) {
        ConversacionEtiqueta ce = new ConversacionEtiqueta();
        ce.setConversacion(conversacion);
        ce.setEtiqueta(etiqueta);
        return conversacionEtiquetaRepository.save(ce);
    }

    public List<ConversacionEtiqueta> listarPorConversacion(Conversacion conversacion) {
        return conversacionEtiquetaRepository.findByConversacion(conversacion);
    }

    public void eliminar(ConversacionEtiqueta ce) {
        conversacionEtiquetaRepository.delete(ce);
    }

    public void eliminarPorConversacion(Conversacion conversacion) {
        conversacionEtiquetaRepository.deleteByConversacion(conversacion);
    }
}