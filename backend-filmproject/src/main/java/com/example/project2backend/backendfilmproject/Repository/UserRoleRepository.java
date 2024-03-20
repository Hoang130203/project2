package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Entity.UserRole;
import com.example.project2backend.backendfilmproject.Entity.UserRoleKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRoleRepository  extends  JpaRepository<UserRole, UserRoleKey> {
    @Query("select ur from UserRole ur where ur.user=:user")
    List<UserRole> getUserRole( @Param("user") User user);
}
