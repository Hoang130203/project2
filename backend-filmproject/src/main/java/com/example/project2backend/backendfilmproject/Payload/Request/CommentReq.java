package com.example.project2backend.backendfilmproject.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentReq {
    private Long episodeId;
    private String content;
}
