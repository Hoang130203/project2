package com.example.project2backend.backendfilmproject.Payload.Response;

import com.example.project2backend.backendfilmproject.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRes {
    private String id;
    private User user;
    private Timestamp time;
    private String content;
}
