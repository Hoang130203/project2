package com.example.project2backend.backendfilmproject.Controller;

import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Payload.Request.UserUpdateReq;
import com.example.project2backend.backendfilmproject.Payload.Response.Message;
import com.example.project2backend.backendfilmproject.Payload.Response.UserBaseInfo;
import com.example.project2backend.backendfilmproject.Service.RoleService;
import com.example.project2backend.backendfilmproject.Service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private ModelMapper modelMapper;
    private final UserService userService;
    private final RoleService roleService;
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateInfo(@RequestBody UserUpdateReq userUpdateReq){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user= userService.update(userUpdateReq,getUserId(userDetails));
        if(user!=null){
            return ResponseEntity.ok(modelMapper.map(user, UserBaseInfo.class));
        }
        return ResponseEntity.badRequest().body(new Message("error"));
    }
    @PutMapping("/avatar")
    public ResponseEntity<?> updateAvt(@RequestParam("avatar") String avatar){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user= userService.updateAvt(avatar,getUserId(userDetails));
        if(user!=null){
            return ResponseEntity.ok(modelMapper.map(user, UserBaseInfo.class));
        }
        return ResponseEntity.badRequest().body(new Message("error"));
    }
    @GetMapping("/details")
    public ResponseEntity<Object> getUserDetails(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return new ResponseEntity<>(new Message("No info"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(roleService.getByUser(user.get()), HttpStatus.OK) ;
    }

    public String getUserId(UserDetails userDetails){

        String userName = userDetails.getUsername();
        Optional<User> user= userService.getByAccount(userName);
        if (!user.isPresent()) {
            return null;
        }

        return user.get().getId() ;
    }
}
