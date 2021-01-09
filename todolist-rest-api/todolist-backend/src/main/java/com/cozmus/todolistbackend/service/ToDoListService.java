package com.cozmus.todolistbackend.service;

import com.cozmus.todolistbackend.model.ToDoList;
import com.cozmus.todolistbackend.repository.ToDoListRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Slf4j
@Service
public class ToDoListService {

    private final ToDoListRepository toDoListRepository;

    public ToDoListService(ToDoListRepository toDoListRepository) {
        this.toDoListRepository = toDoListRepository;
    }

    public Collection<ToDoList> getToDoListGroup(){
        log.info("GET Request for ToDoList Group");
        return toDoListRepository.findAll();
    }

    public Optional<ToDoList> getToDoList(Long id){
        log.info("GET request for ToDoList");
        return toDoListRepository.findById(id);
    }

    public ToDoList createToDoList(ToDoList toDoList) {
        log.info("POST request to create ToDoList : " + toDoList.getName());
        ToDoList newToDoList = toDoListRepository.save(toDoList);
        return newToDoList;
    }

    public ToDoList updateToDoList(ToDoList toDoList){
        log.info("PUT request for updated ToDoList : " + toDoList.getName());
        ToDoList existingToDoList = toDoListRepository.findById(toDoList.getId()).orElse(null);
        if (existingToDoList != null){
            existingToDoList.setName(toDoList.getName());
            ToDoList updatedToDoList = toDoListRepository.save(existingToDoList);
            return updatedToDoList;
        }
        return null;
    }

    public void deleteToDoList(Long id){
        log.info("DELETE request for ToDoList");
        ToDoList deletedToDoList = toDoListRepository.findById(id).orElse(null);
        if (deletedToDoList != null) {
            toDoListRepository.deleteById(id);
        }
    }

    public void save(ToDoList toDoList){
        toDoListRepository.save(toDoList);
    }

    public ToDoList findByName(String name){
        return toDoListRepository.findByName(name);
    }
}
