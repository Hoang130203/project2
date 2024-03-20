package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getByAccount(String account);
    Optional<User> getById(String id);
    boolean existByAccount(String account);
    void save(User user);
}
