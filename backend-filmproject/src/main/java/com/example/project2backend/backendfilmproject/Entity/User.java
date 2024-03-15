package com.example.project2backend.backendfilmproject.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "id")
    @Max(50)
    private String id;

    @Column(name = "account")
    @Max(50)
    private String account;

    @Column(name = "password")
    @Max(50)
    private String password;

    @Column(name = "email")
    @Max(100)
    @Email
    private String email;

    @Column(name = "has_provider")
    private boolean hasProvider;

    @Column(name = "avatar",columnDefinition = "nvarchar(max)")
    private String avatar;

    @Column(name="name")
    @Max(70)
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles=new HashSet<>();
}
