// src/main/java/com/startupcrm/application/usuario/RolService.java
package com.startupcrm.application.usuario;

import com.startupcrm.api.usuario.RolApiMapper;
import com.startupcrm.api.usuario.RolCreateRequest;
import com.startupcrm.api.usuario.RolResponse;
import com.startupcrm.api.usuario.RolUpdateRequest;
import com.startupcrm.domain.usuario.Rol;
import com.startupcrm.domain.usuario.RolRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RolService {

    private final RolRepository rolRepository;
    private final RolApiMapper rolApiMapper;

    public RolService(RolRepository rolRepository, RolApiMapper rolApiMapper) {
        this.rolRepository = rolRepository;
        this.rolApiMapper = rolApiMapper;
    }

    // ===================== API/DTO =====================

    public RolResponse crear(RolCreateRequest request) {
        Rol rol = new Rol();
        rol.setNombre(request.nombre());
        rol.setDescripcion(request.descripcion());
        rol.setPermisosJson(request.permisosJson());

        Rol creado = rolRepository.save(rol);
        return rolApiMapper.toResponse(creado);
    }

    public RolResponse actualizar(Long id, RolUpdateRequest request) {
        Rol rol = obtenerPorId(id);
        rolApiMapper.updateEntity(rol, request);
        Rol actualizado = rolRepository.save(rol);
        return rolApiMapper.toResponse(actualizado);
    }

    public RolResponse obtenerResponsePorId(Long id) {
        return rolApiMapper.toResponse(obtenerPorId(id));
    }

    public List<RolResponse> listarTodosResponse() {
        return rolRepository.findAll()
                .stream()
                .map(rolApiMapper::toResponse)
                .toList();
    }

    // ===================== Dominio (entidades) =====================

    public Rol crear(Rol rol) {
        return rolRepository.save(rol);
    }

    public Rol actualizar(Rol rol) {
        if (rol.getId() == null) {
            throw new IllegalArgumentException("El id de rol no puede ser nulo para actualizar.");
        }
        return rolRepository.save(rol);
    }

    public Rol obtenerPorId(Long id) {
        return rolRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Rol no encontrado: " + id));
    }

    public Rol obtenerPorNombre(String nombre) {
        return rolRepository.findByNombre(nombre)
                .orElseThrow(() -> new NoSuchElementException("Rol no encontrado: " + nombre));
    }

    public List<Rol> listarTodos() {
        return rolRepository.findAll();
    }

    /**
     * CUS-04: Gestión de Roles y Permisos
     * Permite actualizar permisos de un rol a partir de un JSON de permisos.
     * Ejemplo de permisosJson:
     * {
     *   "contactos": ["ver", "crear", "editar"],
     *   "conversaciones": ["ver", "responder"],
     *   "tareas": ["ver", "crear"],
     *   "metricas": ["ver"],
     *   "configuracion": ["ver", "editar"]
     * }
     */
    @Transactional
    public Rol actualizarPermisosRol(Long rolId, String permisosJson) {
        Rol rol = obtenerPorId(rolId);
        rol.setPermisosJson(permisosJson);
        return rolRepository.save(rol);
    }

    // Si querés un comando explícito:
    public record ActualizarPermisosCommand(Long rolId, String permisosJson) {}

    @Transactional
    public Rol actualizarPermisosRol(ActualizarPermisosCommand cmd) {
        return actualizarPermisosRol(cmd.rolId(), cmd.permisosJson());
    }
}
