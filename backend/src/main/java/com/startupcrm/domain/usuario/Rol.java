// =========================================
// src/main/java/com/startupcrm/domain/usuario/Rol.java
// =========================================
package com.startupcrm.domain.usuario;

import jakarta.persistence.*;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                 // idRol

    private String nombre;           // Nombre del rol (admin, ventas, etc.)

    private String descripcion;      // Descripción legible del rol

    @Column(name = "permisos_json")
    private String permisosJson;     // JSON con permisos granulados (opcional)

    // getters/setters...
}
