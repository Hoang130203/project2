package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Transaction;
import com.example.project2backend.backendfilmproject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findAllByUser(User user);
}
