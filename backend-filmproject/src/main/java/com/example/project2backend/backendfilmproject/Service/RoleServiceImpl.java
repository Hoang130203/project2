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
import com.example.project2backend.backendfilmproject.Repository.UserRepository;
import com.example.project2backend.backendfilmproject.Repository.UserRoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final TypeRepository typeRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    public RoleServiceImpl(RoleRepository roleRepository, UserRoleRepository userRoleRepository, TypeRepository typeRepository, PasswordEncoder passwordEncoder, UserService userService, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.typeRepository = typeRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.userRepository = userRepository;
    }
    private final UserRepository userRepository;
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
        for (ERole eRole : ERole.values()) {

            if (roleRepository.findByName(eRole) == null) {
                Role role = new Role();
                role.setName(eRole);
                roleRepository.save(role);
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
    @Override
    public void createRole() {
        for (ERole eRole : ERole.values()) {
            int i=1;
            if (roleRepository.findByName(eRole) == null) {
                Role role = new Role();
                role.setName(eRole);
                roleRepository.save(role);
                System.out.println(i++);
            }
        }
        String adminAccount= "admin";
        if(userRepository.findByAccount(adminAccount).isEmpty()) {
            User user = new User();
            user.setId("Adminnn");
            user.setAccount(adminAccount);
            user.setPassword(passwordEncoder.encode("123"));
//            user.setEmail(registerUser.getEmail());
            user.setName("admin");
            Set<Role> roles = new HashSet<>();
            roles.add(getByName(ERole.ROLE_ADMIN).get());

            user.setRoles(roles);
            userService.save(user);
            System.out.println("abc");
        }
    }
}
