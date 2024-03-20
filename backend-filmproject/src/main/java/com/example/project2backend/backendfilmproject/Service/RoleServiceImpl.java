package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.ERole;
import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Entity.UserRole;
import com.example.project2backend.backendfilmproject.Repository.RoleRepository;
import com.example.project2backend.backendfilmproject.Repository.UserRoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    public RoleServiceImpl(RoleRepository roleRepository, UserRoleRepository userRoleRepository) {
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }


    @Override
    public Optional<Role> getByName(ERole name) {
        return roleRepository.findByName(name);
    }

    @Override
    public List<UserRole> getByUser(User user) {
        return userRoleRepository.getUserRole(user);
    }
}
