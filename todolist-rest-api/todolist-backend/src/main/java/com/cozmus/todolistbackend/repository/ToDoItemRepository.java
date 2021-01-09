package com.cozmus.todolistbackend.repository;

import com.cozmus.todolistbackend.model.ToDoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
}
