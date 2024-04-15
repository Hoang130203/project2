package com.example.project2backend.backendfilmproject.Payload.Response;

import com.example.project2backend.backendfilmproject.Entity.Film;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EpisodeBasicInfo implements Serializable {
    private Long id;
    private int serial;
    private String image;
    private Film film;
    private boolean vipRequire;

}
