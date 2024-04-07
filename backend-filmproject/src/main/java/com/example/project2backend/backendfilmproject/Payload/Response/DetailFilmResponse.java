package com.example.project2backend.backendfilmproject.Payload.Response;

import com.example.project2backend.backendfilmproject.Entity.*;
import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ECountry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailFilmResponse {
    private int id;
    private String name;
    private ECountry country;
    private String description;
    private String trailer;
    private boolean isMovie;
    private String image;
    private String background;
    private String author;
    private int ageRequire;
    private List<Type> types;
    private int year;
    private List<Character> characters;
    private List<Episode> episodes;
    private List<Review> reviews;
    private Long views;

}
