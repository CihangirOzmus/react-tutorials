package com.cozmus.todolistbackend.service;

import com.cozmus.todolistbackend.model.ToDoList;
import com.cozmus.todolistbackend.repository.ToDoListRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ToDoListServiceTest {

    @Mock
    ToDoListRepository toDoListRepository;

    @InjectMocks
    ToDoListService toDoListService;

    private final String testName = "TEST_NAME";

    @Test
    public void getToDoListGroup() {

        ToDoList toDoList1 = new ToDoList();
        toDoList1.setId(1L);
        toDoList1.setName(testName);

        ToDoList toDoList2 = new ToDoList();
        toDoList2.setId(1L);
        toDoList2.setName(testName);

        when(toDoListRepository.findAll()).thenReturn(Arrays.asList(toDoList1, toDoList2));
        Collection<ToDoList> toDoListGroup = toDoListService.getToDoListGroup();
        assertEquals(2, toDoListGroup.size());

    }

    @Test
    public void getToDoList() {

        ToDoList toDoList = new ToDoList();
        toDoList.setId(1L);
        toDoList.setName(testName);

        when(toDoListRepository.findById(1L)).thenReturn(Optional.of(toDoList));
        ToDoList returnedToDoList = toDoListService.getToDoList(1L).orElse(null);
        assertEquals(1L, returnedToDoList.getId().longValue());
        assertEquals(testName, returnedToDoList.getName());

    }

    @Test
    public void createToDoList() {

        ToDoList toDoList = new ToDoList();
        toDoList.setId(1L);
        toDoList.setName(testName);

        when(toDoListRepository.save(toDoList)).thenReturn(toDoList);
        ToDoList returned = toDoListService.createToDoList(toDoList);
        assertEquals(1L, returned.getId().longValue());
        assertEquals(testName, returned.getName());

    }

    @Test
    public void updateToDoList() {
        ToDoList toDoList = new ToDoList();
        toDoList.setId(1L);
        toDoList.setName(testName);

        when(toDoListRepository.findById(1L)).thenReturn(Optional.of(toDoList));
        when(toDoListRepository.save(toDoList)).thenReturn(toDoList);

        ToDoList returned = toDoListService.updateToDoList(toDoList);
        assertEquals(1L, returned.getId().longValue());
        assertEquals(testName, returned.getName());
    }
}