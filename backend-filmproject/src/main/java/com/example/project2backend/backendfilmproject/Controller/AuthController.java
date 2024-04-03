package com.example.project2backend.backendfilmproject.Controller;
import com.example.project2backend.backendfilmproject.Payload.Request.LoginUser;
import com.example.project2backend.backendfilmproject.Payload.Request.ProviderRegister;
import com.example.project2backend.backendfilmproject.Security.CookieUtil;
import com.google.api.client.http.javanet.NetHttpTransport;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ERole;
import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.User;
import com.example.project2backend.backendfilmproject.Payload.Request.RegisterUser;
import com.example.project2backend.backendfilmproject.Payload.Response.Message;
import com.example.project2backend.backendfilmproject.Security.JwtProvider;
import com.example.project2backend.backendfilmproject.Service.RoleService;
import com.example.project2backend.backendfilmproject.Service.UserService;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;
//
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleService roleService;
    private final JwtProvider jwtProvider;
    @Value("${jwt.accessTokenCookieName}")
    private String cookieName;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                          UserService userService, RoleService roleService, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.jwtProvider = jwtProvider;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    static
    class SocialLoginReq{
        private String token;
        private String id;
        private String email;
        private String name;
        private boolean hasProvider;
        private String avatar;
        public SocialLoginReq() {}
    }

//    @PostMapping("/google")
//    public ResponseEntity<?> google(@RequestBody SocialLoginReq token)
//    {
//        String CLIENT_ID = "252305827166-jfe559gto0ntm0eei6t8ol2l5oaq1p7q.apps.googleusercontent.com";
//        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
//                new NetHttpTransport(), null)
//                // Thiết lập audience cho Client ID của bạn
//                .setAudience(Collections.singletonList(CLIENT_ID))
//                .build();
//        try {
//            // Xác thực token
//            GoogleIdToken idToken = verifier.verify(token.getToken());
//            if (idToken != null) {
//                // Token hợp lệ, trích xuất thông tin nếu cần
//                GoogleIdToken.Payload payload = idToken.getPayload();
//                String userId = payload.getSubject();
//                String email = payload.getEmail();
//                String name = (String) payload.get("name");
//
//                // In thông tin người dùng
//                System.out.println("User ID: " + userId);
//                System.out.println("Email: " + email);
//                System.out.println("Name: " + name);
//                return ResponseEntity.ok(userId);
//            } else {
//                // Token không hợp lệ
//                System.out.println("Invalid token.");
//            }
//        } catch (GeneralSecurityException | IOException e) {
//            // Xử lý ngoại lệ
//            e.printStackTrace();
//        }
//        return ResponseEntity.badRequest().body("error");
//
//    }

    @PostMapping("/processToken")
    public ResponseEntity<?> processToken(HttpServletResponse httpServletResponse,@RequestBody SocialLoginReq token) {
//        Claims claims = JwtProvider.parseToken(token);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token.getToken());

        HttpEntity<String> entity = new HttpEntity<>(null,headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange("https://graph.facebook.com/me", HttpMethod.GET, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("User Info: " + response.getBody());
            Optional<User> user = userService.getById(token.getId());
            if(user.isPresent() && user.get().isHasProvider()==true){
                try {
//            User u= user.get();
                    Authentication authentication= authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(user.get().getAccount(),user.get().getAccount())
                    );

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    String jwt = jwtProvider.generateToken(authentication);
                    CookieUtil.create(httpServletResponse,cookieName,jwt,true,-1,"");
                    return new ResponseEntity<>(new Message("Bạn đã đăng nhập"), HttpStatus.OK);
                } catch (Exception e) {
                    return new ResponseEntity<>(new Message("Lỗi rồi!"), HttpStatus.BAD_REQUEST);
                }
            }else if(!user.isPresent()){
                User newuser= new User();
                newuser.setId(token.getId());
                String account= randomString();
                newuser.setAccount(account);
                newuser.setHasProvider(true);
                newuser.setPassword(passwordEncoder.encode(account));
                newuser.setAvatar(token.getAvatar());
                newuser.setEmail(token.getEmail());
                newuser.setName(token.getName());
                Set<Role> roles= new HashSet<>();
                roles.add(roleService.getByName(ERole.ROLE_USER).get());
                newuser.setRoles(roles);
                userService.save(newuser);
                Authentication authentication= authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(newuser.getAccount(),newuser.getAccount())
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtProvider.generateToken(authentication);
                CookieUtil.create(httpServletResponse,cookieName,jwt,false,-1,"");
                return new ResponseEntity<>(new Message("Bạn đã đăng ký, đăng nhập thành công"), HttpStatus.OK);
//            return new ResponseEntity<>(newuser,HttpStatus.CREATED);
            }
            return ResponseEntity.ok(response.getBody()+" ");
        } else {
            System.out.println("Failed to fetch user info. Status code: " + response.getStatusCodeValue());
            return ResponseEntity.badRequest().body("error");
        }
        // Xử lý các thông tin từ claims ở đây
//        return ResponseEntity.ok(claims.getId()+" " + claims.getExpiration()+" "+claims.toString());
    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(HttpServletResponse httpServletResponse, @Valid @RequestBody LoginUser loginUser, BindingResult bidBindingResult){
        if(bidBindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Xảy ra lỗi gì đó"), HttpStatus.BAD_REQUEST);
        try {
            Authentication authentication= authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUser.getAccount(),loginUser.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse,cookieName,jwt,false,-1,"");
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Lỗi rồi!"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody RegisterUser registerUser){

        Optional<User> findUser = userService.getByAccount(registerUser.getAccount());
        if(findUser.isPresent()){
            return ResponseEntity.badRequest().body(new Message("Tai khoan da ton tai!"));
        }

        User user = new User();
        user.setId(randomString());
        user.setAccount(registerUser.getAccount());
        user.setPassword(passwordEncoder.encode(registerUser.getPassword()));
        user.setEmail(registerUser.getEmail());
        user.setName(registerUser.getName());
        Set<Role> roles= new HashSet<>();
        roles.add(roleService.getByName(ERole.ROLE_USER).get());
        if(registerUser.getRoles().contains("vip")){
            roles.add(roleService.getByName(ERole.ROLE_VIP).get());
        }
        if(registerUser.getRoles().contains("admin")){
            roles.add(roleService.getByName(ERole.ROLE_ADMIN).get());
        }
        user.setRoles(roles);
        userService.save(user);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }
    @PostMapping("/providerAuth")
    public ResponseEntity<?> providerRegister(HttpServletResponse httpServletResponse,@RequestBody ProviderRegister providerRegister){
        Optional<User> user = userService.getById(providerRegister.getId());
        if(user.isPresent() && user.get().isHasProvider()==true){
            try {
//            User u= user.get();
            Authentication authentication= authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.get().getAccount(),user.get().getAccount())
            );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse,cookieName,jwt,false,-1,"");
            return new ResponseEntity<>(new Message("Bạn đã đăng nhập"), HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(new Message("Lỗi rồi!"), HttpStatus.BAD_REQUEST);
            }
        }else if(!user.isPresent()){
            User newuser= new User();
            newuser.setId(providerRegister.getId());
            String account= randomString();
            newuser.setAccount(account);
            newuser.setHasProvider(true);
            newuser.setPassword(passwordEncoder.encode(account));
            newuser.setAvatar(providerRegister.getAvatar());
            newuser.setEmail(providerRegister.getEmail());
            newuser.setName(providerRegister.getName());
            Set<Role> roles= new HashSet<>();
            roles.add(roleService.getByName(ERole.ROLE_USER).get());
            newuser.setRoles(roles);
            userService.save(newuser);
            Authentication authentication= authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(newuser.getAccount(),newuser.getAccount())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse,cookieName,jwt,false,-1,"");
            return new ResponseEntity<>(new Message("Bạn đã đăng ký, đăng nhập thành công"), HttpStatus.OK);
//            return new ResponseEntity<>(newuser,HttpStatus.CREATED);
        }
        return ResponseEntity.badRequest().body("error");
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
