package com.example.project2backend.backendfilmproject.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
public class Transaction {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_money")
    private Long money;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "time",columnDefinition = "datetime")
    private Timestamp time;
}
