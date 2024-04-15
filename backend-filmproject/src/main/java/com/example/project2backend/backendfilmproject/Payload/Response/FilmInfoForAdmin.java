package com.example.project2backend.backendfilmproject.Payload.Response;

import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class FilmInfoForAdmin implements Serializable {
    private int id;
    private String name;
    @JsonIgnore
    private String image;
    @JsonIgnore
    private List<Type> types;
    @JsonIgnore
    private List<Episode> episodes;
    @JsonIgnore
    private Long views;

    private Long watch;
    private String type;
    private String avatar;
    private int episode;
//    private boolean status;

    public Long getWatch() {
        if(views==null){
            return 0L;
        }
        return this.views;
    }

    public String getType() {
        String typee="";
        for (Type type:this.types
             ) {
            typee+=type.getName()+" ";
        }
        return typee;
    }

    public String getAvatar() {
        return image;
    }

    public int getEpisode() {
        if(episodes.isEmpty()){
            return 0;
        }
        return this.episodes.size();
    }
}
