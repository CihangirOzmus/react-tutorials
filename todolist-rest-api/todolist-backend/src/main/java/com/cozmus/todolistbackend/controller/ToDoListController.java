package com.cozmus.todolistbackend.controller;

import com.cozmus.todolistbackend.model.ToDoItem;
import com.cozmus.todolistbackend.model.ToDoList;
import com.cozmus.todolistbackend.service.ToDoListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/todolist")
public class ToDoListController {

    private final ToDoListService toDoListService;

    public ToDoListController(ToDoListService toDoListService) {
        this.toDoListService = toDoListService;
    }

    @GetMapping("all")
    public ResponseEntity<?> getToDoListGroup(){
        Collection<ToDoList> toDoListGroup = toDoListService.getToDoListGroup();
        if (toDoListGroup != null){
            return ResponseEntity.ok().body(toDoListGroup);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getToDoList(@PathVariable Long id){
        Optional<ToDoList> toDoListGroup = toDoListService.getToDoList(id);
        if (toDoListGroup != null){
            return ResponseEntity.ok().body(toDoListGroup);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/")
    public ResponseEntity<ToDoList> createToDoList(@Valid @RequestBody ToDoList toDoList) throws URISyntaxException {
        ToDoList newToDoList = toDoListService.createToDoList(toDoList);
        return ResponseEntity
                .created(new URI("/todolist/" + newToDoList.getId()))
                .body(newToDoList);
    }

    @PutMapping("/")
    public ResponseEntity<ToDoList> updateToDoList(@Valid @RequestBody ToDoList toDoList){
        ToDoList updateToDoList = toDoListService.updateToDoList(toDoList);
        return ResponseEntity.ok().body(updateToDoList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDoList> updateToDoListWithNewToDoItem(@Valid @PathVariable Long id, @RequestBody ToDoItem newToDoItem){
        ToDoList toDoList = toDoListService.getToDoList(id).orElse(null);
        if(toDoList != null){
            toDoList.getToDoItems().add(newToDoItem);
            newToDoItem.setToDoList(toDoList);
            toDoListService.save(toDoList);
        }
        return ResponseEntity.ok().body(toDoList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteToDoList(@PathVariable Long id){
        toDoListService.deleteToDoList(id);
        return ResponseEntity.ok().build();
    }





}
