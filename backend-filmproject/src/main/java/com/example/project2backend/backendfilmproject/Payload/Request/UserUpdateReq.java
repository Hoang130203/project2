package com.example.project2backend.backendfilmproject.Payload.Request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class UserUpdateReq implements Serializable {
    private String password;
    private boolean isChangePass;
    private String email;
    private String name;
    private int age;

}
