package com.example.project2backend.backendfilmproject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private String id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "episode_id")
    private Episode episode;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "time",columnDefinition = "datetime")
    private Timestamp time;

    @Column(columnDefinition = "nvarchar(max)")
    private String content;

    public Comment(Episode episode, User user, Timestamp time, String content) {
        this.episode = episode;
        this.user = user;
        this.time = time;
        this.content = content;
    }
}
