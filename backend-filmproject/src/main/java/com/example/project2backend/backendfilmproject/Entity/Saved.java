package com.example.project2backend.backendfilmproject.Entity;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.FavoriteKey;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.SavedKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(SavedKey.class)
@Table(name = "saved")
public class Saved {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "episode_id")
    private Episode episode ;
}
