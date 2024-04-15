package com.example.project2backend.backendfilmproject.Payload.Response;

import com.example.project2backend.backendfilmproject.Entity.EClass_Key.ERole;
import com.example.project2backend.backendfilmproject.Entity.Role;
import com.example.project2backend.backendfilmproject.Entity.Transaction;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class UserInfoForAdmin implements Serializable {
    private String id;
    private String name;
    private String email;
    private String avatar;
    private int age;
    private String status;
    @JsonIgnore
    private Set<Role> roles=new HashSet<>();
    @JsonIgnore
    private List<Transaction> transactions;
    private Long totalmoney;

    public Long getTotalmoney() {
        Long total=0L;
        for (Transaction transaction:this.transactions
             ) {
            if(transaction.getStatus().equals("done")){
                total+=transaction.getMoney();
            }
        }
        return total;
    }

    public String getStatus() {
        for (Role role : this.roles
        ){
            if(role.getName().equals(ERole.ROLE_VIP)){
                return "vip";
            }
        }
        return "normal";
    }
}
