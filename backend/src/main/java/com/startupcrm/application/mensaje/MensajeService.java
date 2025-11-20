// src/main/java/com/startupcrm/application/mensaje/MensajeService.java
package com.startupcrm.application.mensaje;

import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.mensaje.Mensaje;
import com.startupcrm.domain.mensaje.MensajeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MensajeService {

    private final MensajeRepository mensajeRepository;

    public MensajeService(MensajeRepository mensajeRepository) {
        this.mensajeRepository = mensajeRepository;
    }

    public Mensaje guardar(Mensaje mensaje) {
        // Podrías meter lógica de idempotencia acá si querés.
        return mensajeRepository.save(mensaje);
    }

    public Mensaje obtenerPorId(Long id) {
        return mensajeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Mensaje no encontrado: " + id));
    }

    public List<Mensaje> listarPorConversacion(Conversacion conversacion) {
        return mensajeRepository.findByConversacionOrderByFechaEnvioAsc(conversacion);
    }

    public Mensaje obtenerPorCanalMessageId(String canalMessageId) {
        return mensajeRepository.findByCanalMessageId(canalMessageId)
                .orElseThrow(() -> new NoSuchElementException("Mensaje no encontrado para canalMessageId: " + canalMessageId));
    }

    public Mensaje obtenerPorIdempotencyKey(String idempotencyKey) {
        return mensajeRepository.findByIdempotencyKey(idempotencyKey)
                .orElseThrow(() -> new NoSuchElementException("Mensaje no encontrado para idempotencyKey: " + idempotencyKey));
    }

    public void eliminar(Long id) {
        mensajeRepository.deleteById(id);
    }
}