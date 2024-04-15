package com.example.project2backend.backendfilmproject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
public class User {
    @Id
    @JsonIgnore
    @Column(name = "id",columnDefinition = "varchar(70)")
    private String id;

    @Column(name = "account",columnDefinition = "varchar(50)")
    @JsonIgnore
    private String account;

    @Column(name = "password",columnDefinition = "varchar(70)")
    @JsonIgnore
    private String password;

    @Column(name = "email",columnDefinition = "varchar(70)")
    @Email
    private String email;

    @JsonIgnore
    @Column(name = "has_provider")
    private boolean hasProvider;

    @Column(name = "avatar",columnDefinition = "nvarchar(max)")
    private String avatar;

    @Column(name="name",columnDefinition = "nvarchar(70)")
    private String name;

    @Column(name = "age")
    private int age;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "user_role",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles=new HashSet<>();


    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "saved",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "episode_id"))
    private List<Episode> saveds;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "favorite",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "film_id"))
    private List<Film> favorites;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Transaction>transactions;

    public User(@NotNull String userName, @NotNull String email, @NotNull String password) {
        this.account = userName;
        this.email = email;
        this.password = password;
    }
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", hasProvider=" + hasProvider +
                ", avatar='" + avatar + '\'' +
                ", name='" + name + '\'' +
                ", roles=" + roles +
                '}';
    }


}
