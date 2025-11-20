// ------------------------------------------
// src/main/java/com/startupcrm/domain/mensaje/MensajeRepository.java
// ------------------------------------------
package com.startupcrm.domain.mensaje;

import com.startupcrm.domain.conversacion.Conversacion;

import java.util.List;
import java.util.Optional;

public interface MensajeRepository {

    Mensaje save(Mensaje mensaje);

    Optional<Mensaje> findById(Long id);

    List<Mensaje> findByConversacionOrderByFechaEnvioAsc(Conversacion conversacion);

    Optional<Mensaje> findByCanalMessageId(String canalMessageId);

    Optional<Mensaje> findByIdempotencyKey(String idempotencyKey);

    void deleteById(Long id);
}