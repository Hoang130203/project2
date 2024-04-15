package com.example.project2backend.backendfilmproject.Payload.Response;

import lombok.Data;

import java.io.Serializable;

@Data
public class FilmBasicInfo implements Serializable {
    private int id;
    private String name;
    private boolean isMovie;
    private String image;
    private int ageRequire;
//    private boolean status;

}
