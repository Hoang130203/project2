package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.SavedKey;
import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Entity.Saved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SavedRepository extends JpaRepository<Saved,SavedKey> {
    @Modifying
    @Transactional
    @Query("delete from Saved e where e.episode.film=:film")
    void deleteAllByFilm(Film film);

}
