// src/main/java/com/startupcrm/application/etiqueta/EtiquetaService.java
package com.startupcrm.application.etiqueta;

import com.startupcrm.domain.etiqueta.Etiqueta;
import com.startupcrm.domain.etiqueta.EtiquetaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EtiquetaService {

    private final EtiquetaRepository etiquetaRepository;

    public EtiquetaService(EtiquetaRepository etiquetaRepository) {
        this.etiquetaRepository = etiquetaRepository;
    }

    public Etiqueta crear(Etiqueta etiqueta) {
        return etiquetaRepository.save(etiqueta);
    }

    public Etiqueta actualizar(Etiqueta etiqueta) {
        if (etiqueta.getId() == null) {
            throw new IllegalArgumentException("El id de etiqueta no puede ser nulo para actualizar.");
        }
        return etiquetaRepository.save(etiqueta);
    }

    public Etiqueta obtenerPorId(Long id) {
        return etiquetaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Etiqueta no encontrada: " + id));
    }

    public Etiqueta obtenerPorNombreYAplicaA(String nombre, String aplicaA) {
        return etiquetaRepository.findByNombreAndAplicaA(nombre, aplicaA)
                .orElseThrow(() -> new NoSuchElementException("Etiqueta no encontrada: " + nombre + " (" + aplicaA + ")"));
    }

    public List<Etiqueta> listarPorAplicaA(String aplicaA) {
        return etiquetaRepository.findByAplicaA(aplicaA);
    }

    public void eliminar(Long id) {
        etiquetaRepository.deleteById(id);
    }
}