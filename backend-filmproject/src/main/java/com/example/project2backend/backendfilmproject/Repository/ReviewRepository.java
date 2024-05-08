package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,String> {
    List<Review> findAllByFilm(Film film);
}
