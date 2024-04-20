package com.example.project2backend.backendfilmproject.Payload.Response;

import lombok.Data;

import java.io.Serializable;
@Data
public class FilmMediumInfo  implements Serializable{
    private int id;
    private String name;
    private boolean isMovie;
    private String image;
    private int ageRequire;
    private String background;
    private Long views;

}
