package com.cozmus.todolistbackend.controller;

import com.cozmus.todolistbackend.model.ToDoItem;
import com.cozmus.todolistbackend.service.ToDoItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/todoitem")
public class ToDoItemController {

    private final ToDoItemService toDoItemService;

    public ToDoItemController(ToDoItemService toDoItemService) {
        this.toDoItemService = toDoItemService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getToDoItem(@PathVariable Long id){
        ToDoItem toDoItem = toDoItemService.getToDoItem(id);
        return ResponseEntity.ok().body(toDoItem);
    }

    @PostMapping("/")
    public ResponseEntity<ToDoItem> createToDoItem(@Valid @RequestBody ToDoItem toDoItem) throws URISyntaxException {
        ToDoItem newToDoItem = toDoItemService.createToDoItem(toDoItem);
        return ResponseEntity
                .created(new URI("/todoitem/" + newToDoItem.getId()))
                .body(newToDoItem);
    }

    @PutMapping("/")
    public ResponseEntity<ToDoItem> updateToDoItem(@Valid @RequestBody ToDoItem toDoItem){
        ToDoItem updatedToDoItem = toDoItemService.updateToDoItem(toDoItem);
        return ResponseEntity.ok().body(updatedToDoItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteToDoItem(@PathVariable Long id){
        toDoItemService.deleteToDoItem(id);
        return ResponseEntity.ok().build();
    }

}
