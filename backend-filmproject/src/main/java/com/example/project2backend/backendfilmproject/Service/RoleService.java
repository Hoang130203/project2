package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ERole;
import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Entity.UserRole;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Optional<Role> getByName(ERole name);
    List<UserRole> getByUser(User user);
    void deleleVipUser(User user);
}
