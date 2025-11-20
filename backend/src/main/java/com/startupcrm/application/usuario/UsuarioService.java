// src/main/java/com/startupcrm/application/usuario/UsuarioService.java
package com.startupcrm.application.usuario;

import com.startupcrm.api.usuario.UsuarioApiMapper;
import com.startupcrm.api.usuario.UsuarioCreateRequest;
import com.startupcrm.api.usuario.UsuarioResponse;
import com.startupcrm.api.usuario.UsuarioUpdateRequest;
import com.startupcrm.domain.usuario.Rol;
import com.startupcrm.domain.usuario.RolRepository;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.usuario.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioApiMapper usuarioApiMapper;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          RolRepository rolRepository,
                          PasswordEncoder passwordEncoder,
                          UsuarioApiMapper usuarioApiMapper) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuarioApiMapper = usuarioApiMapper;
    }

    // ===================== API/DTO =====================

    public UsuarioResponse registrar(UsuarioCreateRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Ya existe un usuario con email: " + request.email());
        }

        Rol rol = rolRepository.findById(request.rolId())
                .orElseThrow(() -> new NoSuchElementException("Rol no encontrado: " + request.rolId()));

        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre());
        usuario.setEmail(request.email());
        usuario.setPasswordHash(passwordEncoder.encode(request.password()));
        usuario.setTelefono(request.telefono());
        usuario.setRol(rol);
        usuario.setEstado("activo");
        usuario.setCreadoEn(OffsetDateTime.now());

        Usuario guardado = usuarioRepository.save(usuario);
        return usuarioApiMapper.toResponse(guardado);
    }

    public UsuarioResponse actualizar(Long id, UsuarioUpdateRequest request) {
        Usuario usuario = obtenerPorId(id);

        usuarioApiMapper.updateEntity(usuario, request);

        if (request.rolId() != null) {
            Rol rol = rolRepository.findById(request.rolId())
                    .orElseThrow(() -> new NoSuchElementException("Rol no encontrado: " + request.rolId()));
            usuario.setRol(rol);
        }

        Usuario actualizado = usuarioRepository.save(usuario);
        return usuarioApiMapper.toResponse(actualizado);
    }

    public UsuarioResponse obtenerResponsePorId(Long id) {
        return usuarioApiMapper.toResponse(obtenerPorId(id));
    }

    public List<UsuarioResponse> listarTodosResponse() {
        return usuarioRepository.findAll()
                .stream()
                .map(usuarioApiMapper::toResponse)
                .toList();
    }

    // ===================== Dominio (entidades) =====================

    public Usuario crear(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(Usuario usuario) {
        if (usuario.getId() == null) {
            throw new IllegalArgumentException("El id de usuario no puede ser nulo para actualizar.");
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado: " + id));
    }

    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado con email: " + email));
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
