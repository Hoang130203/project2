package com.example.project2backend.backendfilmproject.Service;

import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Payload.Request.UserUpdateReq;
import com.example.project2backend.backendfilmproject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public Optional<User> getByAccount(String account) {
        return userRepository.findByAccount(account);
    }

    @Override
    public Optional<User> getById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existByAccount(String account) {
        return userRepository.existsByAccount(account);
    }

    @Override
    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User update(UserUpdateReq userUpdateReq,String userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->  new RuntimeException("user not found"));
        if(userUpdateReq.getPassword().length()>=6 && !user.isHasProvider() ){
            System.out.println(userUpdateReq.getPassword());
            user.setPassword(passwordEncoder.encode(userUpdateReq.getPassword()));
        }
        if(userUpdateReq.getName().length()>0){
            user.setName(userUpdateReq.getName()) ;

        }
        if(userUpdateReq.getEmail().length()>0){
            user.setEmail(userUpdateReq.getEmail());
        }
        if(userUpdateReq.getAge()>0){
            user.setAge(userUpdateReq.getAge());

        }
        userRepository.save(user);
        return user;
    }

    @Override
    public User updateAvt(String avatar, String userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->  new RuntimeException("user not found"));
        user.setAvatar(avatar);
        userRepository.save(user);
        return user;
    }

    public String randomString(){
        int length=15;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();

        // Khai báo một StringBuilder để xây dựng xâu ngẫu nhiên
        StringBuilder sb = new StringBuilder();

        // Tạo xâu ngẫu nhiên bằng cách chọn ngẫu nhiên các ký tự từ chuỗi characters
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            sb.append(randomChar);
        }

        // In ra xâu ngẫu nhiên
        String randomString = sb.toString();
        return randomString;
    }
}
