package com.example.project2backend.backendfilmproject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "episode")
@Getter
@Setter
@NoArgsConstructor
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @JsonIgnore
    @Column(columnDefinition = "nvarchar(max)")
    private String description;

    private int serial;

    private Long views;

    @Column(columnDefinition = "varchar(max)")
    private String image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "film_id")
    private Film film;

    @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.EAGER,mappedBy = "episode")
    private List<Comment> comments;

    @Column(name = "vip_require")
    private boolean vipRequire;

    public Episode(String description, int serial, Long views, String image, Film film, boolean vipRequire) {
        this.description = description;
        this.serial = serial;
        this.views = views;
        this.image = image;
        this.film = film;
        this.vipRequire = vipRequire;
    }
}
