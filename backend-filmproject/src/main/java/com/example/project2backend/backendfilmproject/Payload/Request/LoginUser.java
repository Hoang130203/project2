package com.example.project2backend.backendfilmproject.Payload.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUser {
    private String account;
    private String password;
}
