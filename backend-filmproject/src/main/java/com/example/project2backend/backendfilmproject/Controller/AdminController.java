package com.example.project2backend.backendfilmproject.Controller;

import com.example.project2backend.backendfilmproject.Payload.Response.FilmInfoForAdmin;
import com.example.project2backend.backendfilmproject.Service.FilmService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private FilmService filmService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/film")
    public ResponseEntity<?> allFilm(){
        return ResponseEntity.ok(filmService.getAllFilm().stream().map(film -> modelMapper.map(film, FilmInfoForAdmin.class)));
    }
}
