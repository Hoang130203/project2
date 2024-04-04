package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character,Long> {
    void deleteAllByFilm(Film film);
}
