package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.Character;
import com.example.project2backend.backendfilmproject.Entity.Episode;
import com.example.project2backend.backendfilmproject.Entity.Film;
import com.example.project2backend.backendfilmproject.Entity.Type;
import com.example.project2backend.backendfilmproject.Repository.CharacterRepository;
import com.example.project2backend.backendfilmproject.Repository.EpisodeRepository;
import com.example.project2backend.backendfilmproject.Repository.FilmRepository;
import com.example.project2backend.backendfilmproject.Repository.TypeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class FilmServiceImpl implements FilmService{

    @PersistenceContext
    private EntityManager entityManager;
    private final FilmRepository filmRepository;
    private final EpisodeRepository episodeRepository;
    private final TypeRepository typeRepository;
    private final CharacterRepository characterRepository;
    public FilmServiceImpl(FilmRepository filmRepository, EpisodeRepository episodeRepository, TypeRepository typeRepository, CharacterRepository characterRepository) {
        this.filmRepository = filmRepository;
        this.episodeRepository = episodeRepository;
        this.typeRepository = typeRepository;
        this.characterRepository = characterRepository;
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
            Episode episode1= new Episode(episode.getDescription(),episode.getSerial(),0L,episode.getImage(),film1,episode.isVipRequire());
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
    public List<Film> getTop12Views() {
        return filmRepository.findTop12ByOrderByViewsDesc();
    }

    @Override
    public Film delFilm(int filmId) {
        Film film   = filmRepository.findById(filmId).get();
//        for (Type type:film.getTypes()
//             ) {
//            Type type1= typeRepository.findByName(type.getName());
//            type1.getFilms().remove(film);
//            typeRepository.save(type1);
//        }
        film.setTypes(null);
        filmRepository.save(film);
        filmRepository.delete(film);
        return film;
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
            Episode episode1= new Episode(episode.getDescription(),episode.getSerial(),0L,episode.getImage(),film1,episode.isVipRequire());
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
}
