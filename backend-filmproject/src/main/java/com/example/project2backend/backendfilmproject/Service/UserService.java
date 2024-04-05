package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Payload.Request.UserUpdateReq;

import java.util.Optional;

public interface UserService {
    Optional<User> getByAccount(String account);
    Optional<User> getById(String id);
    boolean existByAccount(String account);
    void save(User user);
    User update(UserUpdateReq userUpdateReq,String userId);
    User updateAvt(String avatar,String userId);
    void createTransaction(User user, Long amount,String info);
    boolean completeTransaction(User user, Long amount);
}
