package com.cozmus.todolistbackend.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(exclude = "toDoItems")
@Entity
public class ToDoList {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String name;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "toDoList")
    private List<ToDoItem> toDoItems;

}
