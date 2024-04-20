package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.FavoriteKey;
import com.example.project2backend.backendfilmproject.Entity.Favorite;
import com.example.project2backend.backendfilmproject.Entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteKey> {
    @Modifying
    @Transactional
    void deleteAllByFilm(Film film);
    List<Favorite> findAllByFilm(Film film);
}
