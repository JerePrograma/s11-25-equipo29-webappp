// src/main/java/com/startupcrm/application/plantilla/PlantillaComunicacionService.java
package com.startupcrm.application.plantilla;

import com.startupcrm.domain.plantilla.PlantillaComunicacion;
import com.startupcrm.domain.plantilla.PlantillaComunicacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PlantillaComunicacionService {

    private final PlantillaComunicacionRepository plantillaRepository;

    public PlantillaComunicacionService(PlantillaComunicacionRepository plantillaRepository) {
        this.plantillaRepository = plantillaRepository;
    }

    public PlantillaComunicacion crear(PlantillaComunicacion plantilla) {
        return plantillaRepository.save(plantilla);
    }

    public PlantillaComunicacion actualizar(PlantillaComunicacion plantilla) {
        if (plantilla.getId() == null) {
            throw new IllegalArgumentException("El id de plantilla no puede ser nulo para actualizar.");
        }
        return plantillaRepository.save(plantilla);
    }

    public PlantillaComunicacion obtenerPorId(Long id) {
        return plantillaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Plantilla no encontrada: " + id));
    }

    public List<PlantillaComunicacion> listarPorCanal(String canal) {
        return plantillaRepository.findByCanal(canal);
    }

    public void eliminar(Long id) {
        plantillaRepository.deleteById(id);
    }
}