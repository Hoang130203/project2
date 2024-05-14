package com.example.project2backend.backendfilmproject.Controller;

import com.example.project2backend.backendfilmproject.Entity.*;
import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ECountry;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ERole;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.EType;
import com.example.project2backend.backendfilmproject.Payload.Response.*;
import com.example.project2backend.backendfilmproject.Repository.EpisodeRepository;
import com.example.project2backend.backendfilmproject.Service.FilmService;
import com.example.project2backend.backendfilmproject.Service.UserService;
//import edu.emory.mathcs.backport.java.util.concurrent.TimeUnit;
//import java.util.concurrent.TimeUnit;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/film")
public class FilmController {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    private final FilmService filmService;
    @Autowired
    private EpisodeRepository episodeRepository;
    @Autowired
    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }
    @PostMapping("/film")
    public ResponseEntity<?> upFilm(@RequestBody DetailFilmResponse detailFilmResponse)
    {
        Film film= modelMapper.map(detailFilmResponse,Film.class);
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
//        DetailFilmResponse film = filmService.getDetail(filmId);
//        String version = Integer.toString(filmId); // Tính toán ETag dựa trên phiên bản của tài nguyên
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setCacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).getHeaderValue());
//        headers.setETag("W/"+version+ "\"");
//
//        return ResponseEntity.ok().headers(headers).body(film);
        try {
            return ResponseEntity.ok(modelMapper.map(filmService.getFilm(filmId),DetailFilmResponse.class));

        }catch (Exception exception)
        {
            System.out.println(exception.getMessage());
            return ResponseEntity.ok(null);
        }
    }
    @GetMapping("/film")
    public ResponseEntity<?> getAllByTyp(@RequestParam("type")EType type,Pageable pageable){
        return ResponseEntity.ok(filmService.findAllByType(type,pageable));
    }
    @GetMapping("/country")
    public ResponseEntity<?> getAllByCountry(@RequestParam("country") ECountry eCountry,Pageable pageable){
        return ResponseEntity.ok(filmService.findAllByCountry(eCountry,pageable));
    }
    @GetMapping("/year")
    public ResponseEntity<?> getAllByYear(@RequestParam("year") int year,Pageable pageable)
    {
        return ResponseEntity.ok(filmService.findAllByYear(year,pageable));
    }
    @GetMapping("/movies")
    public ResponseEntity<?> getAllByMovie(Pageable pageable)
    {
        return ResponseEntity.ok(filmService.findAllByMovie(true,pageable));
    }
    @GetMapping("/keyword")
    public ResponseEntity<?> getAllByKey(String key,Pageable pageable){
        return ResponseEntity.ok(filmService.findAllByKeyword(key, pageable));
    }
//    @GetMapping("/movies")
//    public ResponseEntity<?> getAllByMovie(Pageable pageable) {
//        Page<Film> moviesPage = filmService.findAllByMovie(true, pageable);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("movies", moviesPage.getContent());
//        response.put("totalPages", moviesPage.getTotalPages()); // Thêm thông tin về tổng số trang
//
//        return ResponseEntity.ok(response);
//    }
    @GetMapping("/moviesTop")
    public ResponseEntity<?> getAllByMovieTopView()
    {
        return ResponseEntity.ok(filmService.findAllByMovieView(true).stream().map(film -> modelMapper.map(film,FilmMediumInfo.class)));
    }
    @GetMapping("/series")
    public ResponseEntity<?> getAllBySeries(Pageable pageable)
    {
        return ResponseEntity.ok(filmService.findAllByMovie(false,pageable));
    }
    @GetMapping("/seriesTop")
    public ResponseEntity<?> getAllBySerieTopView()
    {
        return ResponseEntity.ok(filmService.findAllByMovieView(false).stream().map(film -> modelMapper.map(film, FilmMediumInfo.class)));
    }
    @GetMapping("/top12views")
    public ResponseEntity<?> getTop12Views(){
        return ResponseEntity.ok(filmService.getTop12Views().stream().map(film -> modelMapper.map(film, FilmBasicInfo.class)));
    }
    @GetMapping("/top12FilmNew")
    public ResponseEntity<?> getTop12NewFilm(){
        return ResponseEntity.ok(filmService.getTop12New().stream().map(film -> modelMapper.map(film, FilmBasicInfo.class)));
    }
    @GetMapping("/top12Newests")
    public ResponseEntity<?> getTop12New(){
        return ResponseEntity.ok(filmService.getTopNewestEpisode().stream().map(episode -> modelMapper.map(episode, EpisodeBasicInfo.class)));
    }
    @GetMapping("/filmByEpisode")
    public ResponseEntity<?> getFilmByEpisode(@RequestParam Long id)
    {
        return ResponseEntity.ok(modelMapper.map(filmService.findByEpisode(id),DetailFilmResponse.class));
    }
    @GetMapping("/episode")
    public ResponseEntity<?> getEpisode(@RequestParam("episodeId") Long id){
        Episode episode= filmService.getEpisodeById(id);
        if(episode.isVipRequire()){
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user  = userService.getById(getUserId(userDetails))
                    .orElseThrow(()->new RuntimeException("User not found"));
            boolean isVip= false;
            for (Role role:user.getRoles()
                 ) {
                if(role.getName().equals(ERole.ROLE_VIP)){
                    isVip=true;
                }
            }
            if(!isVip){
                return ResponseEntity.badRequest().body(new Message("Vip require"));
            }
        }
        if(episode.getViews()!=null){
            episode.setViews(episode.getViews()+1);
        }else{
            episode.setViews(1L);
        }
        filmService.update(episode);
        Film film= episode.getFilm();
        if(film.getViews()!=null){
            film.setViews(film.getViews()+1);
        }else{
            film.setViews(1L);
        }
        filmService.update(film);
        return ResponseEntity.ok( episode);
    }
    @Async
    @DeleteMapping("")
    public ResponseEntity<?> deleteById(@RequestParam("filmId") int filmId)
    {
        Film film=null;
        try {
             film=filmService.delFilm(filmId);
             filmService.delFilm(filmId);
        }catch (Exception exception){

        }

        return ResponseEntity.ok(film!=null?film:null);
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
    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
}
