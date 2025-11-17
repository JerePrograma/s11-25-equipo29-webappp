// =========================================
// src/main/java/com/startupcrm/domain/usuario/Usuario.java
// =========================================
package com.startupcrm.domain.usuario;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "usuario")
public class Usuario {

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

    private String estado;               // 'activo' / 'inactivo'

    private OffsetDateTime creadoEn;     // Fecha/hora de creación

    private OffsetDateTime ultimoLoginEn; // Último acceso

    // getters/setters...
}
