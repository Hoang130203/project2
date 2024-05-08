package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.*;
import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ECountry;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.EType;
import com.example.project2backend.backendfilmproject.Payload.Response.FilmBasicInfo;
import com.example.project2backend.backendfilmproject.Repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FilmServiceImpl implements FilmService{
    @Autowired
    private ModelMapper modelMapper;

    @PersistenceContext
    private EntityManager entityManager;
    private final FilmRepository filmRepository;
    private final EpisodeRepository episodeRepository;
    private final TypeRepository typeRepository;
    private final CharacterRepository characterRepository;
    private final FavoriteRepository favoriteRepository;
    private final SavedRepository savedRepository;
    private final ReviewRepository reviewRepository;
    private final CommentRepository commentRepository;
    public FilmServiceImpl(FilmRepository filmRepository, EpisodeRepository episodeRepository, TypeRepository typeRepository, CharacterRepository characterRepository, FavoriteRepository favoriteRepository, SavedRepository savedRepository, ReviewRepository reviewRepository, CommentRepository commentRepository) {
        this.filmRepository = filmRepository;
        this.episodeRepository = episodeRepository;
        this.typeRepository = typeRepository;
        this.characterRepository = characterRepository;
        this.favoriteRepository = favoriteRepository;
        this.savedRepository = savedRepository;
        this.reviewRepository = reviewRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Film addFilm(Film film) {
        Film film1= new Film(film.getName(),film.getTrailer(),film.getCountry(),film.getDescription(),film.isMovie(),film.getImage(),film.getBackground(),film.getAuthor(),film.getYear(),film.getAgeRequire());
        List<Type> typeList= new ArrayList<>();
        filmRepository.save(film1);
        for (Type type:film.getTypes()
             ) {
            Type type1= typeRepository.findByName(type.getName());
            if(type1!=null){
                typeList.add(type1);
                type1.getFilms().add(film1);
                typeRepository.save(type1);
            }

        }
//        film1.setTypes(typeList);
//        filmRepository.save(film1);
//        film1.setCharacters(film.getCharacters());
        filmRepository.save(film1);
        List<Character> characters = new ArrayList<>();
        List<Episode> episodes = new ArrayList<>();
        for (Character character:film.getCharacters()
        ) {
            System.out.println(film1.getId()+film1.getName());
            Character character1= new Character(character.getName(), character.getRole(), character.getImage(),film1);
//            characterRepository.save(character1);
            characters.add(character1);
        }
        for (Episode episode:film.getEpisodes()
             ) {
            Episode episode1= new Episode(episode.getDescription(),episode.getSerial(),0L,episode.getImage(),film1,episode.isVipRequire(),episode.getUrl());
            episodes.add(episode1);
        }
        film1.setCharacters(characters);
        film1.setEpisodes(episodes);
        filmRepository.save(film1);
        return film1;
    }

    @Override
    public Film getFilm(int filmId) {
        System.out.println(filmRepository.findById(filmId).get().getViews());

        return filmRepository.findById(filmId).get();
    }

    @Override
    public List<Film> getAllFilm() {
        return filmRepository.findAll();
    }

    @Override
    public List<Film> getTop12Views() {
        return filmRepository.findTop12ByOrderByViewsDesc();
    }

    @Override
    public List<Film> getTop12New() {
        return filmRepository.findTop12ByOrderByIdDesc();
    }

    @Transactional
    @Override
    public Film delFilm(int filmId) {
        Film film   = filmRepository.findById(filmId).get();
//        for (Type type:film.getTypes()
//             ) {
//            Type type1= typeRepository.findByName(type.getName());
//            type1.getFilms().remove(film);
//            typeRepository.save(type1);
//        }
        deleteFavorite(film);
        filmRepository.save(film);

        film.setTypes(null);
//        film.setFavorites(null);
        filmRepository.save(film);
        filmRepository.delete(film);

        return film;
    }
    @Transactional
    void deleteFavorite(Film film){
        favoriteRepository.deleteAllByFilm(film);
        savedRepository.deleteAllByFilm(film);
    }
    @Override
    public Film updateFilm(Film film) {
        Film film1= filmRepository.findById(film.getId())
                .orElseThrow(()->new RuntimeException("Film not found"));
        film1.setName(film.getName());
        film1.setTrailer(film.getTrailer());
        film1.setMovie(film.isMovie());
        film1.setAuthor(film.getAuthor());
        List<Type> types= new ArrayList<>();
        for (Type type:film.getTypes()
             ) {
            Type type1= typeRepository.findByName(type.getName());
            types.add(type1);
        }
        film1.setTypes(types);
        film1.setImage(film.getImage());
        film1.setBackground(film.getBackground());
        film1.setYear(film.getYear());
        film1.setCountry(film.getCountry());
        film1.setAgeRequire(film.getAgeRequire());
        filmRepository.save(film1);


        return film1;
    }

    @Override
    public Film advanceUpdate(Film film) {
//        Film film1= filmRepository.findById(film.getId())
//                .orElseThrow(()->new RuntimeException("Film not found"));
//
//        List<Character> characters = new ArrayList<>();
//        List<Episode> episodes= new ArrayList<>();
//        for (Character character:film.getCharacters()
//             ) {
//            Character character1= new Character(character.getName(), character.getRole(), character.getImage(),film1);
//            characters.add(character1);
//
//        }
//        for (Episode episode:film.getEpisodes()
//            ) {
//            Episode episode1= new Episode(episode.getDescription(),episode.getSerial(),0L,episode.getImage(),film1,episode.isVipRequire());
//            episodes.add(episode1);
//        }
//        film1.setEpisodes(episodes);
//        film1.setCharacters(characters);
//
//        episodeRepository.deleteAllByFilm(film1);
//        characterRepository.deleteAllByFilm(film1);
//        filmRepository.save(film1);
        return null;
    }

    @Override
    public List<Episode> addEpisode(List<Episode> episodes, int filmId) {
        Film film1= filmRepository.findById(filmId)
                .orElseThrow(()->new RuntimeException("Film not found"));
        List<Episode> list= film1.getEpisodes();
        for (Episode episode:episodes
             ) {
            Episode episode1= new Episode(episode.getDescription(),episode.getSerial(),0L,episode.getImage(),film1,episode.isVipRequire(),episode.getUrl());
            list.add(episode1);
        }
        film1.setEpisodes(list);
        filmRepository.save(film1);
        return film1.getEpisodes();
    }

    @Override
    public List<Episode> removeEpisode(List<Episode> episodes, int filmId) {
        Film film1= filmRepository.findById(filmId)
                .orElseThrow(()->new RuntimeException("Film not found"));
        for (Episode episode:episodes
             ) {
            Episode episode1= episodeRepository.findById(episode.getId())
                    .orElseThrow(()->new RuntimeException("episode not found"));
            if(episode1.getFilm().getId()==filmId){
                episodeRepository.delete(episode1);
            }
        }

        return  episodes;
    }

    @Override
    public List<Character> addCharacters(List<Character> characters, int filmId) {
        Film film1= filmRepository.findById(filmId)
                .orElseThrow(()->new RuntimeException("Film not found"));
        List<Character> list= film1.getCharacters();
        for (Character character:characters
        ) {
            Character character1= new Character(character.getName(), character.getRole(), character.getImage(),film1);
            list.add(character1);
        }
        film1.setCharacters(list);
        filmRepository.save(film1);
        return film1.getCharacters();
    }

    @Override
    public List<Character> removeCharacters(List<Character> characters, int filmId) {
        Film film1= filmRepository.findById(filmId)
                .orElseThrow(()->new RuntimeException("Film not found"));
        for (Character character:characters
        ) {
            Character character1= characterRepository.findById(character.getId())
                    .orElseThrow(()->new RuntimeException("episode not found"));
            if(character1.getFilm().getId()==filmId){
                character1.setFilm(null);
                characterRepository.save(character1);

            }
        }

        return  characters;
    }

    @Override
    public List<Episode> getTopNewestEpisode() {
        return episodeRepository.findTop12ByOrderByIdDesc().stream().limit(12).collect(Collectors.toList());
    }

    @Override
    public FilmBasicInfo convertToBasic(Film film) {
        return modelMapper.map(film,FilmBasicInfo.class);
    }

    @Override
    public Episode getEpisodeById(Long id) {
        return episodeRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Episode not found"));
    }

    @Override
    public Film update(Film film) {

        return filmRepository.save(film);
    }

    @Override
    public Episode update(Episode episode) {

        return episodeRepository.save(episode);
    }

    @Override
    public Page<Film> findAllByKeyword(String keyword, Pageable pageable) {
        return filmRepository.findAllByNameContainingIgnoreCase(keyword, pageable);
    }

    @Override
    public Page<Film> findAllByType(EType eType, Pageable pageable) {
        Type type= typeRepository.findByName(eType);
        return filmRepository.findAllByTypesContains(type,pageable);
    }

    @Override
    public Page<Film> findAllByCountry(ECountry eCountry,Pageable pageable) {
        return filmRepository.findAllByCountry(eCountry,pageable);
    }

    @Override
    public Page<Film> findAllByYear(int year,Pageable pageable) {
        if(year==2010){
            return filmRepository.findAllByYear2(pageable);
        }
        if(year==0){
            return filmRepository.findAll(pageable);
        }
        return filmRepository.findAllByYear(year,pageable);
    }

    @Override
    public Page<Film> findAllByMovie(boolean movie, Pageable pageable) {
        return filmRepository.findAllByIsMovie(movie,pageable);
    }

    @Override
    public List<Film> findAllByMovieView(boolean movie) {
        return filmRepository.findTop10ByAndIsMovieOrderByViewsDescIdDesc(movie);
    }

    @Override
    public Film findByEpisode(Long episodeId) {
        Episode episode= episodeRepository.findById(episodeId)
                .orElseThrow(()->new RuntimeException("film not found"));

        return episode.getFilm();
    }

    @Override
    public List<Review> getReview(Film film) {
        return reviewRepository.findAllByFilm(film);
    }

    @Override
    public List<Comment> getComment(Episode episode) {
        return commentRepository.findAllByEpisode(episode);
    }


}
