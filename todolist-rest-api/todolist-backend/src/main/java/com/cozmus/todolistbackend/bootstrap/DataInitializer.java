package com.cozmus.todolistbackend.bootstrap;

import com.cozmus.todolistbackend.model.ToDoItem;
import com.cozmus.todolistbackend.model.ToDoList;
import com.cozmus.todolistbackend.service.ToDoListService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.stream.Stream;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ToDoListService toDoListService;

    public DataInitializer(ToDoListService toDoListService) {
        this.toDoListService = toDoListService;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Shopping List", "Grocery List", "Study Plan").forEach(name ->
                toDoListService.save(new ToDoList(name)));

        ToDoList dummyToDoList = toDoListService.findByName("Shopping List");

        ToDoItem dummyToDoItem1 = ToDoItem.builder()
                .name("Buy apples")
                .description("I need to make apple pie")
                .status("In progress")
                .created(LocalDate.now())
                .deadline(LocalDate.now().plusDays(3))
                .toDoList(dummyToDoList)
                .build();

        ToDoItem dummyToDoItem2 = ToDoItem.builder()
                .name("Buy eggs")
                .description("Not possible to make pie without eggs")
                .status("In progress")
                .created(LocalDate.now())
                .deadline(LocalDate.now().plusDays(3))
                .toDoList(dummyToDoList)
                .build();

        dummyToDoList.getToDoItems().add(dummyToDoItem1);
        dummyToDoList.getToDoItems().add(dummyToDoItem2);
        toDoListService.save(dummyToDoList);

        System.out.println("<<< DataInitializer: Bootstrap ToDoList objects are created... >>>");
    }

}
