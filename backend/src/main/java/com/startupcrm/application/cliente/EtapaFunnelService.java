// src/main/java/com/startupcrm/application/cliente/EtapaFunnelService.java
package com.startupcrm.application.cliente;

import com.startupcrm.api.cliente.EtapaFunnelApiMapper;
import com.startupcrm.api.cliente.EtapaFunnelCreateRequest;
import com.startupcrm.api.cliente.EtapaFunnelResponse;
import com.startupcrm.api.cliente.EtapaFunnelUpdateRequest;
import com.startupcrm.domain.cliente.EtapaFunnel;
import com.startupcrm.domain.cliente.EtapaFunnelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EtapaFunnelService {

    private final EtapaFunnelRepository etapaFunnelRepository;
    private final EtapaFunnelApiMapper etapaFunnelApiMapper;

    public EtapaFunnelService(EtapaFunnelRepository etapaFunnelRepository,
                              EtapaFunnelApiMapper etapaFunnelApiMapper) {
        this.etapaFunnelRepository = etapaFunnelRepository;
        this.etapaFunnelApiMapper = etapaFunnelApiMapper;
    }

    // ===================== API/DTO =====================

    public EtapaFunnelResponse crear(EtapaFunnelCreateRequest request) {
        EtapaFunnel etapa = new EtapaFunnel();
        etapa.setNombre(request.nombre());
        etapa.setOrden(request.orden());
        etapa.setEsDefault(request.esDefault());
        EtapaFunnel creada = etapaFunnelRepository.save(etapa);
        return etapaFunnelApiMapper.toResponse(creada);
    }

    public EtapaFunnelResponse actualizar(Long id, EtapaFunnelUpdateRequest request) {
        EtapaFunnel etapa = obtenerPorId(id);
        etapa.setNombre(request.nombre());
        etapa.setOrden(request.orden());
        etapa.setEsDefault(request.esDefault());
        EtapaFunnel actualizada = etapaFunnelRepository.save(etapa);
        return etapaFunnelApiMapper.toResponse(actualizada);
    }

    public EtapaFunnelResponse obtenerResponsePorId(Long id) {
        return etapaFunnelApiMapper.toResponse(obtenerPorId(id));
    }

    public List<EtapaFunnelResponse> listarTodasResponse() {
        return etapaFunnelRepository.findAll()
                .stream()
                .map(etapaFunnelApiMapper::toResponse)
                .toList();
    }

    // ===================== Dominio (entidades) =====================

    public EtapaFunnel crear(EtapaFunnel etapa) {
        return etapaFunnelRepository.save(etapa);
    }

    public EtapaFunnel actualizar(EtapaFunnel etapa) {
        if (etapa.getId() == null) {
            throw new IllegalArgumentException("El id de etapa no puede ser nulo para actualizar.");
        }
        return etapaFunnelRepository.save(etapa);
    }

    public EtapaFunnel obtenerPorId(Long id) {
        return etapaFunnelRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Etapa funnel no encontrada: " + id));
    }

    public EtapaFunnel obtenerPorNombre(String nombre) {
        return etapaFunnelRepository.findByNombre(nombre)
                .orElseThrow(() -> new NoSuchElementException("Etapa funnel no encontrada: " + nombre));
    }

    public EtapaFunnel obtenerDefault() {
        return etapaFunnelRepository.findByEsDefaultTrue()
                .orElseThrow(() -> new NoSuchElementException("No hay etapa funnel marcada como default."));
    }

    public List<EtapaFunnel> listarTodas() {
        return etapaFunnelRepository.findAll();
    }

    public void eliminar(Long id) {
        etapaFunnelRepository.deleteById(id);
    }
}
