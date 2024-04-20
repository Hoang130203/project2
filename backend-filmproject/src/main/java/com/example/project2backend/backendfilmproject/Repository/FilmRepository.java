package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ECountry;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.EType;
import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Entity.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Year;
import java.util.List;

public interface FilmRepository extends JpaRepository<Film,Integer> {
//    @Query("select  f from "
    List<Film> findTop12ByOrderByViewsDesc();
    List<Film> findTop12ByOrderByIdDesc();
    Page<Film> findAllByTypesContains(Type Type,Pageable pageable);
    Page<Film> findAllByTypesContainsAndYear(Type Type, Pageable pageable, Year year);
    Page<Film> findAllByCountry(ECountry eCountry,Pageable pageable);
    Page<Film> findAllByYear(int year,Pageable pageable);
    Page<Film> findAllByIsMovie(boolean movie, Pageable pageable);
    List<Film> findTop10ByAndIsMovieOrderByViewsDescIdDesc(boolean movie);
    Page<Film> findAllByNameContainingIgnoreCase(String keyword,Pageable pageable);
    @Query("select f from Film f where f.year <= 2010")
    Page<Film> findAllByYear2(Pageable pageable);
}
