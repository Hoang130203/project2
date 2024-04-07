package com.example.project2backend.backendfilmproject.Entity.EClass_Key;

import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleKey implements Serializable {
    private User user;
    private Role role;

    // constructors, getters, setters, equals, hashCode, etc.
}