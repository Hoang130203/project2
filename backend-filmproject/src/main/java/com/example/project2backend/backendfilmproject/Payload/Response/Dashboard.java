package com.example.project2backend.backendfilmproject.Payload.Response;

import com.example.project2backend.backendfilmproject.Entity.Transaction;
import lombok.Data;

import java.util.List;

@Data
public class Dashboard {
    private long numberOfUsers;
    private Long totalMoney;
    private long numberOfFilm;
    private long numberOfEpisodes;
    List<Transaction> currentTransaction;

    public Dashboard(long numberOfUsers, Long totalMoney, long numberOfFilm, Long numberOfEpisodes, List<Transaction> currentTransaction) {
        this.numberOfUsers = numberOfUsers;
        this.totalMoney = totalMoney;
        this.numberOfFilm = numberOfFilm;
        this.numberOfEpisodes = numberOfEpisodes;
        this.currentTransaction = currentTransaction;
    }
}
