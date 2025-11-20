// src/main/java/com/startupcrm/application/vista/VistaGuardadaService.java
package com.startupcrm.application.vista;

import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.vista.VistaGuardada;
import com.startupcrm.domain.vista.VistaGuardadaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class VistaGuardadaService {

    private final VistaGuardadaRepository vistaGuardadaRepository;

    public VistaGuardadaService(VistaGuardadaRepository vistaGuardadaRepository) {
        this.vistaGuardadaRepository = vistaGuardadaRepository;
    }

    public VistaGuardada crear(VistaGuardada vista) {
        return vistaGuardadaRepository.save(vista);
    }

    public VistaGuardada actualizar(VistaGuardada vista) {
        if (vista.getId() == null) {
            throw new IllegalArgumentException("El id de vistaGuardada no puede ser nulo para actualizar.");
        }
        return vistaGuardadaRepository.save(vista);
    }

    public VistaGuardada obtenerPorId(Long id) {
        return vistaGuardadaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("VistaGuardada no encontrada: " + id));
    }

    public List<VistaGuardada> listarPorUsuario(Usuario usuario) {
        return vistaGuardadaRepository.findByUsuario(usuario);
    }

    public List<VistaGuardada> listarPublicas() {
        return vistaGuardadaRepository.findByEsPublicaTrue();
    }

    public void eliminar(Long id) {
        vistaGuardadaRepository.deleteById(id);
    }
}