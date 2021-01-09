package com.cozmus.todolistbackend.service;

import com.cozmus.todolistbackend.model.ToDoItem;
import com.cozmus.todolistbackend.repository.ToDoItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ToDoItemService {

    private final ToDoItemRepository toDoItemRepository;

    public ToDoItemService(ToDoItemRepository toDoItemRepository) {
        this.toDoItemRepository = toDoItemRepository;
    }

    public ToDoItem getToDoItem(Long id){
        log.info("GET request for ToDoItem");
        return toDoItemRepository.findById(id).orElse(null);
    }

    public ToDoItem createToDoItem(ToDoItem toDoItem){
        log.info("POST request for ToDoItem");
        return toDoItemRepository.save(toDoItem);
    }

    public ToDoItem updateToDoItem(ToDoItem toDoItem){
        log.info("PUT request for ToDoItem");
        ToDoItem existingToDoItem = toDoItemRepository.findById(toDoItem.getId()).orElse(null);
        if(existingToDoItem != null){
            existingToDoItem.setName(toDoItem.getName());
            existingToDoItem.setDescription(toDoItem.getDescription());
            existingToDoItem.setDeadline(toDoItem.getDeadline());
            existingToDoItem.setStatus(toDoItem.getStatus());
            return toDoItemRepository.save(existingToDoItem);
        }
        return null;
    }

    public void deleteToDoItem(Long id){
        log.info("DELETE request for ToDoItem");
        ToDoItem toDoItem = toDoItemRepository.findById(id).orElse(null);

        if (toDoItem != null){
            toDoItem.getToDoList().getToDoItems().remove(toDoItem);
            toDoItem.setToDoList(null);
            toDoItemRepository.deleteById(id);
        }
    }

}
