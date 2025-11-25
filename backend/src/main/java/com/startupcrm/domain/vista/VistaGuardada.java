// =========================================
// src/main/java/com/startupcrm/domain/vista/VistaGuardada.java
// =========================================
package com.startupcrm.domain.vista;

import com.startupcrm.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vista_guardada")
public class VistaGuardada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                   // idVistaGuardada

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;           // Dueño de la vista

    private String entidad;            // 'cliente','conversacion','tarea'

    private String nombre;             // Nombre de la vista

    @Column(name = "filtros_json", columnDefinition = "TEXT")
    private String filtrosJson;        // Filtros (JSON)

    @Column(name = "columnas_json", columnDefinition = "TEXT")
    private String columnasJson;       // Config columnas (JSON)

    private boolean esPublica;         // Compartida

    private OffsetDateTime creadoEn;   // Creación

    // getters/setters...
}
