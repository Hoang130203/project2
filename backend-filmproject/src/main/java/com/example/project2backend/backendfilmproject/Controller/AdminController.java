package com.example.project2backend.backendfilmproject.Controller;

import com.example.project2backend.backendfilmproject.Entity.Transaction;
import com.example.project2backend.backendfilmproject.Payload.Response.Dashboard;
import com.example.project2backend.backendfilmproject.Payload.Response.FilmInfoForAdmin;
import com.example.project2backend.backendfilmproject.Service.FilmService;
import com.example.project2backend.backendfilmproject.Service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private FilmService filmService;
    @Autowired
    private UserService userService ;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    @GetMapping("/film")
    public ResponseEntity<?> allFilm(){
        return ResponseEntity.ok(filmService.getAllFilm().stream().map(film -> modelMapper.map(film, FilmInfoForAdmin.class)));
    }

    @PutMapping("/episode/status")
    public ResponseEntity<?> putVipRequire(@RequestParam("id") Long id){
        return ResponseEntity.ok(filmService.changeVip(id));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(){
        long numberOfUsers= userService.numberOfUsers();
        Long totalMoney= userService.totalMoney();
        long numberOfFilms= filmService.numberOfFilms();
        long numberOfEpisodes = filmService.numberOfEpisodes();
        List<Transaction> transactionList= userService.findTop5Current();
        return ResponseEntity.ok(new Dashboard(numberOfUsers,totalMoney,numberOfFilms,numberOfEpisodes,transactionList));
    }
}
