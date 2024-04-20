package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode,Long> {
    void deleteAllByFilm(Film film);
    @Query("SELECT e FROM Episode e WHERE e.id IN (" +
            "SELECT MAX(e2.id) FROM Episode e2 GROUP BY e2.film) " +
            "ORDER BY e.id DESC")
    List<Episode> findTop12ByOrderByIdDesc();


}
