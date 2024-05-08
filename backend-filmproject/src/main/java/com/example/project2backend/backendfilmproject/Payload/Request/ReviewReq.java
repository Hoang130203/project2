package com.example.project2backend.backendfilmproject.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReq {
    private int filmId;
    private String content;
}
