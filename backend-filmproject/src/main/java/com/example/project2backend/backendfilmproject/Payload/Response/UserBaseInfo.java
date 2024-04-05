package com.example.project2backend.backendfilmproject.Payload.Response;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ERole;
import com.example.project2backend.backendfilmproject.Entity.UserRole;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserBaseInfo implements Serializable {
    private String name;
    private String email;
    private String avatar;
    private int age;
    private List<UserRole> roles;
}
