package com.example.project2backend.backendfilmproject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "character")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "nvarchar(500)")
    private String name;

    @Column(columnDefinition = "nvarchar(200)")
    private String role;

    @Column(columnDefinition = "varchar(max)")
    private String image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "film_id")
    private Film film;

    public Character(String name, String role, String image, Film film) {
        this.name = name;
        this.role = role;
        this.image = image;
        this.film = film;
    }
}
