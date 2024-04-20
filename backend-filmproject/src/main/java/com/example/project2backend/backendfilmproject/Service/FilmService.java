package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ECountry;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.EType;
import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Payload.Response.FilmBasicInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FilmService {
    Film addFilm(Film film);
    Film getFilm(int filmId);
    List<Film> getAllFilm();
    List<Film> getTop12Views();
    List<Film> getTop12New();
    Film delFilm(int filmId);
    Film updateFilm(Film film);
    Film advanceUpdate(Film film);
    List<Episode> addEpisode(List<Episode> episodes, int filmId);
    List<Episode> removeEpisode(List<Episode> episodes,int filmId);
    List<Character> addCharacters(List<Character> characters, int filmId);
    List<Character> removeCharacters(List<Character> characters, int filmId);
    List<Episode> getTopNewestEpisode();
    FilmBasicInfo convertToBasic(Film film);
    Episode getEpisodeById(Long id);
    Film update(Film film);
    Episode update(Episode episode);
    Page<Film> findAllByKeyword(String keyword,Pageable pageable);
    Page<Film> findAllByType(EType eType,Pageable pageable);
    Page<Film> findAllByCountry(ECountry eCountry,Pageable pageable);
    Page<Film> findAllByYear(int year,Pageable pageable);
    Page<Film> findAllByMovie(boolean movie, Pageable pageable);
    List<Film> findAllByMovieView(boolean movie);
    Film findByEpisode(Long episodeId);

}
