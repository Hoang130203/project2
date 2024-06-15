package com.example.project2backend.backendfilmproject.Payload.Response;


import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class NotificationMessage {
    private String content;
    private Date timestamp;
    private String sender;
    @Getter
    @Setter
    private boolean isAdmin;
    final private String type="NOTIFICATION";
}
