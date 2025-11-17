// =========================================
// src/main/java/com/startupcrm/domain/etiqueta/Etiqueta.java
// =========================================
package com.startupcrm.domain.etiqueta;

import jakarta.persistence.*;

@Entity
@Table(name = "etiqueta")
public class Etiqueta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;          // idEtiqueta

    private String nombre;    // Nombre visible

    private String color;     // Color UI

    private String aplicaA;   // 'cliente','conversacion','tarea'

    // getters/setters...
}
