package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ECountry;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.EType;
import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Entity.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FilmRepository extends JpaRepository<Film,Integer> {
//    @Query("select  f from "
    List<Film> findTop12ByOrderByViewsDesc();
    List<Film> findAllByTypesContains(Type Type);
    List<Film> findAllByCountry(ECountry eCountry);
    List<Film> findAllByYear(int year);
    Page<Film> findAllByIsMovie(boolean movie, Pageable pageable);
    List<Film> findTop5ByAndIsMovieOrderByViewsDescIdDesc(boolean movie);
    @Query("select f from Film f where f.year <= 2010")
    List<Film> findAllByYear2();
}
