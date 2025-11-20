// src/main/java/com/startupcrm/domain/usuario/Usuario.java
package com.startupcrm.domain.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                     // idUsuario

    private String nombre;               // Nombre visible

    @Column(unique = true, nullable = false)
    private String email;                // Email de login

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;         // Hash de contraseña

    private String telefono;             // Teléfono del usuario

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rol_id")
    private Rol rol;                     // Rol asignado

    private String estado;               // 'activo' / 'inactivo' / 'bloqueado' (opcional)

    private OffsetDateTime creadoEn;      // Fecha/hora de creación

    private OffsetDateTime ultimoLoginEn; // Último acceso

    // ====== Métodos de UserDetails ======

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (rol == null || rol.getNombre() == null) {
            return List.of();
        }
        String roleName = rol.getNombre();
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName.toUpperCase();
        }
        return List.of(new SimpleGrantedAuthority(roleName));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        // Usamos el email como "username" para login
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Podés sofisticar más adelante
    }

    @Override
    public boolean isAccountNonLocked() {
        return !"bloqueado".equalsIgnoreCase(estado);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Podés agregar lógica de expiración de password si querés
    }

    @Override
    public boolean isEnabled() {
        return !"inactivo".equalsIgnoreCase(estado);
    }
}
