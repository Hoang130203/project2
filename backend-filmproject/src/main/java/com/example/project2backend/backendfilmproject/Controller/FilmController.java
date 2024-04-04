package com.example.project2backend.backendfilmproject.Controller;

import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Service.FilmService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/film")
public class FilmController {
    private final FilmService filmService;

    @Autowired
    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }
    @PostMapping("/film")
    public ResponseEntity<?> upFilm(@RequestBody Film film)
    {
        Film film1= filmService.addFilm(film);
        return ResponseEntity.ok(film1);
    }
//    @PostMapping("/info")
//    public ResponseEntity<?> getFilm(@RequestBody Film film)
//    {
//        return ResponseEntity.ok("ok");
//    }

    @GetMapping("/info")
    public ResponseEntity<?> getFilmDetails(@RequestParam("filmId") int filmId)
    {
//        System.out.println(filmId);
        return ResponseEntity.ok(filmService.getFilm(filmId));
    }
    @DeleteMapping("")
    public ResponseEntity<?> deleteById(@RequestParam("filmId") int filmId)
    {
        return ResponseEntity.ok(filmService.delFilm(filmId));
    }

    @PutMapping("/basicinfo")
    public ResponseEntity<?> updateByID(@RequestBody Film film){
        return ResponseEntity.ok(filmService.updateFilm(film));
    }

    @PutMapping("/advanceinfo/addepisode")
    public ResponseEntity<?> addEpisode(@RequestBody List<Episode> episodes, @RequestParam("filmId") int filmId)
    {
        return ResponseEntity.ok(filmService.addEpisode(episodes,filmId));
    }
    @PutMapping("/advanceinfo/removeepisode")
    public ResponseEntity<?> removeEpisode(@RequestBody List<Episode> episodes,@RequestParam("filmId") int filmId)
    {
        return ResponseEntity.ok(filmService.removeEpisode(episodes,filmId));
    }
    @PutMapping("/advanceinfo/addcharacter")
    public ResponseEntity<?> addChar(@RequestBody List<Character> characters, @RequestParam("filmId") int filmId)
    {
        return ResponseEntity.ok(filmService.addCharacters(characters,filmId));
    }
    @PutMapping("/advanceinfo/removecharacter")
    public ResponseEntity<?> removeChar(@RequestBody List<Character> characters, @RequestParam("filmId") int filmId)
    {
        return ResponseEntity.ok(filmService.removeCharacters(characters,filmId));
    }
}
