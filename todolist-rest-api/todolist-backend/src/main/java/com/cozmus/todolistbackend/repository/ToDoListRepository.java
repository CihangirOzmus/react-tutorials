package com.cozmus.todolistbackend.repository;

import com.cozmus.todolistbackend.model.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoListRepository extends JpaRepository<ToDoList, Long> {
    ToDoList findByName(String name);
}