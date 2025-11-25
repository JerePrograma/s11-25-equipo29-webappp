// =========================================
// src/main/java/com/startupcrm/domain/plantilla/PlantillaComunicacion.java
// =========================================
package com.startupcrm.domain.plantilla;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "plantilla_comunicacion")
public class PlantillaComunicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                 // idPlantilla

    private String canal;           // 'whatsapp' o 'email'

    private String nombre;          // Nombre interno

    private String asunto;          // Asunto (email)

    @Column(columnDefinition = "TEXT")
    private String cuerpo;          // Texto con placeholders

    @Column(name = "variables_json", columnDefinition = "TEXT")
    private String variablesJson;   // Variables soportadas (JSON)

    private OffsetDateTime creadoEn; // Creación

    // getters/setters...
}
