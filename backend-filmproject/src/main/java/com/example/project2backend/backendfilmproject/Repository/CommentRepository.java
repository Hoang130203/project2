package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Comment;
import com.example.project2backend.backendfilmproject.Entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByEpisode(Episode episode);
}
