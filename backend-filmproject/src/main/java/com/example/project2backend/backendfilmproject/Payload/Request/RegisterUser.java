package com.example.project2backend.backendfilmproject.Payload.Request;

import com.example.project2backend.backendfilmproject.Entity.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class RegisterUser {
    private String account;
    private String password;
    private String email;
    private String name;
    private Set<String> roles=new HashSet<>();
}
