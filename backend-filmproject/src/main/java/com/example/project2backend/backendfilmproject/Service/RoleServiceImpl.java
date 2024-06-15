package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ERole;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.EType;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.UserRoleKey;
import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.Type;
import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Entity.UserRole;
import com.example.project2backend.backendfilmproject.Repository.RoleRepository;
import com.example.project2backend.backendfilmproject.Repository.TypeRepository;
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
    private final TypeRepository typeRepository;
    public RoleServiceImpl(RoleRepository roleRepository, UserRoleRepository userRoleRepository, TypeRepository typeRepository) {
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.typeRepository = typeRepository;
    }

    @Override
    public Optional<Role> getByName(ERole name) {
        return roleRepository.findByName(name);
    }

    @Override
    public List<UserRole> getByUser(User user) {
        return userRoleRepository.getUserRole(user);
    }

    @Override
    public void deleleVipUser(User user) {
        Role roleVIp= roleRepository.findByName(ERole.ROLE_VIP).get();
        userRoleRepository.delete(userRoleRepository.findById(new UserRoleKey(user,roleVIp)).get());
    }

    @Override
    public void createRoleAndType() {
        for (ERole eColor : ERole.values()) {

            if (roleRepository.findByName(eColor) == null) {
                Role color = new Role();
                color.setName(eColor);
                roleRepository.save(color);
            }
        }
        for (EType eType : EType.values()) {

            if (typeRepository.findByName(eType) == null) {
                Type type = new Type();
                type.setName(eType);
                typeRepository.save(type);
            }
        }
    }
}
