package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;

import java.util.List;

public interface FilmService {
    Film addFilm(Film film);
    Film getFilm(int filmId);
    List<Film> getTop12Views();
    Film delFilm(int filmId);
    Film updateFilm(Film film);
    Film advanceUpdate(Film film);
    List<Episode> addEpisode(List<Episode> episodes, int filmId);
    List<Episode> removeEpisode(List<Episode> episodes,int filmId);
    List<Character> addCharacters(List<Character> characters, int filmId);
    List<Character> removeCharacters(List<Character> characters, int filmId);

}
