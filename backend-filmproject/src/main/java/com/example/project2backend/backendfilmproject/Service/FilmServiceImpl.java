package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Repository.EpisodeRepository;
import com.example.project2backend.backendfilmproject.Repository.FilmRepository;
import com.example.project2backend.backendfilmproject.Repository.TypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FilmServiceImpl implements FilmService{
    private final FilmRepository filmRepository;
    private final EpisodeRepository episodeRepository;
    private final TypeRepository typeRepository;
    public FilmServiceImpl(FilmRepository filmRepository, EpisodeRepository episodeRepository, TypeRepository typeRepository) {
        this.filmRepository = filmRepository;
        this.episodeRepository = episodeRepository;
        this.typeRepository = typeRepository;
    }

    @Override
    public Film addFilm(Film film) {
        Film film1= new Film(film.getName(),film.getTrailer(),film.getCountry(),film.getDescription(),film.isMovie(),film.getImage(),film.getBackground(),film.getAuthor(),film.getYear(),film.getAgeRequire());

        return null;
    }
}
