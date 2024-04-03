package com.example.project2backend.backendfilmproject.Entity.EClass_Key;

import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.User;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserRoleKey implements Serializable {
    private User user;
    private Role role;

    // constructors, getters, setters, equals, hashCode, etc.
}