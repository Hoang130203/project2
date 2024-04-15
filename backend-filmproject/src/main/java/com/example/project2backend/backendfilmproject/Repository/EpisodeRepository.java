package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode,Long> {
    void deleteAllByFilm(Film film);
    List<Episode> findTop12ByOrderByIdDesc();
}
