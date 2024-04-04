package com.example.project2backend.backendfilmproject.Entity;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ECountry;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "film")
@Getter
@Setter
@NoArgsConstructor
public class Film {
    @Id
    @Column(name = "film_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "film_name",columnDefinition = "nvarchar(1000)")
    private String name;

    @Column(name = "trailer_url",columnDefinition = "varchar(max)")
    private String trailer;

    @Column(name = "country")
    @Enumerated(EnumType.STRING)
    private ECountry country;

    @Column(name = "film_description",columnDefinition = "nvarchar(max)")
    private String description;

    @Column(name = "is_movie")
    private boolean isMovie;

    @Column(name = "image_url",columnDefinition = "varchar(max)")
    private String image;

    @Column(name = "background_image",columnDefinition = "varchar(max)")
    private String background;

    @Column(name = "film_author",columnDefinition = "nvarchar(500)")
    private String author;

    @Column(name = "year")
    private int year;

    @Column(name = "age_require")
    private int ageRequire;

//    @ManyToMany(fetch = FetchType.EAGER,mappedBy = "films")
//    private List<Type> types;
//    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "film_type",joinColumns = @JoinColumn(name = "film_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id"))
    private List<Type> types;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "film",fetch = FetchType.EAGER)
    private List<Character> characters;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "film")
    private List<Episode> episodes;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "film")
    private List<Review> reviews;

    @JsonIgnore
    private Long views;

    public Film(String name, String trailer, ECountry country, String description, boolean isMovie, String image, String background, String author, int year, int ageRequire) {
        this.name = name;
        this.trailer = trailer;
        this.country = country;
        this.description = description;
        this.isMovie = isMovie;
        this.image = image;
        this.background = background;
        this.author = author;
        this.year = year;
        this.ageRequire = ageRequire;
    }

    public Long getViews() {
        Long total = 0L;
        for (Episode episode:this.episodes
             ) {
            total+=episode.getViews();
        }
       return total;
    }
}
