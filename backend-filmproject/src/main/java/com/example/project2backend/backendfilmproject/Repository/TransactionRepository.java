package com.example.project2backend.backendfilmproject.Repository;

import com.example.project2backend.backendfilmproject.Entity.Transaction;
import com.example.project2backend.backendfilmproject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findAllByUser(User user);

    @Query("SELECT SUM(t.money) FROM Transaction t ")
    Long totalMoney();

//    @Query("SELECT  t FROM Transaction t ORDER BY t.id DESC ")
    List<Transaction> findTop5ByOrderByIdDesc();
}
