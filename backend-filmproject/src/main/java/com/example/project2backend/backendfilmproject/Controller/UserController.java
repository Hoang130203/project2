package com.example.project2backend.backendfilmproject.Controller;

import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Payload.Request.UserUpdateReq;
import com.example.project2backend.backendfilmproject.Payload.Response.Message;
import com.example.project2backend.backendfilmproject.Payload.Response.UserBaseInfo;
import com.example.project2backend.backendfilmproject.Payload.Response.UserInfoForAdmin;
import com.example.project2backend.backendfilmproject.Service.FilmService;
import com.example.project2backend.backendfilmproject.Service.RoleService;
import com.example.project2backend.backendfilmproject.Service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private ModelMapper modelMapper;
    private final UserService userService;
    private final RoleService roleService;
    private final FilmService filmService;
    public UserController(UserService userService, RoleService roleService, FilmService filmService) {
        this.userService = userService;
        this.roleService = roleService;
        this.filmService = filmService;
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateInfo(@RequestBody UserUpdateReq userUpdateReq){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user= userService.update(userUpdateReq,getUserId(userDetails));
        if(user!=null){
            return ResponseEntity.ok(modelMapper.map(user, UserBaseInfo.class));
        }
        return ResponseEntity.badRequest().body(new Message("error"));
    }
    @PutMapping("/avatar")
    public ResponseEntity<?> updateAvt(@RequestParam("avatar") String avatar){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.updateAvt(avatar,getUserId(userDetails));
        if(user!=null){
            return ResponseEntity.ok(modelMapper.map(user, UserBaseInfo.class));
        }
        return ResponseEntity.badRequest().body(new Message("error"));
    }
    @PostMapping("/favorite")
    public ResponseEntity<?> postFavorite(@RequestParam("filmId") int filmId)
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()->new RuntimeException("User not found"));
        Film film= filmService.getFilm(filmId);
        List<Film> favorites= user.getFavorites();
        if(!favorites.isEmpty() && favorites.size()>=1){
            for (Film film1:favorites
            ) {
                if(film1.getId()==filmId){
                    return ResponseEntity.ok(favorites);
                }
            }
        }

        favorites.add(film);
        user.setFavorites(favorites);
        userService.save(user);
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/favorite")
    public ResponseEntity<?> deleteFavorite(@RequestParam("filmId") int filmId){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()->new RuntimeException("User not found"));
        Film film= filmService.getFilm(filmId);
        List<Film> favorites= user.getFavorites();
        int index=0;
        boolean hasfilm=false;
        if(!favorites.isEmpty() && favorites.size()>=1){
            for (Film film1:favorites
            ) {
                if(film1.getId()==filmId){
                    hasfilm=true;
                    break;
                }
                index++;
            }
        }
        if(hasfilm){
            favorites.remove(index);
        }
        user.setFavorites(favorites);
        userService.save(user);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/saved")
    public ResponseEntity<?> postSaved(@RequestParam("episodeId") Long episodeId)
    {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()->new RuntimeException("User not found"));
        Episode episode= filmService.getEpisodeById(episodeId);
        List<Episode> saveds= user.getSaveds();
        if(!saveds.isEmpty() && saveds.size()>=1){
            for (Episode episode1:saveds
            ) {
                if(episode1.getId()==episodeId){
                    return ResponseEntity.ok(saveds);
                }
            }
        }

        saveds.add(episode);
        user.setSaveds(saveds);
        userService.save(user);
        return ResponseEntity.ok(saveds);
    }

    @DeleteMapping("/saved")
    public ResponseEntity<?> deleteSaved(@RequestParam("episodeId") Long episodeId){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.getById(getUserId(userDetails))
                .orElseThrow(()->new RuntimeException("User not found"));
        Episode episode= filmService.getEpisodeById(episodeId);
        List<Episode> saveds= user.getSaveds();
        int index=0;
        boolean hasfilm=false;
        if(!saveds.isEmpty() && saveds.size()>=1){
            for (Episode episode1:saveds
            ) {
                if(episode1.getId()==episodeId){
                    hasfilm=true;
                    break;
                }
                index++;
            }
        }
        if(hasfilm){
            saveds.remove(index);
        }
        user.setSaveds(saveds);
        userService.save(user);
        return ResponseEntity.ok(saveds);
    }

    @GetMapping("/allusers")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.getAll().stream().map(user -> modelMapper.map(user, UserInfoForAdmin.class)));
    }

    @GetMapping("/details")
    public ResponseEntity<Object> getUserDetails(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return new ResponseEntity<>(new Message("No info"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(roleService.getByUser(user.get()), HttpStatus.OK) ;
    }

    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
}
