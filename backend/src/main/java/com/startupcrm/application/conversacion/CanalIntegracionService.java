// src/main/java/com/startupcrm/application/conversacion/CanalIntegracionService.java
package com.startupcrm.application.conversacion;

import com.startupcrm.api.conversacion.CanalIntegracionApiMapper;
import com.startupcrm.api.conversacion.CanalIntegracionCreateRequest;
import com.startupcrm.api.conversacion.CanalIntegracionResponse;
import com.startupcrm.api.conversacion.CanalIntegracionUpdateRequest;
import com.startupcrm.domain.conversacion.CanalIntegracion;
import com.startupcrm.domain.conversacion.CanalIntegracionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CanalIntegracionService {

    private final CanalIntegracionRepository canalIntegracionRepository;
    private final CanalIntegracionApiMapper canalIntegracionApiMapper;

    public CanalIntegracionService(CanalIntegracionRepository canalIntegracionRepository,
                                   CanalIntegracionApiMapper canalIntegracionApiMapper) {
        this.canalIntegracionRepository = canalIntegracionRepository;
        this.canalIntegracionApiMapper = canalIntegracionApiMapper;
    }

    // ===================== API/DTO =====================

    public CanalIntegracionResponse crear(CanalIntegracionCreateRequest request) {
        CanalIntegracion c = new CanalIntegracion();
        c.setTipo(request.tipo());
        c.setNombre(request.nombre());
        c.setConfigJson(request.configJson());
        c.setActivo(request.activo());
        CanalIntegracion creado = canalIntegracionRepository.save(c);
        return canalIntegracionApiMapper.toResponse(creado);
    }

    public CanalIntegracionResponse actualizar(Long id, CanalIntegracionUpdateRequest request) {
        CanalIntegracion c = obtenerPorId(id);
        c.setNombre(request.nombre());
        c.setConfigJson(request.configJson());
        c.setActivo(request.activo());
        CanalIntegracion actualizado = canalIntegracionRepository.save(c);
        return canalIntegracionApiMapper.toResponse(actualizado);
    }

    public CanalIntegracionResponse obtenerResponsePorId(Long id) {
        return canalIntegracionApiMapper.toResponse(obtenerPorId(id));
    }

    public List<CanalIntegracionResponse> listarTodosResponse() {
        return canalIntegracionRepository.findAll()
                .stream()
                .map(canalIntegracionApiMapper::toResponse)
                .toList();
    }

    // ===================== Dominio (entidades) =====================

    public CanalIntegracion crear(CanalIntegracion canal) {
        return canalIntegracionRepository.save(canal);
    }

    public CanalIntegracion actualizar(CanalIntegracion canal) {
        if (canal.getId() == null) {
            throw new IllegalArgumentException("El id de canalIntegracion no puede ser nulo para actualizar.");
        }
        return canalIntegracionRepository.save(canal);
    }

    public CanalIntegracion obtenerPorId(Long id) {
        return canalIntegracionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("CanalIntegracion no encontrado: " + id));
    }

    public List<CanalIntegracion> listarActivos() {
        return canalIntegracionRepository.findByActivoTrue();
    }

    public List<CanalIntegracion> listarPorTipo(String tipo) {
        return canalIntegracionRepository.findByTipo(tipo);
    }

    public List<CanalIntegracion> listarTodos() {
        return canalIntegracionRepository.findAll();
    }

    public void eliminar(Long id) {
        canalIntegracionRepository.deleteById(id);
    }
}
