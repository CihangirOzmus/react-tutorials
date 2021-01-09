package com.cozmus.todolistbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = "toDoList")
@Entity
public class ToDoItem {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;
    private String status;

    @CreationTimestamp
    private LocalDate created;
    private LocalDate deadline;

    @JsonIgnore
    @ManyToOne
    private ToDoList toDoList;

}
